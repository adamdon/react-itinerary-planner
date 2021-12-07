import React, {useEffect, useState} from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList} from 'recharts';
import { Rating } from 'react-simple-star-rating'

import {useData} from "../../data/DataContextProvider"

import ContainerContent from "../../containers/ContainerContent";
import SimpleBar from "simplebar-react";
import data from "bootstrap/js/src/dom/data";



export default function ViewRatings(props)
{
    const [data, setData] = useData();
    const [disabled, setDisabled] = useState(false);
    const [chartData, setChartData] = useState(formatChartData(props.hostel.ratings));

    useEffect( () =>
    {
        console.log('data.hostels');
    }, [data.hostels]);


    // if(props.hostel.id === "2")
    // {
        // console.log("gggggggggg")

        // if(props.hostel.ratings && props.hostel.ratings.length > 0)
        // {
            // console.log("number of 2's in 2" + props.hostel.id)
            // let number = props.hostel.ratings.reduce((n, element) => n + (element === 2));
            // const map = props.hostel.ratings.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

            // const aCount = new Map([...new Set(props.hostel.ratings)].map(
            //     x => [x, props.hostel.ratings.filter(y => y === x).length]
            // ));

            // const result = props.hostel.ratings.reduce((acc, curr) => {
            //     acc[curr] ??= {[curr]: 0};
            //     acc[curr][curr]++;
            //
            //     return acc;
            // }, {});

            // const result = props.hostel.ratings.reduce((acc, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {});


            // console.log(Object.values(result));
            // console.log(aCount.get(2));
            // console.log(result);
            // console.log("end " + props.hostel.id)
    //     }
    // }


    function formatChartData(sourceData)
    {
        let formattedData = [];

        for(let index = 1; index < 6; index++)
        {
            let dataObject = {
                Stars: "",
                Percentage: 0,
            };

            for(let starIndex = 0; starIndex < index; starIndex++)
            {
                dataObject.Stars = (dataObject.Stars + "⭐")
            }

            let occurrence = 0
            for(let rating of sourceData)
            {
                if(rating === index)
                {
                    occurrence = (occurrence + 1);
                }
            }
            dataObject.index = index;
            dataObject.occurrence = occurrence;
            dataObject.Percentage = dataObject.Percentage = (((occurrence / sourceData.length) * 100).toFixed(0));

            formattedData.push(dataObject);
            // console.log(index);
        }

        return formattedData;
    }





    async function ratingOnClick(ratingNumber)
    {
        setDisabled(true);
        setData({showSpinner: true});


        let starNumber = (ratingNumber / 20);
        props.hostel.ratings.push(starNumber);
        setChartData(formatChartData(props.hostel.ratings)); //local change only


        ////////////////////////////////////////////////////////////////////fetch
        // let requestBody = {reviewer: reviewer, review: review};
        let methodType = "GET"
        let requestUrl = (data.config.baseUrl + "/hostels/rate/" + props.hostel.id + "/" + starNumber.toString());
        let requestHeaders = {"Content-Type": "application/json"};

        // const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders, body: JSON.stringify(requestBody)});
        const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders});

        if(Number(response.status.toString().substring(0, 1)) === 2) //check response code starts with 2
        {
            const jsonData = await response.json();
            // await props.fetchHostelData();

            console.log(jsonData);
            setData({toastSuccess: "Rating Added"});
        }
        else
        {
            setData({toastError: "Error: " + response.status + " - Could not action"});
        }
        //////////////////////////////////////////////////////////////////////fetch



        setData({showSpinner: false});
        setDisabled(false);
    }



    return (

        <div className={"alert bg-secondary pb-3 mb-3"} >
            <span><h6><i className={"fa fa-star"}></i> Ratings ({props.hostel.ratings.length})</h6></span>
            <div style={{height: 300}}>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart
                        width={600}
                        height={280}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 20,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="Stars"  tick={{ fill: 'red' }} stroke="#efefef" />
                        <YAxis domain={[0, 100]} tick={{ fill: 'white' }} stroke="#efefef"/>
                        <Tooltip itemStyle={{color: "#000000"}} className={'bg-secondary'} />
                        <Legend  tick={{ fill: 'red' }} font={"red"} />
                        <Bar dataKey="Percentage"  fill="#FFFFFF" radius={5} label={<CustomizedLabel/>}>
                            {/*<LabelList dataKey="Percentage" position="inside" style={{fill: "#000000"}} />*/}
                            {/*<LabelList dataKey="Percentage" position="inside" style={{fill: "#000000"}}>%</LabelList>*/}
                        </Bar>
                        {/*<Bar dataKey="Percentage"  background={{ fill: 'red' }} fill="#131c29" radius={5} />*/}
                        {/*<Bar dataKey="uv" fill="#82ca9d" />*/}
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className={''}>
                <Rating
                    onClick={ratingOnClick}
                    showTooltip
                    transition
                    allowHover={!disabled}
                    readonly={disabled}
                    tooltipArray={['1 Stars', '2 Stars', '3 Stars', '4 Stars', '5 Stars']}
                />
            </div>






        </div>

    );
}


function CustomizedLabel(props)
{
    const {x, y, value} = props;


        return <text
            x={x}
            y={y}
            dy={-6}
            fontSize='16'
            fontFamily='sans-serif'
            fill={"#FFFFFF"}
            textAnchor="center">{value}%
        </text>

}



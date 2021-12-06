import React, {useEffect, useState} from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Rating } from 'react-simple-star-rating'

import {useData} from "../../data/DataContextProvider"

import ContainerContent from "../../containers/ContainerContent";
import SimpleBar from "simplebar-react";
import data from "bootstrap/js/src/dom/data";



export default function ViewRatings(props)
{
    const [data, setData] = useData();
    const [chartData, setChartData] = useState(formatChartData(props.hostel.ratings));


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
        let starNumber = (ratingNumber / 20);
        console.log("ratingOnClick " + starNumber);
    }






    // const data2 = [
    //     {
    //         Stars: '⭐',
    //         Percentage: 10,
    //     },
    //     {
    //         Stars: '⭐⭐',
    //         Percentage: 0,
    //     },
    //     {
    //         Stars: '⭐⭐⭐',
    //         Percentage: 0,
    //     },
    //     {
    //         Stars: '⭐⭐⭐⭐',
    //         Percentage: 50,
    //     },
    //     {
    //         Stars: '⭐⭐⭐⭐⭐',
    //         Percentage: 40,
    //     },
    // ];



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
                            bottom: 40,
                        }}
                    >
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="Stars"  tick={{ fill: 'red' }} stroke="#efefef" />
                        <YAxis domain={[0, 100]} tick={{ fill: 'white' }} stroke="#efefef"/>
                        <Tooltip itemStyle={{color: "#000000"}} className={'bg-secondary'} />
                        <Legend  tick={{ fill: 'red' }} font={"red"} />
                        <Bar dataKey="Percentage"  fill="#FFFFFF" radius={5} />
                        {/*<Bar dataKey="Percentage"  background={{ fill: 'red' }} fill="#131c29" radius={5} />*/}
                        {/*<Bar dataKey="uv" fill="#82ca9d" />*/}
                    </BarChart>
                </ResponsiveContainer>
            </div>



            <Rating
                onClick={ratingOnClick}
                showTooltip
                tooltipArray={['1', '2', '3', '4', '5']}
            />


        </div>

    );
}



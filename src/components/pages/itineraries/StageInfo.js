import React, {useState} from "react";
import {useData} from "../../data/DataContextProvider";




export default function StageInfo(props)
{
    const [disabled, setDisabled] = useState(false);
    const [data, setData] = useData();
    const [nights, setNights] = useState(Number(props.stage.nights));



    if (data.photos.length === 0)// do not render if photos hasn't loaded yet
    {
        return null;
    }


    if((props.stage.hostel) === 999 && (props.stage.nights === 999))
    {
        return (<div>No Show, {props.stage.hostel} , {props.stage.nights}, {props.stage.stage}, {props.index} </div>);
    }


    async function handleNightsOnclick(type)
    {
        setDisabled(true);
        let currentNights = nights;

        if(type === "-") //minus button
        {
            if(currentNights <= 1)
            {
                setData({toastMessage: "You can't stay in hostel for less than a day"})
            }
            else
            {
                setNights((nights) => (currentNights - 1));
                await fetchUpdateNights(props.hostel.id, (currentNights - 1).toString(), (props.index + 1));
            }
        }
        else // plus button
        {
            if(nights === 14)
            {
                setData({toastMessage: "You can't stay in a hostel for more than 2 weeks"})
            }
            else
            {
                setNights((nights) => (nights + 1));
                await fetchUpdateNights(props.hostel.id, (currentNights + 1).toString(), (props.index + 1));
            }
        }

        setDisabled(false);
    }

    async function fetchUpdateNights(hostelId, nightsNumber, stageNumber)
    {
        setData({showSpinner: true});

        let requestBody = {hostel: Number(hostelId), nights: nightsNumber};
        let methodType = "POST"
        let requestUrl = (data.config.baseUrl + "/itineraries/stages/update/" + props.itinerary.user + "/" + stageNumber);
        let requestHeaders = {"Content-Type": "application/json"};

        const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders, body: JSON.stringify(requestBody)});

        if(Number(response.status.toString().substring(0, 1)) === 2) //check that response code starts with 2
        {
            const jsonData = await response.json();
            console.log(jsonData);
            console.log(requestBody);
            console.log(requestUrl);
            // console.log(jsonData);
        }
        else
        {
            setData({toastError: "Error: " + response.status + " - Could not action"});
        }

        setData({showSpinner: false});
    }



    return (
        // <div className="text-center rounded-3 py-3" style={{backgroundImage: `url('https://random.dog/428711bd-7381-4998-a4b5-47b682c95b1b.jpg')`}}>
        // <div className="text-center rounded-3 py-3 mb-3" style={{backgroundImage: `url('https://random.dog/428711bd-7381-4998-a4b5-47b682c95b1b.jpg'`}}>
        <div className="text-center rounded-3 py-3 mb-3" style={{backgroundImage: `url('${data.photos[props.hostel.id].src.landscape}')`}}>
            <table className="table table-sm table-hover bg-primary table-borderless table-fit d-inline-block m-0 pb-1 rounded-3">
                <thead>
                    <tr className="table-active">
                        <th className="text-center text-light" colSpan={2}>Stage {props.index}</th>
                    </tr>
                </thead>
                <tbody className="">
                    <tr className="table-active">
                        <td className="text-end text-light px-3">Hostel <i className="fa fa-hotel"></i> :</td>
                        <td className="text-start text-light px-3">{props.hostel.name}</td>

                    </tr>
                    <tr className="table-active">
                        <td className="text-end text-light px-3">Nights <i className="fa fa-hotel"></i> :</td>
                        <td className="text-start text-light px-3">
                            <span>
                                <button disabled={disabled} className={"btn btn-dark btn-sm"} onClick={() => handleNightsOnclick("-")} style={{height: 20}}>
                                    <span className={"font-monospace"}>-</span>
                                </button>
                                    <span className={"font-monospace"}>{ (nights / 100).toFixed(2).slice(-2) }</span>
                                <button disabled={disabled} className={"btn btn-dark btn-sm"} onClick={() => handleNightsOnclick("+")} style={{height: 20}}>
                                    <span className={"font-monospace"}>+</span>
                                </button>
                            </span>
                        </td>
                    </tr>

                    <tr className="table-active">
                        <td className="text-end text-light px-3">Stage <i className="fa fa-hotel"></i> :</td>
                        <td className="text-start text-light px-3">{props.stage.stage}</td>
                    </tr>

                    <tr className="table-active">
                        <td className="text-end text-light px-3">User <i className="fa fa-hotel"></i> :</td>
                        <td className="text-start text-light px-3">{props.itinerary.user}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
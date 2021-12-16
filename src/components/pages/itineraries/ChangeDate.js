import React, {useState} from "react";
import {useData} from "../../data/DataContextProvider";




export default function ChangeDate(props)
{
    const [data, setData] = useData();

    const [disabled, setDisabled] = useState(false);
    const [date, setDate] = useState(props.itinerary.startdate.substring(0, 10));


    async function handleKeyDown(event)
    {
        if(event.key === "Enter")
        {
            await changeButtonOnClick();
        }
    }


    async function changeButtonOnClick()
    {
        setDisabled(true);
        setData({showSpinner: true});

        console.log("submitButtonOnClick")
        console.log(date);

        if(date === "")
        {
            setData({toastMessage: "Set a date first, then click 'Change'"});
        }
        else
        {
            await fetchChangeDate(props.itinerary.user, new Date(date));
        }


        setDisabled(false);
        setData({showSpinner: false});
    }

    async function fetchChangeDate(user, datetime)
    {
        let methodType = "GET"
        let requestUrl = (data.config.baseUrl + "/itineraries/startdate/" + user + "/" + datetime.toISOString());
        let requestHeaders = {"Content-Type": "application/json"};

        const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders});

        if(Number(response.status.toString().substring(0, 1)) === 2) //check that response code starts with 2
        {
            const jsonData = await response.json();
            console.log(requestUrl);
            console.log(jsonData);
            setData({toastSuccess: "Start date of " + user + "'s itinerary changed to " + datetime.toLocaleDateString()})
        }
        else
        {
            setData({toastError: "Error: " + response.status + " - Could not action"});
        }
    }




    return (
        <div className="alert bg-secondary">

            <div className="input-group">
                <span className="input-group-text">Start Date</span>

                <input value={date} onChange={e => setDate(e.target.value)} onKeyDown={handleKeyDown} disabled={disabled} placeholder="Date" type="date" aria-label="review" id={"date"} className="form-control w-50"/>

                <button onClick={changeButtonOnClick} disabled={disabled} className="btn btn-outline-light" type="button" id="change">Change</button>
            </div>

        </div>
    );
}
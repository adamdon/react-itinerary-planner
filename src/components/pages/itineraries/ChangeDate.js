import React, {useState} from "react";




export default function ChangeDate(props)
{
    const [disabled, setDisabled] = useState(false);
    const [date, setDate] = useState(props.itinerary.startdate.substring(0, 10));


    async function handleKeyDown(event)
    {
        if(event.key === "Enter")
        {
            await submitButtonOnClick();
        }
    }


    async function submitButtonOnClick()
    {
        console.log("submitButtonOnClick")
        // if(user === "")
        // {
        //     setData({toastMessage: "Input 'user' before submitting"});
        // }
        // else if(!user.match(/^[0-9a-zA-Z\s]+$/))
        // {
        //     setData({toastMessage: "'user' can only contain letters, numbers and spaces"});
        // }
        // else if(data.hostels.length === 0)
        // {
        //     setData({toastMessage: "Still loading hostels"});
        // }
        // else if(data.itineraries.some(itinerary => itinerary.user.toLowerCase().trim() === user.toLowerCase().trim()))
        // {
        //     setData({toastMessage: "User name '" + user + "' already taken, enter new name"});
        // }
        // else
        // {
        //     await fetchAddItinerary();
        // }
    }




    return (
        <div className="alert bg-secondary">

            <div className="input-group">
                <span className="input-group-text">Start Date</span>

                <input value={date} onChange={e => setDate(e.target.value)} onKeyDown={handleKeyDown} disabled={disabled} placeholder="Date" type="date" aria-label="review" id={"date"} className="form-control w-50"/>

                <button onClick={submitButtonOnClick} disabled={disabled} className="btn btn-outline-light" type="button" id="change">Change</button>
            </div>

        </div>
    );
}
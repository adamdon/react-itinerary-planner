import React, {useEffect, useState} from "react";
import ContainerContent from "../../containers/ContainerContent";
import {useData} from "../../data/DataContextProvider";




export default function AddItinerary(props)
{
    const [data, setData] = useData();

    const [disabled, setDisabled] = useState(false);
    const [user, setUser] = useState("");




    async function handleKeyDown(event)
    {
        if(event.key === "Enter")
        {
            await submitButtonOnClick();
        }
    }


    async function submitButtonOnClick()
    {
        if(user === "")
        {
            setData({toastMessage: "Input 'user' before submitting"});
        }
        else if(!user.match(/^[0-9a-zA-Z\s]+$/))
        {
            setData({toastMessage: "'user' can only contain letters, numbers and spaces"});
        }
        else if(data.hostels.length === 0)
        {
            setData({toastMessage: "Still loading hostels"});
        }
        else if(data.itineraries.some(itinerary => itinerary.user.toLowerCase().trim() === user.toLowerCase().trim()))
        {
            setData({toastMessage: "User name '" + user + "' already taken, enter new name"});
        }
        else
        {
            await fetchAddItinerary();
        }
    }






    //
    //////Add a new Itinerary
    //
    async function fetchAddItinerary()
    {
        setDisabled(true);
        setData({showSpinner: true});



        // let requestBody = {reviewer: reviewer, review: review};
        let methodType = "GET"
        let requestUrl = (data.config.baseUrl + "/itineraries/new/" + user);
        let requestHeaders = {"Content-Type": "application/json"};

        const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders});

        if(Number(response.status.toString().substring(0, 1)) === 2) //check that response code starts with 2
        {
            const jsonData = await response.json();
            await fetchPopulateStages();
            await props.fetchItinerariesData();


            setUser("");
            setData({toastSuccess: "Itinerary Added"});
            setData({itinerariesFilterText: user});
            setUser("");
        }
        else
        {
            setData({toastError: "Error: " + response.status + " - Could not action"});
        }


        setData({showSpinner: false});
        setDisabled(false);
    }

    async function fetchPopulateStages()
    {
        for(let index = 0; index < 20; index++)
        {
            let requestBody = {hostel: 999, nights: 999};
            let methodType = "POST"
            let requestUrl = (data.config.baseUrl + "/itineraries/stages/new/" + user);
            let requestHeaders = {"Content-Type": "application/json"};

            const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders, body: JSON.stringify(requestBody)});

            if(Number(response.status.toString().substring(0, 1)) === 2) //check that response code starts with 2
            {
                const jsonData = await response.json();
                // console.log(jsonData);
            }
            else
            {
                setData({toastError: "Error: " + response.status + " - Could not action"});
            }
        }
    }



    return (
        <ContainerContent size={12} icon="plus" title={'Add New Itinerary'}>

            <h4>Start your journey here</h4>

            <p className="mb-3">
                Add a new Itinerary then edit bellow
            </p>

            <div className="input-group">
                <span className="input-group-text">Add</span>

                <input value={user} onChange={e => setUser(e.target.value)} onKeyDown={handleKeyDown} disabled={disabled} placeholder="User" type="text" aria-label="review" id={"user"} className="form-control w-50"/>

                <button onClick={submitButtonOnClick} disabled={disabled} className="btn btn-outline-light" type="button" id="submit">Submit</button>
            </div>

        </ContainerContent>
    );
}
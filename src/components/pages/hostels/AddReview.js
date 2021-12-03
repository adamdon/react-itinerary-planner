import React, {useEffect, useState} from "react";
import {useData} from "../../data/DataContextProvider"
import SimpleBar from 'simplebar-react';




export default function AddReview(props)
{
    const [data, setData] = useData();

    const [disabled, setDisabled] = useState(false);
    const [reviewer, setReviewer] = useState("");
    const [review, setReview] = useState("");


    async function handleKeyDown(event)
    {
        if(event.key === "Enter")
        {
            await submitButtonOnClick();
        }
    }

    
    async function submitButtonOnClick()
    {
        if(reviewer === "")
        {
            setData({toastMessage: "Input 'Name' before submitting"});
        }
        else if(review === "")
        {
            setData({toastMessage: "Input 'Comment' before submitting"});
        }
        else
        {
            await fetchAddReview();
        }
    }


    async function fetchAddReview()
    {
        setDisabled(true);
        setData({showSpinner: true});



        let requestBody = {reviewer: reviewer, review: review};
        let methodType = "POST"
        let requestUrl = (data.config.baseUrl + "/hostels/review/" + props.hostel.id);
        let requestHeaders = {"Content-Type": "application/json"};

        const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders, body: JSON.stringify(requestBody)});

        if(Number(response.status.toString().substring(0, 1)) === 2) //check that response code starts with 2
        {
            const jsonData = await response.json();
            // setData((oldData) => ({...oldData, hostels: (oldData.hostels[oldData.hostels.indexOf(props.hostel)].reviews.push(requestBody))}));
            await props.fetchHostelData();
            setReviewer("");
            setReview("");
            setData({toastSuccess: "Review Added"});
        }
        else
        {
            setData({toastError: "Error: " + response.status + " - Could not action"});
        }


        setData({showSpinner: false});
        setDisabled(false);
    }





    return (
            <div className={"alert bg-secondary simplebar-content"}>

                <span><h6><i className={"fa fa-comment"}></i> Add Review</h6></span>

                <div className="input-group">
                    <span className="input-group-text">New Review</span>

                    <input value={reviewer} onChange={e => setReviewer(e.target.value)} onKeyDown={handleKeyDown} disabled={disabled} placeholder="Name" type="text" aria-label="reviewer" id={"reviewer_" + props.hostel.id} className="form-control w-10" />
                    <input value={review} onChange={e => setReview(e.target.value)} onKeyDown={handleKeyDown} disabled={disabled} placeholder="Comment" type="text" aria-label="review" id={"review"} className="form-control w-50"/>

                    <button onClick={submitButtonOnClick} disabled={disabled} className="btn btn-outline-light" type="button" id="submit">Submit</button>
                </div>

            </div>
    );
}



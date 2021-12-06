import React, {useState, useEffect} from "react";
import {useData} from "../../data/DataContextProvider";
import ViewReviews from "./ViewReviews";
import AddReview from "./AddReview";
import Info from "./Info";
import ViewRatings from "./ViewRatings";

export default function ExpandedHostelBox(props)
{
    const [data, setData] = useData();



    return (
        <div className="collapse collapse-content" id={"collapse" + props.hostel.id}>

            <Info hostel={props.hostel}/>
            <div className={"alert bg-secondary"} style={{minHeight: 150}}>{props.hostel.description}</div>
            <AddReview hostel={props.hostel} fetchHostelData={() => props.fetchHostelData()}/>
            <ViewReviews hostel={props.hostel}/>
            <ViewRatings hostel={props.hostel}/>



        </div>
    );
}



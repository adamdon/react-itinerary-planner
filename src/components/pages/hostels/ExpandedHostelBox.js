import React, {useState, useEffect} from "react";
import {useData} from "../../data/DataContextProvider";
import ViewReviews from "./ViewReviews";
import AddReview from "./AddReview";
import Info from "./Info";

export default function ExpandedHostelBox(props)
{
    const [data, setData] = useData();



    return (
        <div className="collapse collapse-hostel-box collapse-content" id={"collapse" + props.hostel.id}>

            <div className={"alert bg-secondary"} style={{minHeight: 150}}>
                {props.hostel.description}
            </div>


            <Info hostel={props.hostel}/>

            <AddReview hostel={props.hostel} fetchHostelData={() => props.fetchHostelData()}/>

            <ViewReviews hostel={props.hostel}/>


        </div>
    );
}



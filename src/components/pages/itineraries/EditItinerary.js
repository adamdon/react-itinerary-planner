import React from "react";
import Info from "../hostels/Info";
import AddReview from "../hostels/AddReview";
import ViewReviews from "../hostels/ViewReviews";
import ViewRatings from "../hostels/ViewRatings";




export default function EditItinerary(props)
{


    return (
        <div className="collapse" id={"collapse-edit-" + props.itinerary.user}>

            <div className="" style={{height: 300}}>
                {"Edit stuff here for " +  props.itinerary.user}

            </div>

            {/*<Info hostel={props.hostel}/>*/}
            {/*<div className={"alert bg-secondary"} style={{minHeight: 150}}>{props.hostel.description}</div>*/}
            {/*<AddReview hostel={props.hostel} fetchHostelData={() => props.fetchHostelData()}/>*/}
            {/*<ViewReviews hostel={props.hostel}/>*/}
            {/*<ViewRatings hostel={props.hostel}/>*/}



        </div>
    );
}
import React from "react";




export default function ViewItinerary(props)
{


    return (
        <div className="collapse" id={"collapse-edit-" + props.itinerary.user}>

            <div className="" style={{height: 500}}>
                {"View stuff here for " +  props.itinerary.user}
                {"View stuff here for " +  props.itinerary.user}
                {"View stuff here for " +  props.itinerary.user}
                {"View stuff here for " +  props.itinerary.user}
                {"View stuff here for " +  props.itinerary.user}
            </div>

            {/*<Info hostel={props.hostel}/>*/}
            {/*<div className={"alert bg-secondary"} style={{minHeight: 150}}>{props.hostel.description}</div>*/}
            {/*<AddReview hostel={props.hostel} fetchHostelData={() => props.fetchHostelData()}/>*/}
            {/*<ViewReviews hostel={props.hostel}/>*/}
            {/*<ViewRatings hostel={props.hostel}/>*/}



        </div>
    );
}
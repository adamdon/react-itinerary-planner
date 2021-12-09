import React from "react";
import Highlighter from "react-highlight-words";
import MapBox from "../hostels/MapBox";




export default function PreviewItinerary(props)
{


    return (
        <div className="collapse show" id={"collapse-edit-" + props.itinerary.user}>

            {JSON.stringify(props.itinerary)}

            {/*<div className="" style={{height: 300}}>*/}
            {/*    {"Edit stuff here for " +  props.itinerary.user}*/}

            {/*</div>*/}

            {/*<Info hostel={props.hostel}/>*/}
            {/*<div className={"alert bg-secondary"} style={{minHeight: 150}}>{props.hostel.description}</div>*/}
            {/*<AddReview hostel={props.hostel} fetchHostelData={() => props.fetchHostelData()}/>*/}
            {/*<ViewReviews hostel={props.hostel}/>*/}
            {/*<ViewRatings hostel={props.hostel}/>*/}



        </div>
    );
}
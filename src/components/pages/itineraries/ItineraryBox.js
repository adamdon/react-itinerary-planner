import React, {useEffect, useState} from "react";
import ContainerContent from "../../containers/ContainerContent";
import CollapsedHostelBox from "../hostels/CollapsedHostelBox";
import ExpandedHostelBox from "../hostels/ExpandedHostelBox";
import {useData} from "../../data/DataContextProvider";
import EditItinerary from "./EditItinerary";
import PreviewItinerary from "./PreviewItinerary";




export default function ItineraryBox(props)
{
    const [size, setSize] = useState(4);
    const [data, setData] = useData();


    useEffect(() =>
    {
        // console.log("useEffect");

    }, []);


    function moreOnClick()
    {
        if(size === 4)//expand to large
        {
            setSize(12);
        }
        else if(size === 12)//collapse to small
        {
            setSize(4);
        }
    }

    return (
        <ContainerContent size={size} icon="hotel" title={props.itinerary.user}>


            {/*{JSON.stringify(props.itinerary)}*/}

            <PreviewItinerary itinerary={props.itinerary}/>


            <EditItinerary itinerary={props.itinerary}/>



            <div className="mt-2 text-center">
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" className="btn btn-outline-light"><i className="fa fa-road"></i> View</button>
                    <a href={'http://localhost:3000/hostel/' + props.itinerary.user} className="btn btn-outline-light" target="_blank" rel="noopener noreferrer"><i className="fa fa-share-alt"></i> Share</a>
                    <button onClick={moreOnClick} data-bs-target={"#collapse-edit-" + props.itinerary.user} data-bs-toggle="collapse" aria-expanded="false" type="button" className="btn btn-outline-light"><i className="fa fa-edit"></i>
                        {size === 4 ? " Edit" : " Finish Edit"}
                    </button>
                </div>
            </div>




        </ContainerContent>
    );
}
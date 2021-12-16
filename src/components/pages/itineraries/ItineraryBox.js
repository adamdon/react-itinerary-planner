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
    // const [showPreview, setShowPreview] = useState(true);
    // const [showView, setShowView] = useState(false);
    // const [showEdit, setShowEdit] = useState(false);

    const [data, setData] = useData();


    useEffect(() =>
    {
        // console.log("useEffect");

    }, []);


    function editOnClick()
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


            {/*<div className="mt-2 text-center">*/}
            {/*    <div className="d-grid gap-2" role="group" aria-label="Basic mixed styles example">*/}
            {/*        <a href={'http://localhost:3000/hostel/' + props.hostel.id} className="btn btn-outline-light" target="_blank" rel="noopener noreferrer"><i className="fa fa-share-alt"></i> Share</a>*/}
            {/*        <button onClick={moreOnClick} data-bs-toggle="collapse" data-bs-target={"#collapse" + props.hostel.id} aria-expanded="false" type="button" className="btn btn-outline-light"><i className="fa fa-info-circle"></i>*/}
            {/*            {size === 6 ? " Show More" : " Show Less"}*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="mt-3 text-center">
                <div className="d-grid gap-2" role="group" aria-label="Basic mixed styles example">
                    <button onClick={editOnClick} data-bs-target={"#collapse-edit-" + props.itinerary.user} data-bs-toggle="collapse" aria-expanded="false" type="button" className="btn btn-outline-light"><i className="fa fa-edit"></i>
                        {size === 4 ? " Edit" : " Finish Edit"}
                    </button>
                </div>
            </div>




        </ContainerContent>
    );
}
import React, {useEffect, useState} from "react";
import ContainerContent from "../../containers/ContainerContent";
import CollapsedHostelBox from "../hostels/CollapsedHostelBox";
import ExpandedHostelBox from "../hostels/ExpandedHostelBox";
import {useData} from "../../data/DataContextProvider";




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


            {JSON.stringify(props.itinerary)}

            {/*always shown nav buttons*/}
            <div className="mt-2 text-center">
                <div className="d-grid gap-2" role="group" aria-label="Basic mixed styles example">
                    <a href={'http://localhost:3000/hostel/' + props.itinerary.user} className="btn btn-outline-light" target="_blank" rel="noopener noreferrer"><i className="fa fa-share-alt"></i> Share</a>
                    <button onClick={moreOnClick} data-bs-toggle="collapse" data-bs-target={"#collapse" + props.itinerary.user} aria-expanded="false" type="button" className="btn btn-outline-light"><i className="fa fa-info-edit"></i>
                        {size === 4 ? " Edit" : " Finish Edit"}
                    </button>
                </div>
            </div>

        </ContainerContent>
    );
}
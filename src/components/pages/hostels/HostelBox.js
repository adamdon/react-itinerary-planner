import ContainerContent from "../../containers/ContainerContent";
import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom'
import Highlighter from "react-highlight-words";
import {useData} from "../../data/DataContextProvider";
import MapBox from "./MapBox";
import CollapsedHostelBox from "./CollapsedHostelBox";
import ExpandedHostelBox from "./ExpandedHostelBox";



export default function HostelBox(props)
{
    const [size, setSize] = useState(6);
    const [data, setData] = useData();


    useEffect(() =>
    {
        // console.log("useEffect");

    }, []);


    function moreOnClick()
    {
        if(size === 6)//expand to large
        {
            setSize(12);
        }
        else if(size === 12)//collapse to small
        {
            setSize(6);
        }
    }

    return (
            <ContainerContent key={props.hostel.id} id={props.index} size={size} icon="hotel" title={props.hostel.name}>

                {/*/!*preview before more info expand *!/*/}
                <CollapsedHostelBox hostel={props.hostel}/>



                {/*more info expand details */}

                <ExpandedHostelBox hostel={props.hostel} fetchHostelData={() => props.fetchHostelData()}/>



                {/*always shown nav buttons*/}
                <div className="mt-2 text-center">
                    <div className="d-grid gap-2" role="group" aria-label="Basic mixed styles example">
                        {/*<button type="button" className="btn btn-outline-light"><i className="fa fa-share-alt"></i> Share</button>*/}
                        <a href={'http://localhost:3000/hostel/' + props.hostel.id} className="btn btn-outline-light" target="_blank" rel="noopener noreferrer"><i className="fa fa-share-alt"></i> Share</a>
                        <button onClick={moreOnClick} data-bs-toggle="collapse" data-bs-target={"#collapse" + props.hostel.id} aria-expanded="false" type="button" className="btn btn-outline-light"><i className="fa fa-info-circle"></i>
                            {size === 6 ? " Show More" : " Show Less"}
                        </button>
                    </div>
                </div>

            </ContainerContent>
    );
}



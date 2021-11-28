import ContainerContent from "../../containers/ContainerContent";
import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom'
import Highlighter from "react-highlight-words";
import {useData} from "../../../DataContextProvider";


export default function HostelBox(props)
{
    const [size, setSize] = useState(6);
    const [data, setData] = useData();


    useEffect(() =>
    {
        console.log("useEffect");

    }, []);


    function moreOnClick()
    {
        console.log("more on click");
        console.log(props.index);
        if(props.index % 2 === 0)//if box is even numbered
        {
            // let oddIndex = Number(parseInt(props.index) - 1);
            //
            // console.log("even open");
            // let evenElement = document.getElementById(props.index);
            // let oddElement = document.getElementById(oddIndex.toString());
            //
            // let evenElementCopy = evenElement.firstElementChild.cloneNode(true);
            // let oddElementCopy = oddElement.firstElementChild.cloneNode(true);
            //
            //
            // evenElement.replaceChild(oddElementCopy, evenElement.firstElementChild);
            // oddElement.replaceChild(evenElementCopy, oddElement.firstElementChild);


        }


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
        // <div className={"silent-div p-0 m-0 border-0"}>
            <ContainerContent key={props.hostel.id} id={props.index} size={size} icon="hotel" title={props.hostel.name}>

                <Highlighter
                    highlightClassName="highlightTextFilter"
                    searchWords={[data.filterText]}
                    autoEscape={false}
                    textToHighlight={props.hostel.description.substr(0, 340) + "..."}
                />
                





                <div className="collapse collapse-hostel-box" id={"collapse" + props.hostel.id}>
                    <div className="collapse-content">
                        400px Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                    </div>
                </div>



                <div className="mt-2 text-center">
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button onClick={moreOnClick} data-bs-toggle="collapse" data-bs-target={"#collapse" + props.hostel.id} aria-expanded="false" aria-controls="collapseExample" type="button" className="btn btn-outline-light"><i className="fa fa-info-circle"></i> More Info</button>
                        <button type="button" className="btn btn-outline-light"><i className="fa fa-map"></i> View Map</button>
                        <button type="button" className="btn btn-outline-light"><i className="fa fa-address-card"></i> Contact</button>
                    </div>
                </div>

            </ContainerContent>
          // </div>

    );
}



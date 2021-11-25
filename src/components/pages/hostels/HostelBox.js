import ContainerContent from "../../containers/ContainerContent";
import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom'


export default function HostelBox(props)
{
    const [size, setSize] = useState(6);


    useEffect(() =>
    {
        console.log("useEffect");

    }, []);


    function moreOnClick()
    {
        if(size === 6)
        {
            setSize(12);
        }
        else
        {
            setSize(6);
        }
        console.log("more on click");
    }

    return (
        <ContainerContent key={props.hostel.id} size={size} icon="hotel" title={props.hostel.name}>

            {props.hostel.description.substr(0, 340) + "..."}

            <div className="collapse collapse-hostel-box" id={"collapse" + props.hostel.id}>
                {/*{props.hostel.description.substr(340, 1000) + "..."}*/}

                400px Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.

            </div>

            <div className="mt-2 text-center">
                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button onClick={moreOnClick} data-bs-toggle="collapse" data-bs-target={"#collapse" + props.hostel.id} aria-expanded="false" aria-controls="collapseExample" type="button" className="btn btn-outline-light"><i className="fa fa-info-circle"></i> More Info</button>
                    <button type="button" className="btn btn-outline-light"><i className="fa fa-map"></i> View Map</button>
                    <button type="button" className="btn btn-outline-light"><i className="fa fa-address-card"></i> Contact</button>
                </div>



            </div>

        </ContainerContent>
    );
}



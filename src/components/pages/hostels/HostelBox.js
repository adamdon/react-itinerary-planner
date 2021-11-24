import ContainerContent from "../../containers/ContainerContent";
import React from "react";


export default function HostelBox(props)
{

    return (
        <ContainerContent key={props.hostel.id} size="4" icon="hotel" title={props.hostel.name}>
            {props.hostel.description.substr(0, 300) + "..."}

            <div className="mt-2 text-center">
                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button" className="btn btn-outline-light"><i className="fa fa-info-circle"></i> More Info</button>
                    <button type="button" className="btn btn-outline-light"><i className="fa fa-map"></i> View Map</button>
                    <button type="button" className="btn btn-outline-light"><i className="fa fa-address-card"></i> Contact</button>
                </div>
            </div>

        </ContainerContent>
    );
}



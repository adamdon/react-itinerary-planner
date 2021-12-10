import React from "react";
import Info from "../hostels/Info";




export default function DraggableHostel(props)
{


    return (
        <div className={props.isDragging ? "bg-secondary card text-white" : "bg-primary card text-white"}>

                <div className="card-header text-start"><i className={`fa fa-hotel`}></i> {props.hostel.name}</div>

                <div className="card-body">

                    <Info hostel={props.hostel}/>


                </div>

        </div>
    );
}
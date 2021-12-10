import React from "react";




export default function DroppableHostels(props)
{


    return (
        <div className={props.isDraggingOver ? "bg-black alert " : "bg-dark alert " + " "}>
            {props.children}
        </div>
    );
}
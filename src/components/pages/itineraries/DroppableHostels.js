import React from "react";




export default function DroppableHostels(props)
{


    return (
        <div className={props.isDraggingOver ? "bg-dark alert mb-3" : "bg-black alert mb-3" + " "} style={{height: '100%'}}>
            {props.children}
        </div>
    );
}
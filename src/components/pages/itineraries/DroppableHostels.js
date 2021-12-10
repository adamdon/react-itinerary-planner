import React from "react";




export default function DroppableHostels(props)
{


    return (
        <div className={props.isDraggingOver ? "bg-black alert mb-3" : "bg-dark alert mb-3" + " "} style={{height: '100%'}}>
            {props.children}
        </div>
    );
}
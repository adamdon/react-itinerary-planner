import React, {useState, useEffect} from "react";
import {useData} from "../../data/DataContextProvider";
import Highlighter from "react-highlight-words";
import MapBox from "./MapBox";

export default function CollapsedHostelBox(props)
{
    const [data, setData] = useData();



    return (

        <div className="collapse show" id={"collapse" + props.hostel.id}>
            {/*<div className="alert bg-secondary bg-gradient" style={{height: 150}}>*/}
            <div className="alert bg-secondary" style={{height: 150}}>
                <Highlighter
                    highlightClassName="highlightTextFilter"
                    searchWords={[data.filterText]}
                    autoEscape={false}
                    textToHighlight={props.hostel.description.substr(0, 320) + "..."}
                />
            </div>
            <MapBox hostel={props.hostel}/>
        </div>

    );
}



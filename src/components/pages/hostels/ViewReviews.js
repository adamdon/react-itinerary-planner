import React, {useEffect} from "react";
import {useData} from "../../data/DataContextProvider"
import SimpleBar from 'simplebar-react';


import ContainerContent from "../../containers/ContainerContent";



export default function ViewReviews()
{
    const [data, setData] = useData();


    return (
    <SimpleBar className={"simplebar-content"} forceVisible="y" autoHide={false} style={{height: 300}}>
        <div className={"alert bg-secondary simplebar-content"}>
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
            show number of reviews and list them with a simple scroller
        </div>
    </SimpleBar>

    );
}



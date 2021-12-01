import React, {useEffect} from "react";
import {useData} from "../../data/DataContextProvider"

import ContainerContent from "../../containers/ContainerContent";



export default function ViewReviews()
{
    const [data, setData] = useData();


    return (

        <div>
            show number of reviews and list them with a simple scroller
        </div>

    );
}



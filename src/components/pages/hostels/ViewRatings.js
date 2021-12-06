import React, {useEffect} from "react";
import {useData} from "../../data/DataContextProvider"

import ContainerContent from "../../containers/ContainerContent";
import SimpleBar from "simplebar-react";



export default function ViewRatings(props)
{
    const [data, setData] = useData();




    return (

        <div className={"alert bg-secondary"} style={{height: 200} }>
            {/*<div className={"alert bg-secondary simplebar-content"} style={{height: 150}}>*/}
            {/*<div className={""}>*/}
            {/*<div>*/}


            <span><h6><i className={"fa fa-star"}></i> Ratings ({props.hostel.ratings.length})</h6></span>


        </div>

    );
}



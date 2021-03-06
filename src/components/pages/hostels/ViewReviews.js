import React, {useEffect} from "react";
import {useData} from "../../data/DataContextProvider"
import SimpleBar from 'simplebar-react';


import ContainerContent from "../../containers/ContainerContent";
import HostelBox from "./HostelBox";



export default function ViewReviews(props)
{
    const [data, setData] = useData();


    return (
        <div className={"mb-3"} style={{height: 200}}>

    <SimpleBar className={"alert bg-secondary"} forceVisible={true} autoHide={false} style={{height: 200} }>
        {/*<div className={"alert bg-secondary simplebar-content"} style={{height: 150}}>*/}
        {/*<div className={""}>*/}
        {/*<div>*/}


            <span><h6><i className={"fa fa-comments"}></i> Reviews ({props.hostel.reviews.length})</h6></span>


            {props.hostel.reviews.map((review) => (
                <div key={props.hostel.reviews.indexOf(review)}>
                    <span>
                        <span className={"font-monospace"}> {`${props.hostel.reviews.indexOf(review) + 1}. `}</span>
                        <i className={"fa fa-user"}></i>
                        {` `}
                        <span className={"fw-bolder"}>{review.reviewer.charAt(0).toUpperCase() + review.reviewer.slice(1)}</span>
                        {' says: '}
                        <i className={"fa fa-comment"}></i>
                        {` `}
                        {review.review}
                    </span>
                </div>
            ))}
        {/*</div>*/}
    </SimpleBar>
    </div>

    );
}



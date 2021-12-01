import React, {useState, useEffect} from "react";
import {useData} from "../../data/DataContextProvider";
import ViewReviews from "./ViewReviews";

export default function ExpandedHostelBox(props)
{
    const [data, setData] = useData();



    return (

        <div className="collapse collapse-hostel-box collapse-content" id={"collapse" + props.hostel.id}>

            <div className={"alert bg-secondary"}>
                {props.hostel.description}
            </div>


            <div className="border-top border-secondary my-3 mx-0 px-3"></div> {/*---------divider ---------*/}


            <div className="text-center">
                <table className="table table-sm table-hover bg-primary table-borderless table-fit d-inline-block m-0">
                    <thead>
                        <tr className="table-active">
                            <th className="text-center text-light" colSpan={2}>Hostel Info</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        <tr className="table-active">
                            <td className="text-end text-light px-3">Phone <i className="fa fa-phone"></i> :</td>
                            <td className="text-start text-light px-3">{props.hostel.phone}</td>

                        </tr>
                        <tr className="table-active">
                            <td className="text-end text-light px-3">Email <i className="fa fa-at"></i> :</td>
                            <td className="text-start text-light px-3">{props.hostel.email}</td>
                        </tr>

                        <tr className="table-active">
                            <td className="text-end text-light px-3">Address <i className="fa fa-road"></i> :</td>
                            <td className="text-start text-light px-3">{props.hostel.address}</td>
                        </tr>

                        <tr className="table-active">
                            <td className="text-end text-light px-3">Postcode <i className="fa fa-envelope"></i> :</td>
                            <td className="text-start text-light px-3">{props.hostel.postcode}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="border-top border-secondary my-3 mx-0 px-3"></div> {/*---------divider ---------*/}

            <ViewReviews/>

        </div>

    );
}



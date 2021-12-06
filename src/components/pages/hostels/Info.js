import React, {useEffect, useState} from "react";
import {useData} from "../../data/DataContextProvider"
import SimpleBar from 'simplebar-react';




export default function Info(props)
{
    const [data, setData] = useData();


    if (data.photos.length === 0)// do not render if photos hasn't loaded yet
    {
        return null;
    }

    return (
            // <div className="text-center rounded-3 py-3" style={{backgroundImage: `url('https://random.dog/428711bd-7381-4998-a4b5-47b682c95b1b.jpg')`}}>
                <div className="text-center rounded-3 py-3 mb-3" style={{backgroundImage: `url('${data.photos[props.hostel.id].src.landscape}')`}}>
                <table className="table table-sm table-hover bg-primary table-borderless table-fit d-inline-block m-0 pb-1 rounded-3">
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
    );
}



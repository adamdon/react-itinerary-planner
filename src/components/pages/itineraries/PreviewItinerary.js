import React from "react";
import {useData} from "../../data/DataContextProvider";
import {getDistance} from "geolib";




export default function PreviewItinerary(props)
{
    const [data, setData] = useData();

    if(data.hostels.length === 0 || data.itineraries.length === 0)
    {
        return null;
    }


    function getDistanceTotal()
    {
        let totalDistance = 0;

        let stages = Array.from(props.itinerary.stages.filter((stage) => stage.hostel !== 999));

        if(stages.length > 1) //check that there is at least 2 stages
        {
            for(let stage of stages)
            {
                if(stages.indexOf(stage) !== 0)//skip the first stage
                {
                    let lastStage = stages[stages.indexOf(stage) - 1];
                    let lastHostel = data.hostels.find((hostel) => Number(hostel.id) === lastStage.hostel);
                    let lastHostelLocation = lastHostel.location;

                    let currentHostel = data.hostels.find((hostel) => Number(hostel.id) === stage.hostel);
                    let currentHostelLocation = currentHostel.location;

                    let meterDistance = getDistance(
                        { latitude: lastHostelLocation.lat, longitude: lastHostelLocation.long },
                        { latitude: currentHostelLocation.lat, longitude: currentHostelLocation.long }
                    );

                    totalDistance = (totalDistance + meterDistance);
                }
            }
        }
        else
        {
            totalDistance = 0;
        }

        let kmDistance = (Number(totalDistance) / 1000).toFixed(0);
        let formattedDistance = kmDistance.toString() + "km"

        return formattedDistance;
    }


    return (
        <div className="collapse show" id={"collapse-edit-" + props.itinerary.user}>

            {/*{JSON.stringify(props.itinerary)}*/}

            <div className="text-center rounded-3 py-3" style={{backgroundImage: `url('./images/itinerary_background.jpg')`, backgroundSize: 'cover'}}>
                <table className="table table-sm table-hover bg-primary table-borderless table-fit d-inline-block m-0  rounded-3">
                    <thead>
                        <tr className="table-active">
                            {/*<th className="text-center text-light" colSpan={2}>Stage {props.index + 1}</th>*/}
                        </tr>
                    </thead>
                    <tbody className="">


                        <tr className="table-active">
                            <td className="text-end text-light px-3">Distance <i className="fa fa-flag-checkered"></i> :</td>
                            <td className="text-start text-light px-3">{getDistanceTotal()}</td>
                        </tr>

                        <tr className="table-active">
                            <td className="text-end text-light px-3">Stages <i className="fa fa-hotel"></i> :</td>
                            <td className="text-start text-light px-3">{props.itinerary.stages.filter((stage) => stage.hostel !== 999).length}</td>
                        </tr>

                    </tbody>
                </table>
            </div>


        </div>
    );
}
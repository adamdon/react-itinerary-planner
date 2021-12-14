import React, {useEffect} from "react";
import Info from "../hostels/Info";
import StageInfo from "./StageInfo";
import {useData} from "../../data/DataContextProvider";




export default function DraggableStage(props)
{
    const [data, setData] = useData();

    useEffect(() =>
    {
        // console.log("=================================");
        // console.log("=================================");
        // console.log(props.stage);
        // console.log(props.stage.hostel);
        // console.log(data.hostels);
        // console.log(data.hostels.find((hostel) => Number(hostel.id) ===props.stage.hostel));
        // console.log("=================================");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    return (
        <div className={props.isDragging ? "bg-secondary card text-white" : "bg-primary card text-white"}>

            <div className="card-header text-start"><i className={`fa fa-road`}></i> {data.hostels.find((hostel) => Number(hostel.id) === props.stage.hostel).name} - Stage: {props.index + 1}</div>

            <div className="card-body">

                {/*<Info hostel={props.hostel}/>*/}
                <StageInfo stage={props.stage} itinerary={props.itinerary} index={props.index} hostel={data.hostels.find((hostel) => Number(hostel.id) === props.stage.hostel)}/>

            </div>

        </div>
    );
}
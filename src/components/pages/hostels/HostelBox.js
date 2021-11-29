import ContainerContent from "../../containers/ContainerContent";
import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom'
import Highlighter from "react-highlight-words";
import {useData} from "../../data/DataContextProvider";


export default function HostelBox(props)
{
    const [size, setSize] = useState(6);
    const [data, setData] = useData();


    useEffect(() =>
    {
        console.log("useEffect");

    }, []);


    function moreOnClick()
    {
        console.log("more on click");
        console.log(props.index);
        if(props.index % 2 === 0)//if box is even numbered
        {
            // let oddIndex = Number(parseInt(props.index) - 1);
            //
            // console.log("even open");
            // let evenElement = document.getElementById(props.index);
            // let oddElement = document.getElementById(oddIndex.toString());
            //
            // let evenElementCopy = evenElement.firstElementChild.cloneNode(true);
            // let oddElementCopy = oddElement.firstElementChild.cloneNode(true);
            //
            //
            // evenElement.replaceChild(oddElementCopy, evenElement.firstElementChild);
            // oddElement.replaceChild(evenElementCopy, oddElement.firstElementChild);


        }


        if(size === 6)//expand to large
        {
            setSize(12);
        }
        else if(size === 12)//collapse to small
        {
            setSize(6);
        }
    }

    return (
        // <div className={"silent-div p-0 m-0 border-0"}>
            <ContainerContent key={props.hostel.id} id={props.index} size={size} icon="hotel" title={props.hostel.name}>




                <div className="collapse show collapse-hostel-box" id={"collapse" + props.hostel.id}>
                    <div className="">
                        <Highlighter
                            highlightClassName="highlightTextFilter"
                            searchWords={[data.filterText]}
                            autoEscape={false}
                            textToHighlight={props.hostel.description.substr(0, 340) + "..."}
                        />
                    </div>
                </div>




                <div className="collapse collapse-hostel-box" id={"collapse" + props.hostel.id}>
                    <div className="collapse-content">

                        {props.hostel.description}

                        <p>

                        </p>


                        <div className="table-responsive">
                            <table className="table table-sm table-hover primary table-borderless rounded">
                                <thead>
                                    <tr className="table-active">
                                        <th className="text-center text-light" colSpan={2}>Hostel Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="table-active">
                                        <td  style={{width: "50%"}} className="text-end text-light">Phone <i className="fa fa-phone"></i> :</td>
                                        <td style={{width: "50%"}} className="text-start text-light">{props.hostel.phone}</td>

                                    </tr>
                                    <tr className="table-active">
                                        <td  style={{width: "50%"}} className="text-end text-light">Email <i className="fa fa-at"></i> :</td>
                                        <td style={{width: "50%"}} className="text-start text-light">{props.hostel.email}</td>
                                    </tr>

                                    <tr className="table-active">
                                        <td  style={{width: "50%"}} className="text-end text-light">Address <i className="fa fa-road"></i> :</td>
                                        <td style={{width: "50%"}} className="text-start text-light">{props.hostel.address}</td>
                                    </tr>

                                    <tr className="table-active">
                                        <td  style={{width: "50%"}} className="text-end text-light">Postcode <i className="fa fa-envelope"></i> :</td>
                                        <td style={{width: "50%"}} className="text-start text-light">{props.hostel.postcode}</td>
                                    </tr>


                            </tbody>
                        </table>
                    </div>

                    </div>
                </div>





                <div className="mt-2 text-center">
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button onClick={moreOnClick} data-bs-toggle="collapse" data-bs-target={"#collapse" + props.hostel.id} aria-expanded="false" type="button" className="btn btn-outline-light"><i className="fa fa-info-circle"></i> More Info</button>
                        <button type="button" className="btn btn-outline-light"><i className="fa fa-map"></i> View Map</button>
                        <button type="button" className="btn btn-outline-light"><i className="fa fa-address-card"></i> Contact</button>
                    </div>
                </div>

            </ContainerContent>
          // </div>

    );
}



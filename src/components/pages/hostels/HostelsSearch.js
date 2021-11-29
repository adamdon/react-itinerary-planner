import React, {useEffect} from "react";
import {useData} from "../../data/DataContextProvider"
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";
import HostelBox from "./HostelBox";



export default function HostelsSearch()
{
    const [data, setData] = useData();











    function handleFilterTextChange(e)
    {
        let filterText = e.target.value.toLowerCase();
        setData({filterText: filterText});
        console.log("handleFilterTextChange: " + filterText);
        if(filterText === "")
        {
            setData({filteredHostels: data.hostels});
        }
        else
        {
            let newItems = data.hostels.filter(hostel => (hostel.name.toLowerCase() + " " + hostel.description.toLowerCase() + " " + hostel.postcode.toLowerCase()).includes(filterText));

            setData({filteredHostels: newItems});
        }
    }



    return (

            <ContainerContent size="12" icon="search" title="Search">

                <h4>Search for a hostel</h4>
                <p className="mb-3">
                    Find a hostel for your next trip by looking up the name or description
                </p>
                <form action="" className="" onSubmit={e => e.preventDefault()}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control form-control-lg" placeholder="Search here" onChange={handleFilterTextChange}/>
                        <button type="submit" className="input-group-text btn-success"><i className="fa fa-search me-2"></i> Search</button>
                    </div>
                </form>

            </ContainerContent>

    );
}



import React, {useEffect} from "react";
import {useData} from "../../data/DataContextProvider"

import ContainerContent from "../../containers/ContainerContent";



export default function Ratings()
{
    const [data, setData] = useData();




    return (

        <ContainerContent size="12" icon="search" title="Search">

            <h4>Search for a hostel</h4>
            <p className="mb-3">
                Find a hostel for your next trip by looking up the name, description, address or postcode.
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



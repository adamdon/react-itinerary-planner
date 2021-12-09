import React, {useEffect, useState} from "react";
import {useData} from "../../data/DataContextProvider";
import ContainerContent from "../../containers/ContainerContent";
import AddItinerary from "./AddItinerary";




export default function SearchItineraries(props)
{
    const [data, setData] = useData();


    useEffect(() =>
    {
        console.log("handleFilterTextChange: " + data.itinerariesFilterText);
        if(data.itinerariesFilterText === "")
        {
            console.log(data.itinerariesFilterText);
            setData({itinerariesFiltered: data.itineraries});
        }
        else
        {
            let newItems = data.itineraries.filter(itinerary => (itinerary.user.toLowerCase()).includes(data.itinerariesFilterText.toLowerCase()));
            console.log(newItems);
            setData({itinerariesFiltered: newItems});
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.itinerariesFilterText])





    return (

        <ContainerContent size="12" icon="search" title="Search Itineraries">

            {/*<h4>Search for a hostel</h4>*/}
            <p className="mb-3">
                Find  itineraries by searching the user name that created them.
            </p>
            <form action="" className="" onSubmit={e => e.preventDefault()}>
                <div className="input-group mb-3">
                    <input value={data.itinerariesFilterText} onChange={e => setData({itinerariesFilterText: e.target.value})} type="text" className="form-control form-control" placeholder="Search here"/>
                    <button type="submit" className="input-group-text btn-success"><i className="fa fa-search me-2"></i> Search</button>
                </div>
            </form>

        </ContainerContent>

    );
}
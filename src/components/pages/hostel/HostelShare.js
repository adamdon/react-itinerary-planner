import React, {useEffect, useState} from "react";
import ContainerContent from "../../containers/ContainerContent";
import {useData} from "../../data/DataContextProvider";
import Info from "../hostels/Info";
import AddReview from "../hostels/AddReview";
import ViewReviews from "../hostels/ViewReviews";
import ViewRatings from "../hostels/ViewRatings";
import {createClient} from "pexels";





export default function HostelShare(props)
{
    const [data, setData] = useData();
    const [hostel, setHostel] = useState();

    useEffect(() => {
        async function mountUseEffect()
        {
            await fetchHostelData();
        }

        if(data.hostels.length === 0)
        {
            mountUseEffect().then(r => console.log("hostels loaded complete"));
        }
        else
        {
            if(data.hostels.some(element => element.id === props.id))
            {
                let foundHostel = (data.hostels.find(element => element.id === props.id));
                setHostel(foundHostel);
                // console.log("Why")
                // console.log(foundHostel.id);
                // console.log(foundHostel);
                // console.log(props.id);
            }
            else
            {
                setData({toastError: "Error Hostel Id not found"});
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() =>
    {
        if(data.hostels.length > 0)
        {
            if(data.hostels.some(element => element.id === props.id))
            {
                let foundHostel = (data.hostels.find(element => element.id === props.id));
                setHostel(foundHostel);
                // console.log("Why")
                // console.log(foundHostel.id);
                // console.log(props.id);
            }
            else
            {
                setData({toastError: "Error Hostel Id not found"});
            }

        }

    }, [data.hostels, props.id, setData]);



    async function fetchHostelData()
    {
        setData({showSpinner: true});


        // let requestBody = {};
        let methodType = "GET"
        let requestUrl = (data.config.baseUrl + "/hostels");
        let requestHeaders = {"Content-Type": "application/json"};

        const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders});
        // const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders, body: JSON.stringify(requestBody)});

        if(Number(response.status.toString().substring(0, 1)) === 2)
        {
            const jsonData = await response.json();
            setData({hostels: jsonData, filteredHostels: jsonData});
            console.log(jsonData);
        }
        else
        {
            setData({toastError: "Error: " + response.status + " - Could not load"});
        }

        await fetchImageData();
        setData({showSpinner: false});
    }

    async function fetchImageData()
    {
        let searchParams = {
            query: "nature, scotland",
            per_page: 80
        }
        let pexelsClient = createClient(data.config.pexelsApiKey);
        let pexelsData = await pexelsClient.photos.search(searchParams);
        let photosJson = pexelsData.photos;
        // console.log(photosJson);
        setData({photos: photosJson})
    }









    if (!hostel)// do not render if data hasn't loaded
    {
        return null;
    }

    return (
        <ContainerContent size="12" icon="hotel" title={hostel.name}>
            <Info hostel={hostel}/>
            <div className={"alert bg-secondary"} style={{minHeight: 150}}>{hostel.description}</div>
            <AddReview hostel={hostel} fetchHostelData={() => fetchHostelData()}/>
            <ViewReviews hostel={hostel}/>
            <ViewRatings hostel={hostel}/>
        </ContainerContent>
    )
}



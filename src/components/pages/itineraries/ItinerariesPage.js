import React, {useEffect} from "react";
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import HostelsSearch from "../hostels/HostelsSearch";
import {useData} from "../../data/DataContextProvider";
import {createClient} from "pexels";
import ItineraryBox from "./ItineraryBox";
import AddItinerary from "./AddItinerary";




export default function ItinerariesPage(props)
{
    const [data, setData] = useData();



    useEffect( () =>
    {
        async function mountUseEffect()
        {
            await fetchItinerariesData();
        }
        mountUseEffect().then(r => console.log("fetchItinerariesData complete"))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    async function fetchItinerariesData()
    {
        setData({showSpinner: true});


        // let requestBody = {};
        let methodType = "GET"
        let requestUrl = (data.config.baseUrl + "/itineraries");
        let requestHeaders = {"Content-Type": "application/json"};

        const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders});
        // const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders, body: JSON.stringify(requestBody)});

        if(Number(response.status.toString().substring(0, 1)) === 2)
        {
            const jsonData = await response.json();
            setData({itineraries: jsonData});
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

    return (
        <span>
            <ContainerLayout>


                <ContainerContentRow>
                    <AddItinerary/>
                </ContainerContentRow>


                <ContainerContentRow>
                    <HostelsSearch/>
                </ContainerContentRow>


                <ContainerContentRow>
                    {data.itineraries.map((itinerary) => (
                        <ItineraryBox key={itinerary.user} itinerary={itinerary}/>
                    ))}
                </ContainerContentRow>



            </ContainerLayout>
        </span>
    );
}
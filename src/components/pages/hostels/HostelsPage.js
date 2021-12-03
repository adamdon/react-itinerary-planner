import React, {useEffect} from "react";
import {useData} from "../../data/DataContextProvider"
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";
import HostelBox from "./HostelBox";
import HostelsSearch from "./HostelsSearch";



export default function HostelsPage()
{
    const [data, setData] = useData();

    useEffect( () =>
    {
        async function mountUseEffect()
        {
            await fetchHostelData();
        }
        mountUseEffect().then(r => console.log("HostelsPage mountUseEffect complete"))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




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


        setData({showSpinner: false});
    }





    return (
        <span>
            <ContainerLayout>



                <ContainerContentRow>
                    <HostelsSearch/>
                </ContainerContentRow>


                <ContainerContentRow>
                    {data.filteredHostels.map((hostel) => (
                        <HostelBox key={hostel.id} index={data.filteredHostels.indexOf(hostel) + 1} hostel={hostel}/>
                    ))}
                </ContainerContentRow>



            </ContainerLayout>
        </span>
    );
}



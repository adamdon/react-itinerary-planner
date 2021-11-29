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
        // setData({toastMessage: "componentDidMount"});
        // console.log("componentDidMount call");

        setData({showSpinner: true});
        const response = await fetch(data.config.baseUrl + "/hostels")
        const json = await response.json();

        await new Promise(resolve => setTimeout(resolve, 1000));
        setData({showSpinner: false});
        console.log(json);
        setData({hostels: json, filteredHostels: json});
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



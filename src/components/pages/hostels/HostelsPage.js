import React, {useEffect} from "react";
import {useData} from "../../../DataContextProvider"
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";



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
        console.log("componentDidMount call");

        setData({showSpinner: true});
        const response = await fetch(data.config.baseUrl + "/hostels")
        const json = await response.json();

        await new Promise(resolve => setTimeout(resolve, 1000));
        setData({showSpinner: false});
        console.log(json);

    }


    return (
        <span>
            <ContainerLayout>

                <ContainerContentRow>
                    <ContainerContent size="12" icon="search" title="Search">

                        <h4>Search for a hostel</h4>
                        <button onClick={fetchHostelData}>call</button>
                        <p className="mb-3">
                            Find a hostel for your next trip by looking up the name or description
                        </p>

                        <form action="" className="">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control form-control-lg" placeholder="Search Here"/>
                                <button type="submit" className="input-group-text btn-success"><i className="fa fa-search me-2"></i> Search</button>
                            </div>
                        </form>

                    </ContainerContent>
                </ContainerContentRow>

                <ContainerContentRow>



                    <ContainerContent size="4" icon="bitcoin" title="1">
                        {data.letter}
                    </ContainerContent>

                    <ContainerContent size="4" icon="clipboard" title="3">
                        test text3
                    </ContainerContent>

                    <ContainerContent size="4" icon="clipboard" title="4">
                        test text3
                    </ContainerContent>

                </ContainerContentRow>


            </ContainerLayout>
        </span>
    );
}



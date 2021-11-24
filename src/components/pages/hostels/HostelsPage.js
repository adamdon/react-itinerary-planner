import React, {useEffect} from "react";
import {useData} from "../../../DataContextProvider"
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";



export default function HostelsPage()
{
    const [data, setData] = useData();
    const hostels2 = [{name: "test1", id: 1}, {name: "test2", id: 2}];

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
        setData({hostels: json, filteredHostels: json});
    }




    function handleFilterTextChange(e)
    {
        let filterText = e.target.value;
        console.log("handleFilterTextChange: " + filterText);
        if(filterText === "")
        {
            setData({filteredHostels: data.hostels});
        }
        else
        {
            let newItems = data.hostels.filter(hostel => (hostel.name + " " + hostel.description).includes(filterText));
            console.log(data.hostels);
            console.log(newItems);
            setData({filteredHostels: newItems});
        }
    }



    return (
        <span>
            <ContainerLayout>

                <ContainerContentRow>
                    <ContainerContent size="12" icon="search" title="Search">

                        <h4>Search for a hostel</h4>
                        {/*<button onClick={fetchHostelData}>call</button>*/}
                        <p className="mb-3">
                            Find a hostel for your next trip by looking up the name or description
                        </p>

                        <form action="" className="">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control form-control-lg" placeholder="Search here" onChange={handleFilterTextChange}/>
                                <button type="submit" className="input-group-text btn-success"><i className="fa fa-search me-2"></i> Search</button>
                            </div>
                        </form>

                    </ContainerContent>
                </ContainerContentRow>

                <ContainerContentRow>



                    {data.filteredHostels.map((hostel) => (

                            <ContainerContent key={hostel.id} size="4" icon="hotel" title={hostel.name}>
                                {hostel.description.substr(0, 300) + "..."}

                                <div className="mt-2 text-center">
                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button type="button" className="btn btn-outline-light"><i className="fa fa-info-circle"></i> More Info</button>
                                        <button type="button" className="btn btn-outline-light"><i className="fa fa-map"></i> View Map</button>
                                        <button type="button" className="btn btn-outline-light"><i className="fa fa-address-card"></i> Contact</button>
                                    </div>
                                </div>

                            </ContainerContent>

                    ))}



                </ContainerContentRow>


            </ContainerLayout>
        </span>
    );
}



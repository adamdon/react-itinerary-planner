import React, {useEffect} from "react";
import {useData} from "../../../DataContextProvider"
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";
import HostelBox from "./HostelBox";



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
        // console.log("componentDidMount call");

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
        <span>
            <ContainerLayout>



                <ContainerContentRow>
                    <ContainerContent size="12" icon="search" title="Search">

                        <h4>Search for a hostel</h4>
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
                        <HostelBox key={hostel.id} index={data.filteredHostels.indexOf(hostel) + 1} hostel={hostel}/>
                    ))}
                </ContainerContentRow>



            </ContainerLayout>
        </span>
    );
}



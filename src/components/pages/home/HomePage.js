import NavTop from "../../NavTop";
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";
import React from "react";
import {useData} from "../../data/DataContextProvider";

export default function HomePage()
{
    const [data, setData] = useData();


    return (
        <span>
            <ContainerLayout>
                <ContainerContentRow>
                    <ContainerContent size="12" icon="home" title="Welcome get started with the two links below">
                        <div className={"rounded"} style={{height: 450, backgroundImage: `url('./images/home_main.jpg')`, backgroundSize: 'cover'}}>
                        </div>
                    </ContainerContent>
                </ContainerContentRow>


                <ContainerContentRow>
                    <ContainerContent size="6" icon="hotel" title="Hostels">

                        <div className="alert bg-secondary">
                            <p>
                                {"Use the menu to find the Hostel page and decide what places you would like to stay"}
                            </p>
                        </div>

                    </ContainerContent>

                    <ContainerContent size="6" icon="flag" title="Itineraries">
                        <div className="alert bg-secondary">
                            <p>
                                {"Use the menu to find the Itineraries page to create and edit you ideal itinerary"}
                            </p>
                        </div>
                    </ContainerContent>

                </ContainerContentRow>


            </ContainerLayout>
        </span>
    );

}
import NavTop from "../../NavTop";
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";
import React from "react";
import {useData} from "../../../DataContextProvider";

export default function HomePage()
{
    const [data, setData] = useData();


    return (
        <span>
            <ContainerLayout>
                <ContainerContentRow>
                    <ContainerContent size="12" icon="home" title="home">
                        Home Page
                    </ContainerContent>
                </ContainerContentRow>


                <ContainerContentRow>
                    <ContainerContent size="6" icon="bitcoin" title="other">
                        text1
                    </ContainerContent>

                    <ContainerContent size="6" icon="clipboard" title="info">
                        Text2
                    </ContainerContent>

                </ContainerContentRow>


            </ContainerLayout>
        </span>
    );

}
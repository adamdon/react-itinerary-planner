import React, {useState} from "react";
import {useData} from "../../../DataContextProvider"
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";



export default function HostelsPage()
{
    const [data, setData] = useData();



    return (
        <span>
            <ContainerLayout>

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



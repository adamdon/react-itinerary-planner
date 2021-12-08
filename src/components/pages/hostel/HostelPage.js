import React from "react";
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import { useParams } from "react-router-dom";
import HostelShare from "./HostelShare";

export default function HostelPage()
{
    return (
        <span>
            <ContainerLayout>

                <ContainerContentRow>
                    <HostelShare id={useParams().id}/>
                </ContainerContentRow>

            </ContainerLayout>
        </span>
    );
}



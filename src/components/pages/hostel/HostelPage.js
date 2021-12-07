import React from "react";
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import HostelsSearch from "../hostels/HostelsSearch";
import HostelBox from "../hostels/HostelBox";
import HostelShare from "./HostelShare";

export default function HostelPage(props)
{
    return (
        <span>
            <ContainerLayout>

                <ContainerContentRow>
                    <HostelShare/>
                </ContainerContentRow>

            </ContainerLayout>
        </span>
    );
}



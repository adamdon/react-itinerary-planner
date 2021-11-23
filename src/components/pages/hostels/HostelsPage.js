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
                    <ContainerContent size="12" icon="info" title="1">

                        <h4>Bootstrap 5 Search Bar</h4>
                        <p className="mb-3">To make a large search bar, we need to add both form-control and form-control-lg classes in the input element.</p>

                        <form action="" className="">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control form-control-lg" placeholder="Search Here"/>
                                <button type="submit" className="input-group-text btn-success"><i className="bi bi-search me-2"></i> Search</button>

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



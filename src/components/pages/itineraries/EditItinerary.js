import React, {useState, useEffect} from "react";
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DraggableHostel from "./DraggableHostel";
import {divIcon} from "leaflet/dist/leaflet-src.esm";
import DroppableHostels from "./DroppableHostels";
import {useData} from "../../data/DataContextProvider";
import DraggableStage from "./DraggableStage";
import Highlighter from "react-highlight-words";




export default function EditItinerary(props)
{
    const [data, setData] = useData();

    const [disabled, setDisabled] = useState(false);

    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() =>
    {
        // console.log("useEffect start");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() =>
    {
        // console.log(">>>>items update");
        // console.log(items)
        // console.log("<<<items update");


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);


    useEffect(() =>
    {
        async function selectedUseEffect()
        {
            await updateStages();
        }

        if(data.hostels.length > 0)
        {
            selectedUseEffect().then();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);





    useEffect(() =>
    {
        if(data.hostels.length > 0)//waits for everything to stop loading
        {
            //below removes already used hostels from loaded list so only hostels that aren't part of the itinerary show
            setItems(Array.from(data.hostels.filter((hostel) => !props.itinerary.stages.some((stage => Number(stage.hostel) === Number(hostel.id))))));

            //below removes masked out itineraries that have been deleted
            setSelected(Array.from(props.itinerary.stages.filter((stage) => stage.hostel !== 999)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.hostels]);




    function onDragEndSave(result)
    {
        const source = result.source;
        const destination = result.destination;

        if(!destination) //if dropped outside the list
        {
            return;
        }
        else if(source.droppableId === destination.droppableId) //if they are in the same list
        {
            const sourceList = getListFromId(source.droppableId);
            const reorderedList = reorderList(sourceList, source.index, destination.index);

            if (source.droppableId === "droppable")
            {
                setItems(reorderedList);
            }
            else if(source.droppableId === "droppable2")
            {
                setSelected(reorderedList);
            }
            else
            {
                console.error('Unknown list Id of ' + source.droppableId)
            }

        }
        else //if they are in different lists
        {
            const sourceList = getListFromId(source.droppableId);
            const destinationList = getListFromId(destination.droppableId);
            // const result = moveBetweenLists(sourceList, destinationList, source, destination);
            const result = moveNewBetweenLists(sourceList, destinationList, source, destination);

            setItems(result.droppable);
            setSelected(result.droppable2);
        }
    }




    function getListFromId(id)
    {
        let listIdPairings = {
            droppable: 'items',
            droppable2: 'selected'
        };

        if (listIdPairings[id] === "items")
        {
            return items;
        }
        else if (listIdPairings[id] === "selected")
        {
            return selected;
        }
    }





    function reorderList(list, startIndex, endIndex)
    {
        const listCopy = Array.from(list);
        const [removedItem] = listCopy.splice(startIndex, 1);
        listCopy.splice(endIndex, 0, removedItem);

        return listCopy;
    }



    // function moveBetweenLists(source, destination, droppableSource, droppableDestination)
    // {
    //     const sourceListCopy = Array.from(source);
    //     const destinationListCopy = Array.from(destination);
    //     const [removedItem] = sourceListCopy.splice(droppableSource.index, 1);
    //
    //     destinationListCopy.splice(droppableDestination.index, 0, removedItem);
    //
    //     const result = {};
    //     result[droppableSource.droppableId] = sourceListCopy;
    //     result[droppableDestination.droppableId] = destinationListCopy;
    //
    //     return result;
    // }


    function moveNewBetweenLists(source, destination, droppableSource, droppableDestination)
    {
        if(droppableDestination.droppableId === "droppable2")//Moving from hostels to stages
        {
            const sourceListCopy = Array.from(source);
            const destinationListCopy = Array.from(destination);
            const [removedItem] = sourceListCopy.splice(droppableSource.index, 1);

            let newStage = {hostel: Number(removedItem.id), nights: 1, stage: droppableDestination.index, uuid: uuid()};

            destinationListCopy.splice(droppableDestination.index, 0, newStage);


            const result = {};
            result[droppableSource.droppableId] = sourceListCopy;
            result[droppableDestination.droppableId] = destinationListCopy;
            return result;

        }
        else //Moving from stages to hostels
        {
            const sourceListCopy = Array.from(source);
            const destinationListCopy = Array.from(destination);
            const [removedItem] = sourceListCopy.splice(droppableSource.index, 1);

            let hostelToAddBack = data.hostels.find((hostel) => Number(hostel.id) === removedItem.hostel)

            destinationListCopy.splice(droppableDestination.index, 0, hostelToAddBack);


            const result = {};
            result[droppableSource.droppableId] = sourceListCopy;
            result[droppableDestination.droppableId] = destinationListCopy;
            return result;
        }

    }



    async function updateStages()
    {
        // console.log(">>>>selected updateStages " + props.itinerary.user);
        setDisabled(true);
        setData({showSpinner: true});

        // console.log(selected)

        let remoteStages = Array.from(props.itinerary.stages.filter((stage) => stage.hostel !== 999));


        // console.log(remoteStages);
        // console.log(selected);

        if(selected.length > remoteStages.length) //stage has been added
        {
            // console.log(">>>>>>>>>>> stage ADDED");
            for(let currentStage of selected)
            {
                await fetchUpdateStage(currentStage.hostel, currentStage.nights, selected.indexOf(currentStage) + 1);
            }
            props.itinerary.stages = selected;
        }
        else if(selected.length < remoteStages.length) //stage has been removed
        {
            // console.log(">>>>>>>>>>> stage REMOVED");

            for(let currentStage of selected)
            {
                await fetchUpdateStage(currentStage.hostel, currentStage.nights, selected.indexOf(currentStage) + 1);
            }
            await fetchUpdateStage(999, 999, (selected.length + 1)); //masks out the last element on remote
            props.itinerary.stages = selected;
        }
        else if(selected.length === remoteStages.length) // no change
        {
            // console.log(">>>>>>>>>>> stage SAME");

            for(let currentStage of selected)
            {
                await fetchUpdateStage(currentStage.hostel, currentStage.nights, selected.indexOf(currentStage) + 1);
            }
            props.itinerary.stages = selected;
        }


        setDisabled(false);
        setData({showSpinner: false});
        // console.log("<<<selected updateStages" + props.itinerary.user);
    }


    // async function updateStages()
    // {
    //     console.log(">>>>selected updateStages " + props.itinerary.user);
    //     console.log(selected)
    //     setDisabled(true);
    //     setData({showSpinner: true});
    //
    //
    //
    //     let remoteStages = Array.from(props.itinerary.stages.filter((stage) => stage.hostel !== 999));
    //
    //     console.log(selected.length);
    //     console.log(remoteStages.length);
    //     console.log(remoteStages);
    //     console.log(props.itinerary.stages);
    //
    //     if(selected.length > remoteStages.length) //stage has been added
    //     {
    //         console.log("XXX Stage ADDED");
    //
    //         for(let currentStage of selected)
    //         {
    //             await fetchUpdateStage(currentStage.hostel, currentStage.nights, selected.indexOf(currentStage) + 1);
    //         }
    //         // props.itinerary.stages = selected;
    //     }
    //     else if(selected.length < remoteStages.length) //stage has been removed
    //     {
    //         console.log("XXX Stage removed");
    //
    //         for(let currentStage of selected)
    //         {
    //             await fetchUpdateStage(currentStage.hostel, currentStage.nights, selected.indexOf(currentStage) + 1);
    //         }
    //         console.log("YYY about to mask " + (selected.length + 1))
    //         // await fetchUpdateStage(999, 999, (selected.length + 1)); //masks out the last element on remote
    //         // props.itinerary.stages = selected;
    //
    //     }
    //     else if(selected.length === remoteStages.length) // no change
    //     {
    //         console.log("XXX Stage THE SAME");
    //     }
    //
    //
    //     setDisabled(false);
    //     setData({showSpinner: false});
    //     console.log("<<<selected updateStages" + props.itinerary.user);
    // }



    async function fetchUpdateStage(hostelId, nightsNumber, stageNumber)
    {
        let requestBody = {hostel: hostelId, nights: nightsNumber};
        let methodType = "POST"
        let requestUrl = (data.config.baseUrl + "/itineraries/stages/update/" + props.itinerary.user + "/" + stageNumber);
        let requestHeaders = {"Content-Type": "application/json"};

        const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders, body: JSON.stringify(requestBody)});

        if(Number(response.status.toString().substring(0, 1)) === 2) //check that response code starts with 2
        {
            const jsonData = await response.json();
            // console.log(jsonData);
            // console.log(jsonData);
        }
        else
        {
            setData({toastError: "Error: " + response.status + " - Could not action"});
        }
    }










    return (
        <div className="collapse container" id={"collapse-edit-" + props.itinerary.user}>

            <div className="" style={{minHeight: 300}}>


                <div className="alert bg-secondary pb-0">
                    <p>
                        {"Drag and drop hostels on the left into the box on the right to create a stage, stages can be reorder in any way and can be removed by dragging them back into the left"}
                    </p>
                    <p>
                        {"The number of nights you spend at a stage can be changed with the '-' and '+' buttons"}
                    </p>
                </div>






                <DragDropContext onDragEnd={onDragEndSave}>

                    <div className={'container'}>
                        <div className="row">



                            <div className="col-6 text-center " >


                                <Droppable droppableId="droppable" >
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef} style={{height: '100%'}}>
                                            <DroppableHostels title={'Hostel Options'} isDraggingOver={snapshot.isDraggingOver}>

                                                {items.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{margin: `0 0 16px 0`, ...provided.draggableProps.style}}>
                                                                <DraggableHostel hostel={item} isDragging={snapshot.isDragging}/>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}

                                                {provided.placeholder}
                                            </DroppableHostels>


                                        </div>
                                    )}
                                </Droppable>

                            </div>





                            <div className="col-6 text-center" >


                                <Droppable droppableId="droppable2">
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef} style={{height: '100%'}} >
                                            <DroppableHostels title={'Your Itinerary'} isDraggingOver={snapshot.isDraggingOver} >
                                                {/*{provided.placeholder}*/}


                                                {selected.map((item, index) => (
                                                    <Draggable key={item.uuid} draggableId={item.uuid} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{margin: `0 0 16px 0`, ...provided.draggableProps.style}}>

                                                                <DraggableStage index={index} stage={item} itinerary={props.itinerary}  isDragging={snapshot.isDragging}/>

                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}

                                                {provided.placeholder}
                                            </DroppableHostels>


                                        </div>
                                    )}
                                </Droppable>


                            </div>

                        </div>
                    </div>






                </DragDropContext>

            </div>

        </div>
    );
}
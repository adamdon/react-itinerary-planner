import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Info from "../hostels/Info";
import AddReview from "../hostels/AddReview";
import ViewReviews from "../hostels/ViewReviews";
import ViewRatings from "../hostels/ViewRatings";


// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: "100%"
});

export default function EditItinerary(props)
{
    const [items, setItems] = useState(getItems(10));
    const [selected, setSelected] = useState(getItems(5, 10));

    useEffect(() =>
    {
        console.log("useEffect start");
        console.log(getList(2));
        console.log(getList("droppable"));
        console.log(getList("droppable2"));
        console.log(getItems(2, 2));
        console.log(items);
        console.log(selected);
        console.log(getItems(2, 2));
        console.log("useEffect start");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    let id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    let getList = id =>
    {
        if(id2List[id] === "items")
        {
            return items;
        }
        else if(id2List[id] === "selected")
        {
            return selected;
        }
    }

    let onDragEnd = result =>
    {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination)
        {
            return;
        }

        if (source.droppableId === destination.droppableId) //if they are in the same list
        {
            console.log("1!11111!!!!!!!!  SAME LIST")

            const reorder1 = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            // setItems(reorder1);

            // let state = { reorder1 };

            if (source.droppableId === 'droppable2')
            {
                console.log("1!11111!!!!!!!! droppable2")
                // state = { selected: reorder1 };
                // setItems(reorder1);
                setSelected(reorder1)

            }
            else
            {
                console.log("1!11111!!!!!!!! droppable1");
                console.log(reorder1);
                console.log(items);
                setItems(reorder1);
            }


        }
        else
        {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );


            // this.setState({
            //     items: result.droppable,
            //     selected: result.droppable2
            // });

            setItems(result.droppable);
            setSelected(result.droppable2);


        }
    };



    return (
        <div className="collapse container" id={"collapse-edit-" + props.itinerary.user}>

            <div className="" style={{minHeight: 300}}>





                {"Edit stuff here for " +  props.itinerary.user}

                <DragDropContext onDragEnd={onDragEnd}>

                    <div className={'container'}>
                        <div className="row">
                            <div className="col-6 text-center">

                                <div>
                                    div 1
                                </div>
                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}>
                                            {items.map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}>
                                                            {item.content}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

                            </div>



                            <div className="col-6 text-center">


                                <div>
                                    div 2
                                </div>

                                <Droppable droppableId="droppable2">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}>
                                            {selected.map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}>
                                                            {item.content}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>


                            </div>

                        </div>
                    </div>

                    {/*<Droppable droppableId="droppable">*/}
                    {/*    {(provided, snapshot) => (*/}
                    {/*        <div*/}
                    {/*            ref={provided.innerRef}*/}
                    {/*            style={getListStyle(snapshot.isDraggingOver)}>*/}
                    {/*            {items.map((item, index) => (*/}
                    {/*                <Draggable*/}
                    {/*                    key={item.id}*/}
                    {/*                    draggableId={item.id}*/}
                    {/*                    index={index}>*/}
                    {/*                    {(provided, snapshot) => (*/}
                    {/*                        <div*/}
                    {/*                            ref={provided.innerRef}*/}
                    {/*                            {...provided.draggableProps}*/}
                    {/*                            {...provided.dragHandleProps}*/}
                    {/*                            style={getItemStyle(*/}
                    {/*                                snapshot.isDragging,*/}
                    {/*                                provided.draggableProps.style*/}
                    {/*                            )}>*/}
                    {/*                            {item.content}*/}
                    {/*                        </div>*/}
                    {/*                    )}*/}
                    {/*                </Draggable>*/}
                    {/*            ))}*/}
                    {/*            {provided.placeholder}*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</Droppable>*/}

                    {/*<div>{'text'}</div>*/}

                    {/*<Droppable droppableId="droppable2">*/}
                    {/*    {(provided, snapshot) => (*/}
                    {/*        <div*/}
                    {/*            ref={provided.innerRef}*/}
                    {/*            style={getListStyle(snapshot.isDraggingOver)}>*/}
                    {/*            {selected.map((item, index) => (*/}
                    {/*                <Draggable*/}
                    {/*                    key={item.id}*/}
                    {/*                    draggableId={item.id}*/}
                    {/*                    index={index}>*/}
                    {/*                    {(provided, snapshot) => (*/}
                    {/*                        <div*/}
                    {/*                            ref={provided.innerRef}*/}
                    {/*                            {...provided.draggableProps}*/}
                    {/*                            {...provided.dragHandleProps}*/}
                    {/*                            style={getItemStyle(*/}
                    {/*                                snapshot.isDragging,*/}
                    {/*                                provided.draggableProps.style*/}
                    {/*                            )}>*/}
                    {/*                            {item.content}*/}
                    {/*                        </div>*/}
                    {/*                    )}*/}
                    {/*                </Draggable>*/}
                    {/*            ))}*/}
                    {/*            {provided.placeholder}*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</Droppable>*/}



                </DragDropContext>

            </div>

        </div>
    );
}
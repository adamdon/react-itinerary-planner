import React, {useContext, useState} from "react"


const DataContext = React.createContext();
const SetDataContext = React.createContext();
export function useData()
{
    return [useContext(DataContext), useContext(SetDataContext)];
}


export default function DataContextProvider({children})
{
    const [localData, setLocalData] = useState(() =>
    {
        // console.log("React DataContextProvider running...")
        let data = {
            letter: "c",
            letter2: "x",
            number: 0,
            toastMessage: "",
            toastSuccess: "",
            toastError: "",
            showSpinner: false,
            config: {
                pexelsApiKey: ("563492ad6f9170000100000151" + "dafa4f65b54cb2b8e208e3c4d7395" + (3 - 2).toString()),
                // baseUrl: "http://localhost:3001/api",
                // baseUrl: "https://react-itinerary-planner-api.herokuapp.com/api",
                baseUrl: process.env.REACT_APP_API_URL,
            },
            photos: [],
            itineraries: [],
            itinerariesFiltered: [],
            itinerariesFilterText: "",
            hostels: [],
            filteredHostels: [],
            filterText: "",
            firstRun: true,
        }
        console.log("XXXX");
        console.log(process.argv);
        console.log(process.env.REACT_APP_URL_DEV);
        console.log("XXXX");
        return data;
    });


    /**
     * Custom hook usage for add/change and modify
     * add/change: //setData({letter: "d"});
     * modify: //setData((oldData) => ({...oldData, letter: (oldData.letter + "+")}));
     */
    function setData(newData)
    {
        if(newData !== undefined)
        {
            if(typeof newData == "function") // if arrow function is passed for modify data
            {
                setLocalData(newData(localData));
            }
            else // if object is passed for simple add/change data
            {
                setLocalData(oldData =>  ({...oldData, ...newData}));
            }
        }
        else
        {
            console.error("attempt to setData with undefined");
        }
    }

    return(
        <DataContext.Provider value={localData}>
            <SetDataContext.Provider value={setData}>
                {children}
            </SetDataContext.Provider>
        </DataContext.Provider>

    )

}
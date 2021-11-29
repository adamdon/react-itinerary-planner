import Loader from "react-loader-spinner";
import {useData} from "../data/DataContextProvider";


export default function LoadingSpinner()
{
    const [data, setData] = useData();



    return (

        // <div className="fixed-bottom d-flex justify-content-center p-3">
        <div className=" align-center  position-fixed bottom-0 start-50 translate-middle-x p-3">
            <div className={data.showSpinner ? 'fadeIn' : 'fadeOut' }>
                <Loader
                    type="Watch"
                    color="orange"
                    height={40}
                    width={40}
                    // timeout={9000} //3 secs
                />
            </div>
            {/*{data.showSpinner ?*/}
            {/*    <Loader*/}
            {/*        type="Circles"*/}
            {/*        color="#00BFFF"*/}
            {/*        height={40}*/}
            {/*        width={40}*/}
            {/*        // timeout={9000} //3 secs*/}
            {/*    />*/}
            {/*    :*/}
            {/*    <></>*/}
            {/*}*/}
        </div>

    );


}



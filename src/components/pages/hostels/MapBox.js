import React, {useState, useEffect} from "react";
import {useData} from "../../data/DataContextProvider";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


export default function MapBox(props)
{
    const [data, setData] = useData();


    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });


    // useEffect(() =>
    // {
    //     console.log("useEffect");
    //
    // }, []);

    
    return (

        <div className="w-100">
            <MapContainer className="map-container" center={[props.hostel.location.lat, props.hostel.location.long]} attributionControl={false} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attributionControl="false"
                    attribution=''
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[props.hostel.location.lat, props.hostel.location.long]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>



    );
}



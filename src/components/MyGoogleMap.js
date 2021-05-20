import React, { Component } from 'react';

import {

    withScriptjs,

    withGoogleMap,

    GoogleMap,

    Marker,

} from "react-google-maps";




export default class MyGoogleMap extends Component {




    render() {

        const MapWithAMarkers = withScriptjs(withGoogleMap(props =>

            <GoogleMap

                defaultZoom={7}

                defaultCenter={{ lat: props.mapCenter.x, lng: props.mapCenter.y }}

                onClick={props.onMapClick}

            >

                {props.markers.map((marker) => (

                    <Marker

                        position={{ lat: marker.x, lng: marker.y }}

                        onClick={() => props.markerClick(marker)}

                        title={marker.name}

                    />

                ))}

            </GoogleMap>

        ));




        return (

            <MapWithAMarkers

                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&

                libraries=geometry,drawing,places&

                key=AIzaSyAAf3jfoni37vAbosil8TGwfkYSHsxENmA"

                loadingElement={<div style={{ height: `100%` }} />}

                containerElement={<div style={{ height: `600px` }} />}

                mapElement={<div style={{ height: `100%`}} />}

                markers={this.props.markers}

                markerClick={this.props.markerClick}

                onMapClick={this.props.onMapClick}

                mapCenter={this.props.mapCenter}

            />

        );

    }

}
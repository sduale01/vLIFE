import React, {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';

const mapStyles = {
    width: '200px',
    height: '200px'
}

// const api_key = process.env.API_KEY
// console.log(api_key);

class GoogleMaps extends Component {
    constructor() {
        super();

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {} 
        }
    }

    onClose = props => {
        if(this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            })
        }
    }
    render() {
        if(!this.props.loaded) {
            return <div>loading...</div>
        }
        return (
            <div>
                <Map 
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={{
                        lat: -1.2884,
                        lng: 36.8233
                    }}
                />
            </div>
        )
    }
}
// const API_KEY = process.env.key;
export default GoogleApiWrapper({
    apiKey: 'AIzaSyAAqLJxUxikBR1RZOussJZwK31QoNTa7n8'
})(GoogleMaps);
import React, {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
// import 
// import Map from './Map';

class GoogleMaps extends Component {
    render() {
        const style = {
            width: '300px',
            height: '300px'
        }
        if(!this.props.loaded) {
            return <div>loading...</div>
        }
        return (
            <div style={style}>
                <Map google={this.props.google}/>
            </div>
        )
    }

    // this.scriptCache = cache({
    //     google: 'https://api.google.com/some/script.js'
    //   });

    //   GoogleApi({
    //     apiKey: apiKey,
    //     libraries: ['places']
    //   });
}
const API_KEY = process.env.API_KEY
export default GoogleApiWrapper({
    apiKey: (API_KEY)
})(GoogleMaps);
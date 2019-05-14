import React from 'react'
import { compose, withProps } from 'recompose'
import ChoreMarker from './ChoreMarker'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const ChoresMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDPGB8rFZ4Yx-tKuwdgbTWFjAG9eRMaAEw&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={12}
    center={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }} onClick={props.onMarkerClick} />}
    
  </GoogleMap>
)

export default ChoresMap
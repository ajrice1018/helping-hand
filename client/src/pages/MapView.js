import React, { Component } from 'react'
import {  } from 'react-google-maps'
import ChoresMap from '../components/ChoresMap'
import Card from '@material-ui/core/Card'
import axios from 'axios'


class MapView extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentLatLng: {
        lat: 47.60621,
        lng: -122.33207
      },
      isMarkerShown: false,
      chores: []
    }
  }

  componentWillUpdate(){
    this.getGeoLocation()
    this.getChoreLocation()
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.getGeoLocation()
      this.getChoreLocation()
      this.setState({ isMarkerShown: true })
    }, 5000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position.coords);
                this.setState(prevState => ({
                    currentLatLng: {
                        ...prevState.currentLatLng,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }))
            }
        )
    } 
  }

  getChoreLocation = () => {
    axios.get('/chore')
    .then(response => {
      this.setState({chores: response.data})
    })
    .catch(function(error){
      console.log(error)
    })
  }

  render() {
    return (
      <Card>  
        <ChoresMap
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          currentLocation={this.state.currentLatLng}
          choreLocation = {this.chores}
        />
      </Card>
    )
  }
}

export default MapView;


    


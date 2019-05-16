import React, { Component } from 'react'
import {  } from 'react-google-maps'
import ChoresMap from '../components/ChoresMap'
import Card from '@material-ui/core/Card'



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
    fetch('/chore')
      .then(response => {return response.json()})
      .then(data =>{
        
        this.setState({
          chores: data
        })
      }).catch(err =>{
        console.log('error'+ err);
      })
  }

  render() {
    return (
      <Card>  
        <ChoresMap
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          currentLocation={this.state.currentLatLng}
          chores={this.state.chores}
        />
        
      </Card>
    )
  }
}

export default MapView;


    


import React, { Component } from 'react'
import {  } from 'react-google-maps'
import ChoresMap from './ChoresMap'
import { filter, cloneDeep, map } from 'lodash';
import axios from "axios";


class VolunteerMapContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentLatLng: {
        lat: 47.60621,
        lng: -122.33207
      },
      isMarkerShown: false,
      chores: [],
      activeMarker: null,
      
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

  closeOtherMarkers = (_id) => {
		this.setState({activeMarker: _id})
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

  onAccept=(newChore) =>{
    // e.preventDefault()
    newChore.chore_accepted = true;
    let newChores = cloneDeep(this.state.chores);
    newChores = map(newChores, chore => {
        if(chore._id === newChore._id) {
            chore = newChore;
        }
        return chore;
    });
    axios.post('/chore/update/' + newChore._id, newChore)
        .then(res => this.setState({
          chores: newChores,
          
        }))
    console.log(`Chore Accepted`);
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
       
    <ChoresMap
      isMarkerShown={this.state.isMarkerShown}
      currentLocation={this.state.currentLatLng}
      chores={this.state.chores}
      activeMarker={this.state.activeMarker}
      closeOtherMarkers={this.closeOtherMarkers}
      onAccept={this.onAccept}
    />     
    )
  }
}

export default VolunteerMapContainer;


    


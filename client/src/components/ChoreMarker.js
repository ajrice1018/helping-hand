import React from "react";
import { Marker, InfoWindow } from "react-google-maps";
import ChoreMapCard from './ChoreMapCard';
import ChoreIcon from "../images/ChoreIcon.png";

export default class ChoreMarker extends React.Component {
  
   state = {
    isOpen: false,
    activeMarker: this.props.activeMarker
  }

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen}, () =>{
        if (!this.state.isOpen){
          this.setState({activeMarker: false}, () => {
            this.props.closeMarkers(null)
          })
        } else{
          this.props.closeMarkers(this.props._id)
        }
      }
    )
  }

  componentWillReceiveProps(nextProps){
    this.setState({activeMarker: nextProps.activeMarker})
  } 

  render(){
      // console.log(this.props)
    return(
        <Marker onClick={this.toggleOpen}
          position={this.props.location}
          icon={ChoreIcon}
        >
        { this.state.isOpen && this.state.activeMarker ?
          <InfoWindow maxWidth={800} defaultPosition={ this.props.location } onCloseClick={this.props.onToggleOpen}>
            <ChoreMapCard toggleShowPage={this.props.toggleShowPage} ch={this.props.chore}/>
          </InfoWindow> : null
        }
        
        </Marker>
    );
  }
}
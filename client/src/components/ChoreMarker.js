import React from "react";
import { Marker } from "react-google-maps";
import ChoreIcon from "../images/ChoreIcon.png";

export default class ChoreMarker extends React.Component {

  render(){
    return(
        <Marker
          position={this.props.location}
          icon={ChoreIcon}
        >
        </Marker>
    );
  }
}
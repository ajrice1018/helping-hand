import React, {Component} from 'react';

function randomName() {
  const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

const newName = randomName();



class Messages extends Component {
    render() {
      const {messages} = this.props;
      return (
        <ul className="Messages-list">
          {messages.map(m => this.renderMessage(m))}
        </ul>
      );
    }
  
    renderMessage(message) {
      const {member, data} = message;
      const {currentMember} = this.props;

      console.log("Props from MESSAGES.js:");
      console.log(this.props);
     
      //TODO: NEED TO FIND WAY TO SAVE USERNAME AND COLOR WITH "message" - and have the color and username pull from this dynamically


      //TODO: OR FIX MEMBER.CLIENTDATA ??
      // console.log("PRINTING member.clientData from MESSAGES.js: ");
      // console.log(member.clientData.color);

      var color = "#2cb101";
      var username = "Volunteer";
      var className = "Messages-message";
      console.log("PRINTING MEMBER from MESSAGES.js: ");
      console.log(message.member);
      console.log("PRINTING MESSAGE from MESSAGES.js: ");
      console.log(message);
      if (member) {
        if (member.id === currentMember.id){
          className += "currentMember";
        }
        color = member.clientData.color;
        username = member.clientData.username;
      }
      return (
        <li className={className}>
        <span
          className="avatar"
          style={{backgroundColor: color}}
        />
          <div className="Message-content">
            <div className="username">
              {username}
            </div>
            <div className="text">{data}</div>
          </div>
        </li>
      );
    }
  }
  
  export default Messages;
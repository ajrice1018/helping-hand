import React, {Component} from 'react';
import Messages from './Messages';
import Input from "./Input"


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

function randomRoom() {
    console.log("Your random chatroom number is: ");
    return Math.floor(Math.random() * 0xFFFFFF).toString(16);
}




export default class SendMessage extends Component {

    state = {
        messages: [],
        member: {
          username: randomName(),
          color: randomColor(),
          chatRoom: randomRoom()
        }
    }

    constructor(props) {
        super(props);
        this.drone = new window.Scaledrone("5nNrvoa1lp1x0t3c", {
            data: this.state.member
        });
        const fixedState = {...this.state}
        fixedState.member.username = props.currentUser
        this.state = fixedState
        console.log("Props: ");
        console.log(props);
        console.log(this.state.member);
        this.drone.on('open', error => {
            if (error) {
                return console.error(error);
            }
          
            const member = {...this.state.member};
            member.id = this.drone.clientId;
            this.setState({member});
        });


        const room = this.drone.subscribe(this.props.match.params.id, {historyCount: 5});
        room.on('history_message', (message) => {
            console.log(message);
            const messages = this.state.messages;
            console.log(message.member);
            messages.push(message);
            this.setState({messages});
        });
        room.on('message', message => { 
            const messages = this.state.messages;
            console.log(message.member)
            messages.push(message);
            this.setState({messages});
        });
    }
    
    render() {
            return (
            <div className="App">
                <div className="App-header">
                <h1><i class="far fa-comments"></i></h1>
                </div>
                <div className="messageParent">
                <Messages
                messages={this.state.messages}
                currentMember={this.state.member}
                />
                <Input
                onSendMessage={this.onSendMessage}
                />
                </div>
            </div>
            );
    }
    
    onSendMessage = (message) => {
        this.drone.publish({
            room: this.props.match.params.id,
            message
        });
    }
    
    }
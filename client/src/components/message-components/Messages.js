import React, {Component} from 'react';


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
     
      var color = "#f44";
      var username = "System Message";
      var className = "Messages-message";
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
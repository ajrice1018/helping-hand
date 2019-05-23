import React, {Component} from 'react';



class Messages extends Component {


    renderMessage(message) {
        const {member, text} = message;
        const {currentMember} = this.props;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe ?
            "Messages-message currentMember" : "Messages-message";
        return (
            <li className={className}>
            <span
                className="avatar"
                // style={{backgroundColor: member.clientData.color}}
                style={{backgroundColor: member.clientData}}
            />
            <div className="Message-content">
                <div className="username">
                {member.clientData.username}
                </div>
                <div className="text">{text}</div>
            </div>
            </li>
        );
    }

    render() {
        const {messages} = this.props;
        return (
        <ul className="Messages-list">
            {messages.map(m => this.renderMessage(m))}
        </ul>
        );
    }
}

export default Messages;
import React, { Component } from 'react';

//I want this component to either be showing or sending messages
// if we are sending messages I want to change the state and have a Modal pop up 
class MessageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            messages: []

        }
    }
    messageUser = async (e, recipientID, messageFromTheForm) => {
        e.preventDefault();
        try {
            const createdMessageResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/messages' + recipientID, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(messageFromTheForm),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const parsedResponse = await createdMessageResponse.json();
            console.log(parsedResponse);
        } catch (err) {
            console.log(err)
        }
    }
    sendMessage = async () => {

    }
    render() {
        return (
            <h1>This is the messages Component</h1>
        )
    }

}

export default MessageContainer
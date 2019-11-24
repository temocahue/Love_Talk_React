import React, { Component } from 'react';
import UserList from '../UserList';

//I want this component to either be showing or sending messages
// if we are sending messages I want to change the state and have a Modal pop up 
class MessageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            messages: [],
            messageModalOpen: false,
            sendMessageMessage: false,
            messageToCreate:{
                message_text: '',
                recipient_user: '',
                sender_user: ''
            }
        }
    }
    componentDidMount(){
        this.getMessages();
    }
    handleEditChange = (e) => {
        this.setState({
        })
    }
    sendMessage = async (e) => {
        e.preventDefault();
        // Need to define below
        const recipientID = 'here'
        const messageFromTheForm = 'she'
        try {
            const createdMessageResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/messages/' + recipientID, {
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
    deleteMessage = async (id) => {
        console.log(id);
        const deleteMessageResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/messages' + id, {
            method: 'DELETE',
            credentials: 'include'
        });
        const deleteMessageParsed = await deleteMessageResponse.json();
        console.log(deleteMessageParsed);
        this.setState({messages: this.state.messages.filter((messages) => messages.id !== id)})

    }
    getMessages = async () => {
        try {
            const messages = await fetch(process.env.REACT_APP_API_URL + '/api/v1/messages', {
                credentials: 'include'
            });
            const parsedMessages = await messages.json();
            console.log(parsedMessages);
            this.setState({
                messages: parsedMessages.data
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    closeModal = () => {
        this.setState({
            editModalOpen: false
        })
    }
    render() {
        return (
            <div>
            <h1>This is the messages Component</h1>
            <UserList users={this.state.users} sendMessage={this.sendMessage}/>
            </div>
        )
    }

}

export default MessageContainer
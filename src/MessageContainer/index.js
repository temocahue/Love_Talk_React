import React, { Component } from 'react';
import UserList from '../UserList';
import CreateMessageForm from '../CreateMessageForm'

//I want this component to either be showing or sending messages
// if we are sending messages I want to change the state and have a Modal pop up 
class MessageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            messages: [],
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
        console.log(e);
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
            const messages = await fetch(process.env.REACT_APP_API_URL + '/api/v1/messages/', {
                credentials: 'include'
            });
            const parsedMessages = await messages.json();
            console.log('successfully fetched messages. This is the getMessages() in MessageContainer')
            console.log('parsedMessages', parsedMessages);
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
            messageModalOpen: false
        })
    }
    render() {
        return (
            <div>
            {
                this.props.messageModalOpen === true ? 
            <CreateMessageForm 
            openMessageModal={this.props.openMessageModal}
            sendMessage={this.sendMessage}
                closeModal={this.props.closeModal}
            />
            :
            <UserList 
            users={this.state.users} 
            openMessageModal={this.props.openMessageModal}/>
            }
            </div>
        )
    }

}

export default MessageContainer
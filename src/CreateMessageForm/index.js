import React, { Component } from 'react';
import { Modal, Form, Header, Button, Label} from 'semantic-ui-react'

class CreateMessage extends Component{
	constructor(props) {
        super();
        this.state = {
            users: [],
            messages: [],
            sendMessage: false,
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
    sendMessage = async (e) => {
        e.preventDefault();
        console.log(e, 'THIS IS E IN THE sendMessage MessageContainer');
        // Need to define below
        const recipientID = this.props.recipient.id 
        const messageFromTheForm = this.state.messageToCreate
     	// const messages = {
     	// 	this.setState({
     	// 		messageToCreate:{
     	// 			recipient_user: this.props.recipient
     	// 		}
     	// 	})
     	// }
        console.log('this is recipient >>>>', recipientID);
        console.log('this is messageFromTheForm>>>', messageFromTheForm);
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
    
    getMessages = async () => {
        try {
            const messages = await fetch(process.env.REACT_APP_API_URL + '/api/v1/messages/', {
                credentials: 'include'
            });
            const parsedMessages = await messages.json();
            console.log('successfully fetched messages. This is the getMessages() in CreateMessageForm')
            console.log('parsedMessages', parsedMessages);
            this.setState({
                messages: parsedMessages.data
            })
            console.log(this.state.messages);
        }
        catch (err) {
            console.log(err)
        }
    }
    handleChange = (e) => {

    	const newState = this.state
    	newState.messageToCreate.message_text = e.currentTarget.value
    	this.setState({
    		newState
    	})	
    }
	render(){
		return (
			<Modal open={this.props.messageModalOpen}closeIcon onClose={this.props.closeMessageModal} 
					>
				<Header>Create Message</Header>
				<Form onSubmit={(e) => this.sendMessage(e, this.state)}>
					<Label>Recipient: </Label><strong>{this.props.recipient.username} </strong><br></br>
					<br></br>

					<Label>Message:</Label>
					<Form.Input
						type='text'
						name="message_text"
						value={this.state.messageToCreate.message_text} 
						onChange={this.handleChange} 
					/>
					<Button type="Submit">send</Button>
				</Form>
			</Modal>
		)
	}
}
export default CreateMessage

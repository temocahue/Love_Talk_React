import React, { Component } from 'react';
import { Modal, Form, Header, Button, Label} from 'semantic-ui-react'

class CreateMessage extends Component{
	constructor(props) {
        super();
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
    handleChange = (e) => {
    	this.setState({[e.currentTarget.name]: e.currentTarget.value})	
    }
	render(){
		return (
			<Modal open={this.props.messageModalOpen}closeIcon onClose={this.props.closeMessageModal}>
				<Header>Create Message</Header>
				<Form onSubmit={(e) => this.props.sendMessage(e, this.state)}>
				<Label>Recipient:</Label>
				<Form.Input
				type='text'
				name="recipient_user"
				value={this.state.recipient_user} 
				onChange={this.handleChange} 
				/>
				<Label>Message:</Label>
				<Form.Input
				type='text'
				name="message_text"
				value={this.state.message_text} 
				onChange={this.handleChange} 
				/>
				<Button type="Submit">send</Button>
				</Form>
			</Modal>
		)
	}
}
export default CreateMessage

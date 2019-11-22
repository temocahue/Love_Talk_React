import React, { Component } from 'react';
import { Form, Button, TextArea, Label} from 'semantic-ui-react'

class CreateMessage extends Component{
	constructor(props){
		super()
		this.state = {
			sender_user: null,
			message_text: '',
			recipient_user: null
		}

	}
	handleChange = (e) => {
		this.setState({[e.currentTarget.name]: e.currentTarget.value})
	}
	render(){
		return (
			<div>
				<Label>Create Message</Label>
				<Form onSubmit={(e) => this.props.addMessage(e, this.state)}>
				<Label>Sender:</Label>
				<Form.Input
				type='text'
				name="recipient_user"
				value={this.state.recipient_user} 
				onChange={this.handleChange} 
				/>
				<Label>message:</Label>
				<Form.Input
				type='text'
				name="message_text"
				value={this.state.message_text} 
				onChange={this.handleChange} 
				/>
				<Button type="Submit">send</Button>
					
				</Form>
			</div>
		)
	}
}
export default CreateMessage
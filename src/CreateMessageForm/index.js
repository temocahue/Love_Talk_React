import React, { Component } from 'react';

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
				<h4>Create Message</h4>
				<form onSubmit={(e) => this.props.addMessage(e, this.state)}>
				<h5>Sender:</h5>
				<input
				type='text'
				name="recipient_user"
				value={this.state.recipient_user} 
				onChange={this.handleChange} 
				/>
				<h5>message:</h5>
				<input
				type='text'
				name="message_text"
				value={this.state.message_text} 
				onChange={this.handleChange} 
				/>
				<button type="Submit">send</button>
					
				</form>
			</div>
		)
	}
}
export default CreateMessage
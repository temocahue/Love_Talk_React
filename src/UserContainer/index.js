import React, { Component } from 'react'
import CreateMessage from '../CreateMessageForm'
import EditUser from '../EditUser'
import UserList from '../UserList'
import MessageContainer from '../MessageContainer'
import UserPage from '../UserPage'
import App from '../App'

class UserContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			users: [],
			messages: [],
			editModalOpen: false,
			messageModalOpen: false,
			userToEdit:{
				bio: []
			},
			messageUser: null

		}

	}
	componentDidMount(){
		this.getUsers();
		this.getMessages();
	}
	
	getUsers = async () => {
		try {
			const users = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/', {
				credentials: 'include'
			});
			const parsedUsers = await users.json();
			console.log(parsedUsers);
			this.setState({
				users: parsedUsers.data
			})
		} catch(err){
			console.log(err);


		}

	} 
	getMessages = async () => {
		try {
			const messages = await fetch(process.env.REACT_APP_API_URL + '/api/v1/messages/', {
				credentials:'include'
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
	//need to change this to delete individual account
	deleteUser = async (id) => {
		const deleteUserAccountResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/', {
			method: 'DELETE',
			credentials: 'include'
		});
		const deleteUserAccountParsed = await deleteUserAccountResponse.json();
		console.log(deleteUserAccountParsed);
		this.setState({users: this.state.users.filter((user) => user.id !== id)})
	}
	editUser = (idOfUserToEdit) => {
		const userToEdit = this.state.users.find(user  => user.id === idOfUserToEdit)
		this.setState({
			editModalOpen: true,
			userToEdit: {
				...userToEdit
			}

		})
	}

	handleEditChange = (event) => {
		this.setState({
			userToEdit:{
				...this.state.userToEdit,
				[event.target.name]: event.target.value
			}
		})
	}
	updateUser = async (e) => {
		e.preventDefault()
		try{
			const url = process.env.REACT_APP_API_URL + '/api/v1/users/' + this.state.userToEdit.id
			const updateResponse = await fetch(url, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state.userToEdit),
				headers: {
					'Content-Type': 'application/json'
				}

			})
			const updateResponseParsed = await updateResponse.json()
			console.log('reponse from db after trying to do update');
			console.log(updateResponseParsed);


			const newUserArrayWIthUpdate = this.state.users.map((user) => {
				if(user.id === updateResponseParsed.data.id) {
					user = updateResponseParsed.data
				}
				return user
			})

			this.setState({
				users: newUserArrayWIthUpdate,
				
			})
			this.closeModal()

		} catch(err) {
			console.log(err);
		}
	}
	deleteMessage = async (id) => {
        console.log(id);
        const deleteMessageResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/messages/' + id, {
            method: 'DELETE',
            credentials: 'include'
        });
        const deleteMessageParsed = await deleteMessageResponse.json();
        console.log(deleteMessageParsed);
        this.setState({messages: this.state.messages.filter((messages) => messages.id !== id)})
    }
	 openMessageModal = (userId) => {
        const messageUser = this.state.users.filter(user => user.id === userId)

        console.log('THIS IS openMessageModal:', messageUser);
        this.setState({
            messageModalOpen: true,
            messageUser: messageUser[0]
      
        })
    }
     openEditModal = (userId) => {
        const messageUser = this.state.messages.find(user => user.id === userId)
        this.setState({
            editModalOpen: true
        })
    }
	closeEditModal = () =>  {
		this.setState({
			editModalOpen: false
		})
	}
	closeMessageModal = () =>  {
		this.setState({
			messageModalOpen: false,
			messageUser: null
		})
	}
	render(){
		return(
			<div>
			{ this.state.messageUser === null ? null :
				<CreateMessage 
					recipient={this.state.messageUser} 
					messageModalOpen={this.state.messageModalOpen} 
					closeMessageModal={this.closeMessageModal}/> }

			<UserList users={this.state.users} openMessageModal={this.openMessageModal}/>
			<EditUser 
				open={this.state.editModalOpen}
				updateUser={this.updateUser}
				userToEdit={this.state.userToEdit}
				closeEditModal={this.closeModal}
				handleEditChange={this.handleEditChange}
				
			/>
			<MessageContainer messages={this.state.messages} deleteMessage={this.deleteMessage}/>
			<UserPage userInfo={this.props.loggedInUser}/>
			</div>
		)
	}
}
export default UserContainer
			// <MessageContainer messageModalOpen={this.state.messageModalOpen} openMessageModal={this.openMessageModal} closeMessageModal={this.closeMessageModal}/>
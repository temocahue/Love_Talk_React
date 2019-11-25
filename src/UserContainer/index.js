import React, { Component } from 'react'
import CreateMessage from '../CreateMessageForm'
import EditUser from '../EditUser'
import UserList from '../UserList'
import MessageContainer from '../MessageContainer'

// Need to get users bio and functionality to send messages to matches
class UserContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			users: [],
			messages: [],
			editModalOpen: false,
			messageModalOpen: false,
			userToEdit:{
				bio: ''
			}
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
				users: newUserArrayWIthUpdate
			})
			this.closeModal()

		} catch(err) {
			console.log(err);
		}
	}
	 openMessageModal = (userId) => {
        const messageUser = this.state.messages.find(user => user.id === userId)
        this.setState({
            messageModalOpen: true,
        })
    }
     openEditModal = (userId) => {
        const messageUser = this.state.messages.find(user => user.id === userId)
        this.setState({
            editModalOpen: true,
        })
    }
	closeEditModal = () =>  {
		this.setState({
			editModalOpen: true
		})
	}
	closeMessageModal = () =>  {
		this.setState({
			messageModalOpen: true
		})
	}
	render(){
		return(
			<div>	
			<UserList users={this.state.users} openMessageModal={this.openMessageModal}/>
			<MessageContainer messageModalOpen={this.state.messageModalOpen} openMessageModal={this.openMessageModal} closeMessageModal={this.closeMessageModal}/>
			<EditUser open={this.state.editModalOpen}
			updateUser={this.updateUser}
			userToEdit={this.state.userToEdit}
			closeEditModal={this.closeModal}
			handleEditChange={this.handleEditChange}
			/>
			</div>
		)
	}
}
export default UserContainer
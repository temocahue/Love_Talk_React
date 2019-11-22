import React, { Component } from 'react'
import CreateMessage from '../CreateMessageForm'
import EditUser from '../EditUser'
import UserList from '../UserList'

class UserContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			users: [],
			editModalOpen: false,
			userToEdit:{
				bio: ''
			}
		}

	}
	componentDidMount(){
		this.getUsers();
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
	closeModal = () =>  {
		this.setState({
			editModalOpen: true
		})
	}

	render(){
		return(
			<div>
			<UserList users={this.state.users} messageUser={this.messageUser}/>
			<EditUser open={this.state.editModalOpen}
			updateUser={this.updateUser}
			userToEdit={this.state.userToEdit}
			closeModal={this.closeModal}
			handleEditChange={this.handleEditChange}
			/>
			</div>
		)
	}
}
export default UserContainer
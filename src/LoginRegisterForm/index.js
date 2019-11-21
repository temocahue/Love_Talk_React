import React from 'react'


class LoginRegisterForm extends React.Component{
	constructor(){
		super()
		this.state = {
			email: '',
			password: '',
			username: '',
			bio: '',
			age: null,
			preference: '',
			gender: '',
			action: 'login'

		}	
	}
	loginRegister = () => {
		if(this.state.action === "login"){
			this.props.login({
				email: this.state.email,
				password: this.state.password

			})
		}
	}
	switchForm = () => {
		if(this.state.action === 'login') {
			this.setState({
				action: 'register'
			})
		} else {
			this.setState({
				action: 'login'
			})
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.loginRegister()

	}
	render(){
		return(
			<div className='LoginRegisterForm'>
				<form onSubmit={this.handleSubmit}>
				{
					this.state.action === 'register'
					? 
					<React.Fragment>
						<h1>Username:</h1>
						<input
						type="text"
						name="username"
						value={this.state.username}
						onChange={this.handleChange}
						/>
						<h1>Bio:</h1>
				<input
				type="text"
				name="bio"
				value={this.state.bio}
				onChange={this.handleChange}
				/>
				<h1>Age:</h1>
				<input
				type="text"
				name="age"
				value={this.state.age}
				onChange={this.handleChange}
				/>
				<h1>Preference:</h1>
				<input
				type="text"
				name="preference"
				value={this.state.preference}
				onChange={this.handleChange}
				/>
				<h1>Gender:</h1>
				<input
				type="text"
				name="gender"
				value={this.state.gender}
				onChange={this.handleChange}
				/>

					</React.Fragment>
					:
					null
				}
				<h1>Email:</h1>
				<input
				type="email"
				name="email"
				value={this.state.email}
				onChange={this.handleChange}
				/>
				<h1>Password:</h1>
				<input
				type="text"
				name="password"
				value={this.state.password}
				onChange={this.handleChange}
				/>
				

				<button type="submit">{this.state.action === "register" ? "Register" : 'Login in'}</button>
				</form>
				{
					this.state.action === "register"
					?
					<small>Already have an account ? Log in <span onClick={this.switchForm}>here</span>
					</small>
					:
					<small> Need an account? Sign up <span onClick={this.switchForm}>here</span>!
					</small>

				}
			</div>
		)
	}
}

export default LoginRegisterForm
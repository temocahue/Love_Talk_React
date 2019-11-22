import React from 'react'
import { Form, Button, TextArea, Label } from 'semantic-ui-react'


class LoginRegisterForm extends React.Component {
    constructor() {
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
        if (this.state.action === "login") {
            this.props.login({
                email: this.state.email,
                password: this.state.password

            })
        }
    }
    switchForm = () => {
        if (this.state.action === 'login') {
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
    render() {
        return (
            <div className='LoginRegisterForm'>
				<Form onSubmit={this.handleSubmit}>
				{
					this.state.action === 'register'
					? 
					<React.Fragment>
					<h1>Create Account Here</h1>
						<Form.Field>
						<Label>Username:</Label>
						<Form.Input
						type="text"
						name="username"
						value={this.state.username}
						onChange={this.handleChange}
						/>
						</Form.Field>
						<Form.Field>
						<Label>Bio:</Label>
				<Form.Input
				type="text"
				name="bio"
				value={this.state.bio}
				onChange={this.handleChange}
				/>
				</Form.Field>
				<Form.Field>
				<Label>Age:</Label>
				<Form.Input
				type="text"
				name="age"
				value={this.state.age}
				onChange={this.handleChange}
				/>
				</Form.Field>
				<Form.Field>
				<Label>Preference:</Label>
				<Form.Input
				type="text"
				name="preference"
				value={this.state.preference}
				onChange={this.handleChange}
				/>
				</Form.Field>
				<Form.Field>
				<Label>Gender:</Label>
				<Form.Input
				type="text"
				name="gender"
				value={this.state.gender}
				onChange={this.handleChange}
				/>
				</Form.Field>
					</React.Fragment>
					:
					null
				}
				<Form.Field>
				<Label>Email:</Label>
				<Form.Input
				type="email"
				name="email"
				value={this.state.email}
				onChange={this.handleChange}
				/>
				</Form.Field>
				<Form.Field>
				<Label>Password:</Label>
				<Form.Input
				type="text"
				name="password"
				value={this.state.password}
				onChange={this.handleChange}
				/>
				</Form.Field>

				<Button type="submit">{this.state.action === "register" ? "Register" : 'Login in'}</Button>
				</Form>
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
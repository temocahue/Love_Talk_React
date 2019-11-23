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
            age: 18,
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
        } else {
            this.props.register({
                username: this.state.username,
                bio: this.state.bio,
                age: this.state.age,
                email: this.state.email,
                gender: this.state.gender,
                preference: this.state.preference,
                password: this.state.password
            })
        }

    }
    switchForm = () => {
        if (this.state.action === 'login') {
            console.log("switching to register form")
            this.setState({
                action: 'register'
            })
        } else {
            console.log("switching to login form")
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
    handleSubmit = async (e) => {
        e.preventDefault()
        console.log('lets logging');

        const userLogin = {
            email: this.state.email,
            password: this.state.password
        }
        const registerInfo = {
            username: this.state.username,
            bio: this.state.bio,
            age: this.state.age,
            email: this.state.email,
            gender: this.state.gender,
            preference: this.state.preference,
            password: this.state.password
        }
        if (this.state.action === 'login') {
            try {
                const users = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/login', {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(userLogin),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const parseUser = await users.json();
                console.log(parseUser);

                this.setState({
                    users: parseUser.data
                })
                this.loginRegister()
            } catch (err) {
                console.log("error: ", err);
            }
        } else {
            try {
            	console.log('register')
                const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/register', {
                    method: "POST",
                    credential: 'include',
                    body: JSON.stringify(registerInfo),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                // this.loginRegister()
            } catch (err) {
                console.log('error', err);
            }
        }
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
				type="number"
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
				type="password"
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
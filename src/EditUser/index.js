import React, { Component } from 'react'
import { Form, Button, TextArea, Label} from 'semantic-ui-react'


function EditUser(props) {
	return(
		<div>
			<Form onSubmit={props.updateUser}>
				<Label>Bio:</Label>
				<Form.TextArea type='text' name='bio' value={props.updateUser.bio} onChange={props.handleEditChange}/>
				<Button type="submit">Update your bio</Button>
			</Form>
		</div>
	)
}

export default EditUser
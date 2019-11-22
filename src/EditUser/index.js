import React, { Component } from 'react'
import { Form, Button, TextArea, Label, Modal} from 'semantic-ui-react'


function EditUser(props) {
	return(
		<Modal open={props.open} closeIcon='true' onClose={props.closeModal}>
			<Form onSubmit={props.updateUser}>
				<Label>Bio:</Label>
				<Form.TextArea type='text' name='bio' value={props.updateUser.bio} onChange={props.handleEditChange}/>
				<Modal.Actions>
				<Button type="submit" color='black'>Update your bio</Button>
				</Modal.Actions>
			</Form>
		</Modal>
	)
}

export default EditUser
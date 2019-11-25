import React, { Component } from 'react'
import { Form, Button, TextArea, Label, Modal, Header} from 'semantic-ui-react'


function EditUser(props) {
	return(
		<Modal open={props.open} closeIcon onClose={props.closeModal}>
			<Header>Edit Your Bio:</Header>
			<Modal.Content>
			<Form onSubmit={props.updateUser}>
			<Form.Group widths='equal'>
				<Label>Bio:</Label>
				<Form.TextArea type='text' name='bio' value={props.updateUser.bio} onChange={props.handleEditChange}/>
				<Modal.Actions>
				<Button type="submit" color='black'>Update your bio</Button>
				</Modal.Actions>
				</Form.Group>
			</Form>
			</Modal.Content>
		</Modal>
	)
}

export default EditUser
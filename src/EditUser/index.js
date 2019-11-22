import React, { Component } from 'react'

function EditUser(props) {
	return(
		<div>
			<form onSubmit={props.updateUser}>
				<label>Bio:</label>
				<input type='text' name='bio' value={props.updateUser.bio} onChange={props.handleEditChange}/>
				<button type="submit">Update your bio</button>
			</form>
		</div>
	)
}

export default EditUser
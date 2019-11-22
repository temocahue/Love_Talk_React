import React from 'react'
import { Card, Button } from 'semantic-ui-react'

function UserList(props) {
	const users = props.users.map((user) => {
		return(
			<Card key={user.id}>
				<Card.Content>
					<Card.Header>{user.username}</Card.Header>
					<Card.Description>{users.bio}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<Button onClick={() => props.deleteUser(user.id)}>Delete User</Button>
					<Button onClick={() => props.editUser(user.id)}>Edit User</Button>
				</Card.Content>
			</Card>
		)

	})
	return (
		<Card.Group>
			{ users }
		</Card.Group>
	)
}
export default UserList
import React from 'react'

import { Card, Button, Image } from 'semantic-ui-react'

function UserList(props) {
	// const src = '/images/wireframe/white-image.png';
	console.log("this is props in user list >>>", props);
	const users = props.users.map((user) => {
		return(
				<Card color='red' key={user.id}>
					<Card.Content>
						<Card.Header>{user.username}</Card.Header>
						<Card.Description>{user.gender}</Card.Description>
						<Card.Description>{user.age}</Card.Description>
						<Card.Description>{user.bio}</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<Button onClick={() => props.openMessageModal(user.id)}>Message User</Button>
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
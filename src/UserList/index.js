import React from 'react'
import { Card, Button } from 'semantic-ui-react'

function UserList(props) {
	const user = props.users.map((user) => {
		return(
			<Card key={user.id}>
			<Card.Content>
			<Card.Header>{user.username}</Card.Header>
			<Card.Description>{users.bio}</Card.Description>
			</Card.Content>
			<Card.Content extra>
			<Button onClick={() => props.delete}

		)

	})
}
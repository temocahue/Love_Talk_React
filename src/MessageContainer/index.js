messageUser = async (recipientID, messageFromTheForm) => {
		e.preventDefault();
		try {
		const createdMessageResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/messages' + recipientID, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(messageFromTheForm),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const parsedResponse = await createdMessageResponse.json();
		console.log(parsedResponse);
		}	
	}
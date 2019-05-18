import React from "react";
import { Item, Button } from "semantic-ui-react";

const ChoreMapCard = (props) => {

	const { ch } = props

	const handleClick = (e) => {
		props.toggleShowPage(ch)
	}

	return (
		<Item>
			<Item.Image
				// src={dr.profile.image_url}
				// size="tiny"
				/>
			<Item.Content>
				<Item.Header >
					<strong>
						Chore Request: {ch.chore_description}
					</strong>
				</Item.Header>
				<Item.Meta>
					
				</Item.Meta>
				<Button onClick={handleClick}>Assign Chore</Button>
			</Item.Content>
		</Item>
	);
}

export default ChoreMapCard

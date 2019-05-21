import React from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ChoreMapCard = (props) => {
    
	const { ch } = props
    
	const handleClick = (e) => {
		props.onAccept(ch)
	}
    
	
    return (
    <Card >
        <CardContent>
            <Typography >
                Chore Request: {ch.chore_description}
            </Typography>
            
        </CardContent>
        <CardActions>
            <Button onClick={handleClick}>Assign Chore</Button>
        </CardActions>
    </Card>
	);
}

export default ChoreMapCard;

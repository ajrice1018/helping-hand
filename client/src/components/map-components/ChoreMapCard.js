import React from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment'

const ChoreMapCard = (props) => {
    
	const { ch } = props
    
	const handleClick = (e) => {
		props.onAccept(ch)
	}
    
    
	
    return (
    <Card >
        <CardContent>
            <Typography variant="h5" gutterBottom>
                Chore Request: {ch.chore_description}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Requested By: {ch.chore_responsible}
            </Typography>
            <Typography variat='h6' gutterBottom>
                Chore Date: <Moment format="D MMM YYYY" withTitle date={ch.chore_date}/>
            </Typography>
            <Typography>
                Phone Number: {ch.chore_phone}
            </Typography>
        </CardContent>
        <CardActions>
            <Button variant="outlined" color="primary" onClick={handleClick}>Assign Chore</Button>
        </CardActions>
    </Card>
	);
}

export default ChoreMapCard;

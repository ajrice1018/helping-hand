import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { filter, cloneDeep, map } from 'lodash';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Typography from '../../pages/modules/components/Typography';
import Card from '@material-ui/core/Card'
import theme from '../../pages/modules/theme';
import { ThemeProvider } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import Moment from 'react-moment'


const Chore = props => (
    <tr>
        <td className={props.chore.chore_completed ? 'completed' : ''}>{props.chore.chore_description}</td>
        <td className={props.chore.chore_completed ? 'completed' : ''}>{props.chore.chore_responsible}</td>
        <td className={props.chore.chore_completed ? 'completed' : ''}>{props.chore.chore_address[0].formattedAddress}</td>
        <td className={props.chore.chore_completed ? 'completed' : ''}>{props.chore.chore_phone}</td>
        <td>
            <Link to={"/edit/"+props.chore._id}>Edit</Link>
        </td> 
       
    </tr>
)

const RequestedChore = (props) => (
        
    <ThemeProvider theme={theme}>
        <Container component="section">
        <Box display="flex" p={1} bgcolor="background.paper">
            <Grid container spacing={4}>    
                <Grid item spacing={8}>
                    <CardActionArea>
                    <Card style={{backgroundColor:'#cb2d6f'}} >
                        <Grid  container spacing={4} padding={5}>
                            <Grid item xs={12} md={6}>
                                <Hidden smDown>
                                    <img 
                                        src="https://cdn3.eyeem.com/thumb/eaf5a605b848ab17473a73d38687f48d9790e578-1512310445786/w/850"
                                        alt="call to action"   
                                    />
                                </Hidden>
                            </Grid> 
                            <Grid  spacing={4} item xs={12} md={6}>
                                <Box p={8}>
                                    <Typography style={{color:'#cccccc'}} padding="theme.spacing(4)" variant="h3" component="h2" gutterBottom>
                                        {props.chore.chore_description}
                                    </Typography>
                                    <Typography style={{color:'#cccccc'}} variant="h5" component="h3" gutterBottom>
                                        Who Needs Help: {props.chore.chore_responsible}
                                    </Typography>
                                    <Typography style={{color:'#cccccc'}} variant="h5" gutterBottom>
                                        Chore Address: {props.chore.chore_address[0].formattedAddress}
                                    </Typography>
                                    <Typography style={{color:'#cccccc'}} variant="h5" gutterBottom>
                                        Chore Date: <Moment format="D MMM YYYY" withTitle date={props.chore.chore_date}/>
                                    </Typography>
                                    <Typography style={{color:'#cccccc'}} variant="h5" gutterBottom>
                                        Phone Number: {props.chore.chore_phone}
                                    </Typography>
                                </Box>
                            </Grid>
                                 
                        </Grid>
                    </Card>
                    </CardActionArea>
                </Grid>
            </Grid>
        </Box>
        </Container>     
    </ThemeProvider>
)

class ChoresList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {chores: []};
        this.onAccept = this.onAccept.bind(this);
        this.onCompleted = this.onCompleted.bind(this);
    }
    
    componentDidMount() {
        axios.get('/chore')
            .then(response => {
                this.setState({chores: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('/chore')
        .then(response => {
            this.setState({chores: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    choreList() {
        return this.state.chores.map(function(currentChore, i) {
            // console.log(currentChore);
            return <Chore chore={currentChore} key={i} />;
        });
    }

    requestedList() {
        const filteredListRequested = this.getList(false, false);
        return filteredListRequested.map((currentChore, i) => {
            return <RequestedChore chore={currentChore} key={i} onAccept={this.onAccept} />;
        });
    }

    getList (accepted, completed) {
        // console.log(this.state.chores);
        return filter(this.state.chores, currentChore => currentChore.chore_accepted === accepted && currentChore.chore_completed === completed)
    }

    onAccept(newChore) {
        // e.preventDefault()
        newChore.chore_accepted = true;
        let newChores = cloneDeep(this.state.chores);
        newChores = map(newChores, chore => {
            if(chore._id === newChore._id) {
                chore = newChore;
            }
            return chore;
        });
        axios.post('/chore/update/' + newChore._id, newChore)
            .then(res => this.setState({chores: newChores}))
        console.log(`Chore Accepted`);
    }

    onCompleted(newChore) {
        // e.preventDefault()
        newChore.chore_completed = true;
        let newChoresCompleted = cloneDeep(this.state.chores);
        newChoresCompleted = map(newChoresCompleted, chore => {
            if(chore._id === newChore._id) {
                chore = newChore;
            }
            return chore;
        });
        axios.post('/chore/update/' + newChore._id, newChore)
            .then(res => this.setState({chores: newChoresCompleted}))
        console.log(`Chore Completed`);
    }


    render() {
        
        return (
            <div>
                <h3>Requested Chores</h3>
                
                   {this.requestedList()} 

            </div>            
        )
    }
}

export default ChoresList;
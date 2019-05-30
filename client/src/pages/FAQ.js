import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import theme from './modules/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import {Link, Redirect} from "react-router-dom";


const styles = {
    card: {
        maxWidth: 1000,
        maxHeight: 1000,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        background: 'linear-gradient(45deg, #501F3A 30%, #CB2D6F 90%)',
        border: 0,
        color: "white",
        position: 'center'
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
    text:{
        color:"white"
    }
  
};


function FAQ(props) {
  const { classes } = props;
  
  
  return (
    <React.Fragment>
    <CssBaseline />
    
    <Container maxWidth="lg">  
    <Box display="flex" justifyContent="center" m={1} p={1}>
      <Paper >
        <Grid container>
        <Grid item >
          <Card className={classes.card} >
      
            <CardMedia
              component="img"
              alt="Helping Hands FAQ"
              className={classes.media}
              height="450"
              image="FAQ.jpg"
              title="Helping Hands FAQ"
            />
            <CardContent>
                
              <div>
                <Typography className={classes.text}  gutterBottom variant="headline" component="h2">
                  Helping Hands is a community based app to create to assist and help our home bound neighbors. The goal of this app is by including all members of our community we can create a more inclusive and caring community where we are looking out to help and assist all of our neighbors.
                </Typography>
                <List>
                  <ListItem><Link to="/register">
                                    Sign Up   </Link>   for a Helping Hands Volunteer Account</ListItem>
                </List>
              </div>
                
            </CardContent>
      
          </Card>
        </Grid>
      </Grid>
      </Paper>
      </Box>
    </Container>
    
    </React.Fragment>
  );
}

FAQ.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FAQ);
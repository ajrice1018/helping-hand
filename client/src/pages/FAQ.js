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


const styles = {
    card: {
        maxWidth: 1000,
        maxHeight: 1000,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        color: "white"
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
    text:{
        color:"white"
    }
  
};

function typographyV1Theme(theme) {
  return createMuiTheme({
    ...theme,
    typography: {
      useNextVariants: false,
      color: "white"
    },
  });
}




function FAQ(props) {
  const { classes } = props;
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  return (
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
                    <List dense={dense}>
                        <ListItem>Sign Up for a Helping Hands Volunteer Account</ListItem>
                    </List>
                </div>
            
        </CardContent>
      
    </Card>
  );
}

FAQ.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FAQ);
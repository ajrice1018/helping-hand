import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import {Link} from "react-router-dom";

const backgroundImage = 'https://images.unsplash.com/photo-1533165618640-d7e3069cc8fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=976&q=80';

const styles = theme => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center'
        // ,
        // height: '90%'
    },
    button: {
        minWidth: 200
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [
            theme
                .breakpoints
                .up('sm')
        ]: {
            marginTop: theme.spacing(10)
        }
    },
    more: {
        marginTop: theme.spacing(2)
    }
});

function ProductHero(props) {
    const {classes} = props;

    return (
        <ProductHeroLayout backgroundClassName={classes.background}>
            {/* Increase the network loading priority of the background image. */}
            <img
                style={{
                display: 'none'
            }}
                src={backgroundImage}
                alt=""/>
            <Typography color="inherit" align="center" variant="h2" marked="center">
                Helping Hands
            </Typography>
            <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
                Welcome to our Website!
            </Typography>

            <Button
                color="secondary"
                variant="contained"
                size="55px"
                href="/volunteer-register"
                className="btn btn-primary">Volunteers</Button>
            <br />
            <Button
                color="secondary"
                variant="contained"
                size="55px"
                href="/register"
                className="btn btn-primary">Requestors</Button>
       

            <Typography variant="body2" color="inherit" className={classes.more}>
                Discover the experience
            </Typography>
        </ProductHeroLayout>
    );
}

ProductHero.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductHero);

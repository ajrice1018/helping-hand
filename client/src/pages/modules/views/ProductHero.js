import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

const backgroundImage = 'ChoreMapGif.gif';

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

            <Link
                color="secondary"
                variant="contained"
                size="55px"
                to="/volunteer-register"
                className="btn btn-primary">Volunteers</Link>
            <br />
            <Link
                color="secondary"
                variant="contained"
                size="55px"
                to="/register"
                className="btn btn-primary">Requestors</Link>
        </ProductHeroLayout>
    );
}

ProductHero.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({auth: state.auth});

export default connect(mapStateToProps) (withStyles(styles)(ProductHero));

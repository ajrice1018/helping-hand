import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import VolunteerMapContainer from '../components/map-components/VolunteerMapContainer';
import VolunteerAcceptedList from '../components/chore-components/VolunteerAcceptedList';
import VolunteerCompletedList from '../components/chore-components/VolunteerCompletedList';

class VolunteerLanding extends Component {
    render(){
        return(
            <React.Fragment>
                <CssBaseline/>
                <Card style={{padding: 20, margin: 20}}>
                    <VolunteerMapContainer/>
                </Card>
                <Card style={{padding: 20, margin: 20}}>
                    <VolunteerAcceptedList/>
                </Card>
                <Card style={{padding: 20, margin: 20}}>
                    <VolunteerCompletedList/>
                </Card>

            </React.Fragment>
        )
    }
}

export default VolunteerLanding
import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import RequestCreateChore from '../components/chore-components/RequestCreateChore';
import RequestAcceptChore from '../components/chore-components/RequestAcceptChore';
import RequestCompleteChore from '../components/chore-components/RequestCompleteChore';
import RequestNotAccepted from '../components/chore-components/RequestNotAccepted'

class RequestLanding extends Component {
    render(){
        return(
            <React.Fragment>
                <CssBaseline/>
                <Card style={{padding: 20, margin: 20}}>
                    <RequestCreateChore/>
                </Card>
                <Card style={{padding: 20, margin: 20}}>
                    <RequestNotAccepted/>
                </Card>
                <Card style={{padding: 20, margin: 20}}>
                    <RequestAcceptChore/>
                </Card>
                <Card style={{padding: 20, margin: 20}}>
                    <RequestCompleteChore/>
                </Card>

            </React.Fragment>
        )
    }
}

export default RequestLanding
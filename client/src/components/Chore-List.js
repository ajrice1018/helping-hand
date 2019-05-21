import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { filter, cloneDeep, map } from 'lodash';

import axios from "axios";

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

const RequestedChore = props => (
    <tr>
        <td>{props.chore.chore_description}</td>
        <td>{props.chore.chore_responsible}</td>
        <td>{props.chore.chore_address[0].formattedAddress}</td>
        <td>{props.chore.chore_phone}</td>
        <td>
            <button type="button" class="btn btn-primary" onClick={()=>props.onAccept(props.chore)}>Accept</button>
        </td> 
       
    </tr>
)

const AcceptedChore = props => (
    <tr>
        <td>{props.chore.chore_description}</td>
        <td>{props.chore.chore_responsible}</td>
        <td>{props.chore.chore_address[0].formattedAddress}</td>
        <td>{props.chore.chore_phone}</td>
        <td>
            <button type="button" class="btn btn-primary" onClick={()=>props.onCompleted(props.chore)}>Completed</button>
        </td>
       
    </tr>
)


export default class ChoresList extends Component {

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

    acceptedList() {
        const filteredListAccepted = this.getList(true, false);
        return filteredListAccepted.map((currentChore, i) => {
            return <AcceptedChore chore={currentChore} key={i} onCompleted={this.onCompleted} />;
        });
    }

    completedList() {
        const filteredListCompleted = this.getList(true, true);
        return filteredListCompleted.map(function(currentChore, i) {
            return <Chore chore={currentChore} key={i} />;
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
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Address</th>
                            <th>Contact Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.requestedList() }
                    </tbody>
                </table>

                <h3>Accepted Chores</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Address</th>
                            <th>Contact Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.acceptedList() }
                    </tbody>
                </table>


                <h3>Completed Chores</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Address</th>
                            <th>Contact Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.completedList() }
                    </tbody>
                </table>

            </div>

            
        )
    }
}
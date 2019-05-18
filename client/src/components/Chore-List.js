import React, {Component} from 'react';
import { Link } from 'react-router-dom';
//TODO add import lodash with { find } from lodash
import { filter } from 'lodash';

import axios from "axios";

const Chore = props => (
    <tr>
        <td className={props.chore.chore_completed ? 'completed' : ''}>{props.chore.chore_description}</td>
        <td className={props.chore.chore_completed ? 'completed' : ''}>{props.chore.chore_responsible}</td>
        <td className={props.chore.chore_completed ? 'completed' : ''}>{props.chore.chore_address[0].formattedAddress}</td>
        <td>
            <Link to={"/edit/"+props.chore._id}>Edit</Link>
        </td> 
       
    </tr>
)

export default class ChoresList extends Component {

    constructor(props) {
        super(props);
        this.state = {chores: []};
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

    completedList() {
        const filteredList = this.getList("completed");
        return filteredList.map(function(currentChore, i) {
            return <Chore chore={currentChore} key={i} />;
        });
    }

    getList (status) {
        console.log(this.state.chores);
        return filter(this.state.chores, currentChore => currentChore.chore_status === status)
    }

    render() {
        return (
            <div>
                <h3>Chores List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.choreList() }
                    </tbody>
                </table>

                <h3>Completed List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Address</th>
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
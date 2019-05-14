import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const Chore = props => (
    <tr>
        <td className={props.chore.chore_completed ? 'completed' : ''}>{props.chore.chore_description}</td>
        <td className={props.chore.chore_completed ? 'completed' : ''}>{props.chore.chore_responsible}</td>
        <td className={props.chore.chore_completed ? 'completed' : ''}>{props.chore.chore_address}</td>
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
            return <Chore chore={currentChore} key={i} />;
        });
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
            </div>
        )
    }
}
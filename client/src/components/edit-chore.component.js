import React, {Component} from 'react';
import axios from 'axios';

export default class EditChore extends Component {

    constructor(props) {
        super(props);

        this.onChangeChoreDescription = this.onChangeChoreDescription.bind(this);
        this.onChangeChoreResponsible = this.onChangeChoreResponsible.bind(this);
        this.onChangeChorePriority = this.onChangeChorePriority.bind(this);
        this.onChangeChoreCompleted = this.onChangeChoreCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            chore_description: '',
            chore_responsible: '',
            chore_priority: '',
            chore_completed: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/chores/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    chore_description: response.data.chore_description,
                    chore_responsible: response.data.chore_responsible,
                    chore_priority: response.data.chore_priority,
                    chore_completed: response.data.chore_completed
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    onChangeChoreDescription(e) {
        this.setState({
            chore_description: e.target.value
        });
    }

    onChangeChoreResponsible(e) {
        this.setState({
            chore_responsible: e.target.value
        });
    }

    onChangeChorePriority(e) {
        this.setState({
            chore_priority: e.target.value
        });
    }

    onChangeChoreCompleted(e) {
        this.setState({
            chore_completed: !this.state.chore_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            chore_description: this.state.chore_description,
            chore_responsible: this.state.chore_responsible,
            chore_priority: this.state.chore_priority,
            chore_completed: this.state.chore_completed
        };
        axios.post('http://localhost:4000/chores/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Update Chore</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.chore_description}
                                onChange={this.onChangeChoreDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.chore_responsible}
                                onChange={this.onChangeChoreResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="Low"
                                    checked={this.state.chore_priority==='Low'}
                                    onChange={this.onChangeChorePriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Medium"
                                    checked={this.state.chore_priority==='Medium'}
                                    onChange={this.onChangeChorePriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="High"
                                    checked={this.state.chore_priority==='High'}
                                    onChange={this.onChangeChorePriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                        <div className="form-check">
                            <input  type="checkbox"
                                    className="form-check-input"
                                    id="completedCheckbox"
                                    name="completedCheckbox"
                                    onChange={this.onChangeChoreCompleted}
                                    checked={this.state.chore_completed}
                                    value={this.state.chore_completed}
                                    />
                            <label className="form-check-label" htmlFor="completedCheckbox">
                                Completed
                            </label>
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Update Chore" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
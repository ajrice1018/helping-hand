import React, {Component} from 'react';
import axios from 'axios';
import AddressForm from './AddressForm';


export default class CreateChore extends Component {
   
    constructor(props) {
        super(props);
        
        this.onChangeChoreDescription = this.onChangeChoreDescription.bind(this);
        this.onChangeChoreResponsible = this.onChangeChoreResponsible.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            chore_description: '',
            chore_responsible: '',
            chore_completed: false
        }
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

    onSubmit(addressInfo) {
        

        console.log(`Form submitted:`);
        console.log(`Chore Description: ${this.state.chore_description}`);
        console.log(`Chore Responsible: ${this.state.chore_responsible}`);
        console.log(`Chore Completed: ${this.state.chore_completed}`);
        console.log(`Chore location: ${addressInfo}`)
        
        
        const newChore = {
            chore_description: this.state.chore_description,
            chore_responsible: this.state.chore_responsible,
            chore_completed: this.state.chore_completed,
            addressInfo: addressInfo
        }

        axios.post('/chore/add', newChore)
            .then(res => this.setState({
                chore_description:'',
                chore_responsible:'',
                chore_completed: '',
                addressInfo
            }),

        this.setState({
            chore_description: '',
            chore_responsible: '',
            chore_completed: false
        }))
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create New Chore</h3>
                <form >
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
                    <div>
                        <AddressForm onSubmit={this.onSubmit}/>
                    </div>
                </form>
            </div>
        )
    }
}
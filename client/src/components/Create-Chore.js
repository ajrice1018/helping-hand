import React, {Component} from 'react';
import axios from 'axios';

import ChoreList from './Chore-List';


export default class CreateChore extends Component {
   
    constructor(props) {
        super(props);
        
        this.onChangeChoreDescription = this.onChangeChoreDescription.bind(this);
        this.onChangeChoreResponsible = this.onChangeChoreResponsible.bind(this);
        this.onChangeChoreAddress = this.onChangeChoreAddress.bind(this);
        this.onChangeChorePhone = this.onChangeChorePhone.bind(this);

        this.onChangeStatusNotAccepted = this.onChangeStatusNotAccepted.bind(this);
        this.onChangeStatusAccepted = this.onChangeStatusAccepted.bind(this);
        this.onChangeStatusCompleted = this.onChangeStatusCompleted.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            chore_description: '',
            chore_responsible: '',
            chore_address:'',
            chore_phone:'',
            chore_status:'',
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

    onChangeChoreAddress(e) {
        this.setState({
            chore_address: e.target.value
        });
    }

    onChangeChorePhone(e) {
        this.setState({
            chore_phone: e.target.value
        });
    }

    onChangeStatusNotAccepted(e) {
        this.setState({
            chore_status: e.target.value
        });
    }

    onChangeStatusAccepted(e) {
        this.setState({
            chore_status: e.target.value
        });
    }

    onChangeStatusCompleted(e) {
        this.setState({
            chore_status: e.target.value,
            chore_completed: true
        });
    }

    onSubmit(e) {
        e.preventDefault()

        console.log(`Form submitted:`);
        console.log(`Chore Description: ${this.state.chore_description}`);
        console.log(`Chore Responsible: ${this.state.chore_responsible}`);
        console.log(`Chore Completed: ${this.state.chore_completed}`);
        console.log(`Chore location: ${this.state.chore_address}`)
        console.log(`Chore Phone: ${this.state.chore_phone}`);
        console.log(`Chore Status: ${this.state.chore_status}`)
        
        
        const newChore = {
            chore_description: this.state.chore_description,
            chore_responsible: this.state.chore_responsible,
            chore_completed: this.state.chore_completed,
            chore_address: this.state.chore_address,
            chore_phone: this.state.chore_phone,
            chore_status: this.state.chore_status
        }

        console.log(newChore);
        

        axios.post('/chore/add', newChore)
            .then(res => this.setState({
                chore_description:'',
                chore_responsible:'',
                chore_address: '',
                chore_completed: false,
                chore_phone: '',
                chore_status: ''
                
            })
            )
            // this.setState({
            //     chore_description: '',
            //     chore_responsible: '',
            //     chore_address:'',
            //     chore_completed: false,
            //     chore_phone: '',
            //     chore_status: ''
            // })
            
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
                    <div className="form-group">
                        <label>Chore Address(Address, City, State, Zip): </label>
                        <input  type="text"
                                className="form-control"
                                name= "address"
                                value={this.state.chore_address}
                                onChange={this.onChangeChoreAddress}
                                />
                    </div>
                    <div className="form-group">
                        <label>Contact Phone Number: </label>
                        <input  type="tel"
                                className="form-control"
                                name= "phone"
                                value={this.state.chore_phone}
                                onChange={this.onChangeChorePhone}
                                />
                    </div>
                    {/* <div className="form-group">
                        <label>Chore Status: </label>
                        <input  type="text"
                                className="form-control"
                                name= "status"
                                value={this.state.chore_status}
                                onChange={this.onChangeChoreStatus}
                                />
                    </div> */}
                    
                    <div class="form-check form-check-inline">
                        <input  class="form-check-input" 
                                type="radio" 
                                name="inlineRadioOptions" 
                                id="inlineRadio1" 
                                value="not-accepted"
                                onChange={this.onChangeStatusNotAccepted}
                                />
                        <label class="form-check-label" for="inlineRadio1">Not accepted</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input  class="form-check-input" 
                                type="radio" 
                                name="inlineRadioOptions" 
                                id="inlineRadio2" 
                                value="accepted"
                                onChange={this.onChangeStatusAccepted}
                                />
                        <label class="form-check-label" for="inlineRadio2">Accepted</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input  class="form-check-input" 
                                type="radio" 
                                name="inlineRadioOptions" 
                                id="inlineRadio3" 
                                value="completed"
                                onChange={this.onChangeStatusCompleted}
                                />
                        <label class="form-check-label" for="inlineRadio3">Completed</label>
                    </div>
                    <br/>

                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                </form>
                <ChoreList />
            </div>
            
        )
    }
}
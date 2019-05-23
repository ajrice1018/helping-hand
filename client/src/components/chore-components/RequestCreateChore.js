import React, {Component} from 'react';
import axios from 'axios';


export default class RequestCreateChore extends Component {
   
    constructor(props) {
        super(props);
        
        this.onChangeChoreDescription = this.onChangeChoreDescription.bind(this);
        this.onChangeChoreResponsible = this.onChangeChoreResponsible.bind(this);
        this.onChangeChoreAddress = this.onChangeChoreAddress.bind(this);
        this.onChangeChorePhone = this.onChangeChorePhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            chore_description: '',
            chore_responsible: '',
            chore_address:'',
            chore_phone:'',
            chore_accepted: false,
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

    onSubmit(e) {
        e.preventDefault()

        console.log(`Form submitted:`);
        console.log(`Chore Description: ${this.state.chore_description}`);
        console.log(`Chore Responsible: ${this.state.chore_responsible}`);
        console.log(`Chore Completed: ${this.state.chore_completed}`);
        console.log(`Chore location: ${this.state.chore_address}`)
        console.log(`Chore Phone: ${this.state.chore_phone}`);
        console.log(`Chore Accepted: ${this.state.chore_accepted}`)
        
        
        const newChore = {
            chore_description: this.state.chore_description,
            chore_responsible: this.state.chore_responsible,
            chore_completed: this.state.chore_completed,
            chore_address: this.state.chore_address,
            chore_phone: this.state.chore_phone,
            chore_accepted: this.state.chore_accepted
        }

        console.log(newChore);
        

        axios.post('/chore/add', newChore)
            .then(res => this.setState({
                chore_description:'',
                chore_responsible:'',
                chore_address: '',
                chore_completed: false,
                chore_phone: '',
                chore_accepted: false
                
            })
            )
            
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
                    
                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                </form>
                
            </div>
            
        )
    }
}
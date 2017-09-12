import {subscribeToTimer, sendForm} from './api';
import React, {Component} from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        subscribeToTimer((err, timestamp) => this.setState({timestamp}));
    };

    state = {
        timestamp: 'no timestamp yet'
    };

    render() {
        return (
            <div className="App">
                <p className="App-intro">This is the timer value: {this.state.timestamp}</p>
                <WebsocketForm />
            </div>
        );
    };
}

class WebsocketForm extends Component {

    // https://facebook.github.io/react/docs/forms.html
    constructor(props) {
        super(props);
        this.state = {message: ''};

        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit = function(event){
        event.preventDefault();
        sendForm({"message": this.state.message});
        this.setState({message: ""});
    };

    handleChangeMessage(event) {
        this.setState({message: event.target.value});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="message" value={this.state.message} onChange={this.handleChangeMessage}/>
                <input type="submit" value="Send" />
            </form>
        );
    }
}

export default App;

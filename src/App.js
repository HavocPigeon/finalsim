import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();

    this.state = {
      userInput: '',
      colors: '',
    }
  }
  handleInput = (input) => {
     this.setState({
       userInput: input,
     })
  }
  changeColor = () => {
    axios.put('/api/change', {newColor: this.state.userInput})
    .then(() => {
      this.setState({
        colors: this.state.userInput,
      })
    })
  }
  componentDidUpdate(){
    axios.get('/api/colors').then(res => {
      this.setState({
        colors: res.data
      })
  }) 
}
  render() {
    return (
      <div className="App">
       <div>
         <input placeholder='type here' onChange={e => this.handleInput(e.target.value)} type="text"/>
       </div>
       <div>
         <button onClick={() => this.changeColor()}>Update Color</button>
       </div>
       <div>
         {this.state.colors}
       </div>
      </div>
    );
  }
}

export default App;

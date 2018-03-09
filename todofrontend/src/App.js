import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './App.css';
import Header from './Components/Header';
import TodoList from './Components/TodoList';
import TodoInput from './Components/TodoInput';
import axios from 'axios';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import MyAwesomeReactComponent from './MyAwesomeReactComponent';

// const App = () => (
//   <MuiThemeProvider>
//     <MyAwesomeReactComponent />
//   </MuiThemeProvider>
// );

const todoItems = [
//   {value: 'Drink 8 glasses of water', done: true },
//   {value: 'Exercise', done: false },
//   {value: 'Eat at least 5 servings of fruit and veggies', done: true}
// 
]

class App extends Component {
  constructor() {
    super()
    
    this.state = {
      todoItems: []
    }
  }

  componentWillMount() {
    axios.get("http://localhost:8080")
    .then((response) => {
      this.setState({
        todoItems: response.data 
      })
    })
    .catch(function (error) {
      // console.log(error);
    });
  }  

  addItem = (event) => {
    event.preventDefault()
   
    let newTodo = {
      value: event.target.todo.value,
      done:false
    }
    
    axios.post("http://localhost:8080", {
    newTodo
    }).then((res)=>{

this.setState({
      todoItems: res.data
    })
    })
    
    event.target.todo.value = "" 
  }

  toggleDone = (e, i) => {
    console.log(this.state.todoItems)
    this.state.todoItems[i].done = !this.state.todoItems[i].done;
    this.setState({
      todoItems: this.state.todoItems

    })
    axios.post("http://localhost:8080/update", {
    value: this.state.todoItems[i].value,
    done: this.state.todoItems[i].done,
    id: this.state.todoItems[i].id
    })

  }
 


  clearDone = (todoItems) => {
    let clearedItems = this.state.todoItems.filter((todo) => {
    return (todo.done === false)
  })
   axios.post("http://localhost:8080/delete")
    .then((res)=>{
      console.log(res.data)
      this.setState({
        todoItems: res.data 
      })
    })
  

  //  axios.delete("http://localhost:8080/update", 
  //  { data: { foo: "bar" } });
    

  }

  render() {
    return (
      <div className="App">
       
        <Header />
        <TodoList todoItems={this.state.todoItems} 
        toggleDone={this.toggleDone}/>
        <TodoInput addItem={this.addItem}/>
        <button onClick={() => { this.clearDone(1)}}>Clear All</button> 

      </div>
    );
    }
  }
  



  // ReactDOM.render(
  //   <App />,
  //   document.getElementById('app')
  // );

export default App;
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';

// Random id using uuid
// import uuid from 'uuid';
import axios from 'axios';

class App extends Component {

  // state = {
  //   todos: [
  //     {
  //       id: uuid.v4(),
  //       title: 'Task 1',
  //       completed: false
  //     },
  //     {
  //       id: uuid.v4(),
  //       title: 'Task 2',
  //       completed: false
  //     },
  //     {
  //       id: uuid.v4(),
  //       title: 'Task 3',
  //       completed: false
  //     }
  //   ]
  // }

  state = {
    todos: []
  }
  // ?_limit=10 "to limit content"
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }

  // Toggle complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    })
  }


  // Del todo
  delTodo = (id) => {
    // console.log(id)
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
  }

  // add todos
  addTodos = (title) => {

    // const newTodo = {
    //   id: uuid.v4(),
    //   title,
    //   completed: false
    // }

    //if key value pair both are same i.e., title: title then use title
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
      .then(res => this.setState({ todos:
          [...this.state.todos, res.data]
      }));
  }

  render() {


    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />

            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodos={this.addTodos} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />

            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

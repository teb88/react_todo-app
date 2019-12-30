import React from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
const API_BASE_URL = "http://192.168.99.100:3001";

class TodoList extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            todos: []
        }

        this.updateTodo = this.updateTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.createToDo = this.createToDo.bind(this);
        this.addNewTodo = this.addNewTodo.bind(this);
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData(){
        fetch(API_BASE_URL + "/api/todos")
            .then(this.toJson)
            .then(todos => this.setState({ todos }))
            .catch(err => console.log(err));
    }

    postData(url, data, doWithValue){
        console.log(JSON.stringify(data))
        fetch(url,
            {            
                method: "POST",      
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(this.toJson)
            .then(doWithValue);
    }

    toJson(response){
        return response.json();
    }

    createToDo(name){
        console.log("create todo with text ", name);
        this.postData(API_BASE_URL + "/api/todos", {name:name}, this.addNewTodo);
    }

    addNewTodo(todo){
        console.log("state ", this.state);
        this.setState({ todos: [...this.state.todos, todo] });
    }

    deleteTodo(id){
        const todos = this.state.todos.filter(t => t._id !== id);
        this.setState({ todos });

        fetch(API_BASE_URL + "/api/todos/" + id, 
            { 
                method: "DELETE"
            }).then(this.toJson)
            .then(data=> console.log(data));
    }

    updateTodo(id, currentStatus){
        const completed = !currentStatus;

        console.log("toggle to " + completed);
        const todos = this.state.todos.map(t => t._id === id ? {...t, completed } : t);
        this.setState({ todos });

        fetch(API_BASE_URL + "/api/todos/" + id, 
            { 
                method: "PUT",      
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed })
            }).then(this.toJson)
            .then(data => console.log("OK"));
         
    }

    render(){
        const todos = this.state.todos.map(t => 
            
            <TodoItem 
                key={t._id}
                
                onUpdate={this.updateTodo}
                onDelete={this.deleteTodo}
                {...t} />
        )

        return (            
            <section id="todo-list-container">
                <TodoForm onSubmit={this.createToDo} />                
                <ul>{todos}</ul>
            </section>            
        )
    }

}

export default TodoList;
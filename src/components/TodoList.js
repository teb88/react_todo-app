import React from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import * as apiHelper from "../helpers/apiHelper";

class TodoList extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            todos: []
        }

        this.updateTodo = this.updateTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.createToDo = this.createToDo.bind(this);        
    }

    componentDidMount(){
        this.fetchData();
    }

    async fetchData(){
        const todos = await apiHelper.fetchData();
        this.setState({ todos });
    }

    async createToDo(name){
        const todo = await apiHelper.createTodo({name});
        this.setState({ todos: [...this.state.todos, todo] });
    }

    deleteTodo(id){
        apiHelper.deleteTodo(id);

        const todos = this.state.todos.filter(t => t._id !== id);
        this.setState({ todos });
    }

    updateTodo(id, currentStatus){
        const completed = !currentStatus;
        apiHelper.updateTodo(id, completed);

        const todos = this.state.todos.map(t => t._id === id ? {...t, completed } : t);
        this.setState({ todos });
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
import React from "react";

class TodoForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            inputValue: ""
        }
        this.submitToDo = this.submitToDo.bind(this);
        this.inputMonitor = this.inputMonitor.bind(this);
    }

    submitToDo(ev){
        if (ev.which === 13){
            this.props.onSubmit(ev.target.value);
            this.setState({ inputValue: "" });
        }
    }

    inputMonitor(ev){
        this.setState({ inputValue: ev.target.value });
    }

    render(){
        return <input type="text" name="todo" value={this.state.inputValue} onChange={this.inputMonitor} onKeyPress={this.submitToDo} />
    }
}

export default TodoForm;
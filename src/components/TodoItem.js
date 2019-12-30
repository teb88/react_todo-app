import React from "react";

const TodoItem = ({completed, name, onDelete, onUpdate, _id}) => {

    const classes = completed ? "completed todo" : "todo";
    return  <li 
                onClick={()=> onUpdate(_id, completed)}
                className={classes}>
                    {name}           
                <span className="delete-btn" onClick={(ev)=> {ev.stopPropagation(); onDelete(_id)}} >X</span>
            </li>
          
    }
;

export default TodoItem;
const API_BASE_URL = "http://192.168.99.100:3001";

const createTodo = data =>
    fetch(API_BASE_URL + "/api/todos",
        {   method: "POST",                
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(toJson);

const deleteTodo = id => 
    fetch(API_BASE_URL + "/api/todos/" + id, 
            { method: "DELETE" });


const updateTodo = (id, completed) =>
    fetch(API_BASE_URL + "/api/todos/" + id, 
            {   method: "PUT",      
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed }) });
                
const fetchData = async () => 
    fetch(API_BASE_URL + "/api/todos")
            .then(toJson);

const toJson = promise => promise.json();

export { fetchData, createTodo, deleteTodo, updateTodo }

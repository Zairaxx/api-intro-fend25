// console.log("Hej");
// console.log("På");
// console.log("Dig");


// let todos = fetch('https://jsonplaceholder.typicode.com/todos/');
// console.log(todos);


//Asynkron Javascript


// then-kedja

fetch('https://jsonplaceholder.typicode.com/todos/')
.then((response) => response.json())
.then((json)=>{
    console.log(json);
})

// Async/await

const getTodos = async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/todos/');
    let json = await response.json();
    return json
}

const renderPage = async () => {
    let todos = await getTodos();

    todos.forEach(todo => {
        let li = document.createElement("li");
        li.innerText = todo.title;
        document.querySelector("#todo-list").append(li);
    });
}

renderPage();
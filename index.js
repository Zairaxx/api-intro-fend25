
const getTodos = async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/todos/');
    let json = await response.json();
    return json
}

const renderPage = async () => {
    let todos = await getTodos();

    let latestId = 0;
    let ul;

    todos.forEach(todo => {


        if(todo.userId !== latestId){
            latestId = todo.userId;

            let h3 = document.createElement("h3");
            h3.innerText = `Todolist - User ${todo.userId}`; 
            ul = document.createElement("ul");
            ul.style.border = "2px solid black";
            document.body.append(h3, ul);
            //Gör en ny h3:a + en ny todo-lista
        }

        let li = document.createElement("li");
        li.innerText = `#${todo.id}: ${todo.title}`

        //checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        li.append(checkbox);

        ul.append(li);
    });
}

renderPage();
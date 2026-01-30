
const getData = async (url) => {
    let response = await fetch(url);
    let json = await response.json();
    return json 
}

const renderPage = async () => {
    let todos = await getData('https://jsonplaceholder.typicode.com/todos/')

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

// renderPage();

//Uppgift 2

let getProfilesBtn = document.querySelector("#getProfiles");

getProfilesBtn.addEventListener("click", async () => {
    let profiles = await getData('https://jsonplaceholder.typicode.com/users/')
    console.log(profiles);

    let ul = document.querySelector("#profiles");

    profiles.forEach(profile => {
        ul.innerHTML += `
            <li>
                <p><strong>Name:</strong>${profile.name}</p>
                <p><strong>Email:</strong>${profile.email}</p>
                <p><strong>Adress:</strong>${profile.address.street}, ${profile.address.city}</p>
                <p><strong>Company:</strong>${profile.company.name} - ${profile.company.bs}</p>
            </li>
        `
    })
})

//Uppgift 3

let renderProfiles = async () => {
    let profiles = await getData("https://jsonplaceholder.typicode.com/users");
    console.log(profiles);
    let ul = document.querySelector("#profiles-2");

    profiles.forEach(profile => {
        let li = document.createElement("li");
        li.innerText = profile.name;

        //buttons
        let showInfoBtn = document.createElement("button");
        showInfoBtn.innerText = "Show info";
        showInfoBtn.addEventListener("click", async () => {

            let allProfiles = document.querySelectorAll("ul li div");

            allProfiles.forEach(info => {
                info.innerHTML = "";
            })

            let userPosts = await getData("https://jsonplaceholder.typicode.com/posts?userId=" + profile.id);
            let userTodos = await getData("https://jsonplaceholder.typicode.com/todos?userId=" + profile.id);
            console.log(userPosts, userTodos);

            //det 
            let postList = document.createElement("ul");
            userPosts.forEach(post => {
                postList.innerHTML += `<li>Post #${post.id}: ${post.title}</li>`
            })

            let todoList = document.createElement("ul");
            userTodos.forEach(todo => {
                if(!todo.completed){
                    todoList.innerHTML += `<li>Todo #${todo.id}: ${todo.title}</li>`
                }
            })

            let profileDiv = document.createElement("div");
            let city = document.createElement("p");
            city.innerText = "City: " + profile.address.city;
            profileDiv.append(city,postList,todoList);
            li.append(profileDiv);

        })

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete"
        deleteBtn.addEventListener("click", () => {
            li.remove();
        })

        li.append(showInfoBtn,deleteBtn);
        ul.append(li);
    })
}

renderProfiles();
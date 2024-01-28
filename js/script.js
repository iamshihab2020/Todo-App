const inputBox = document.querySelector("#mainInput");
const addBtn = document.querySelector("#addBtn");
const listContainer = document.querySelector(".form-control");

// Load existing to-do items from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

    savedTodos.forEach((todo) => {
        addTodoItem(todo);
    });
});

addBtn.addEventListener("click", () => {
    let inputValue = inputBox.value;

    if (inputValue === "") {
        alert("Please enter a value");
        return;
    }

    // Create a new to-do object
    const todoItem = {
        text: inputValue,
        completed: false,
    };

    // Add the new to-do to localStorage
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.push(todoItem);
    localStorage.setItem("todos", JSON.stringify(savedTodos));

    // Add the new to-do to the list
    addTodoItem(todoItem);

    // Clear input box
    inputBox.value = "";
});

function addTodoItem(todoItem) {
    const newLi = document.createElement("label");
    newLi.className =
        "cursor-pointer label todo-content opacity-0 transition-opacity duration-500 ease-in-out";

    newLi.innerHTML = `
            <div class="flex items-center justify-around label-top">
                <input type="checkbox" class="checkbox checkbox-primary transition duration-500 transform hover:scale-110" />
                <span class="label-texts text-xl ml-3">${todoItem.text}</span>
            </div>
            <div>
                <button class="dlt_btn btn bg-red-500 hover:bg-red-700 text-white join-item rounded-xl text-xl flex items-center justify-center font-black transition duration-500 transform hover:scale-110"><i class="fa-solid fa-minus"></i></button>
            </div>
        `;

    listContainer.appendChild(newLi);

    // Triggering reflow to apply transition
    newLi.offsetHeight;

    // Add 'opacity-100' class to apply transition
    newLi.classList.remove("opacity-0");
    newLi.classList.add("opacity-100");

    const checkbox = newLi.querySelector(".checkbox");
    const dlt_btn = newLi.querySelector(".dlt_btn");
    const todoContent = newLi.querySelector(".label-texts"); // Updated selector

    // Set the checkbox state based on the saved to-do item
    checkbox.checked = todoItem.completed;

    // Apply line-through effect if the to-do item is completed
    if (todoItem.completed) {
        todoContent.style.textDecoration = "line-through";
    }

    // Add event listener to the newly created checkbox
    checkbox.addEventListener("change", () => {
        todoItem.completed = checkbox.checked;
        updateLocalStorage();

        // Update the textDecoration style
        todoContent.style.textDecoration = checkbox.checked
        ? "line-through"
        : "none";
    });

    // Add event listener to the delete button
    dlt_btn.addEventListener("click", () => {
        listContainer.removeChild(newLi);
        // Remove the to-do from localStorage
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        const updatedTodos = savedTodos.filter(
        (item) => item.text !== todoItem.text
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    });
}

    // Function to update localStorage with the latest to-do items
function updateLocalStorage() {
    const todoElements = document.querySelectorAll(".label");
    const todos = [];

    todoElements.forEach((todoElement) => {
        const checkbox = todoElement.querySelector(".checkbox");
        const todoText = todoElement.querySelector(".label-texts").innerText;

        todos.push({
        text: todoText,
        completed: checkbox.checked,
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

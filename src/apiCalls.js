import { API_BASE_URL } from "./constants";

export async function getCreateUser(userName) {
    const response = await fetch(`${API_BASE_URL}/GetCreateUser/${userName}`);

    return await response.json();
}

export async function getUser(userName) {
    const response = await fetch(`${API_BASE_URL}/GetUser/${userName}`);

    return await response.json();
}

export async function createTodo(userName, todo) {
    const response = await fetch(
        `${API_BASE_URL}/CreateTodo/${userName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        });
    
    return await response.json();
}

export async function updateUserProfilePicture(userName, profilePicture) {
    const response = await fetch(
        `${API_BASE_URL}/UpdateUser/${userName}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify([{
                op: "replace",
                path: "profilePicture",
                value: profilePicture
            }])
        });
    
    return await response.json();
}

export async function updateTodoDescription(userName, id, description) {
    const response = await fetch(
        `${API_BASE_URL}/UpdateTodo/${userName}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify([{
                op: "replace",
                path: "description",
                value: description
            }])
        });
    
    return await response.json();
}

export async function updateTodoStatus(userName, id, status) {
    const response = await fetch(
        `${API_BASE_URL}/UpdateTodo/${userName}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify([{
                op: "replace",
                path: "status",
                value: status
            }])
        });
    
    return await response.json();
}

export async function removeTodo(userName, id) {
    const response = await fetch(
        `${API_BASE_URL}/RemoveTodo/${userName}/${id}`, {
            method: "DELETE"
        });
    
    return;
}
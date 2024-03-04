import "./Dashboard.css";

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import TodoList from "./TodoList";
import { getUser, createTodo } from "../apiCalls";
import { USER_KEY, SAVING_TEXT, TODO_STATE } from "../constants";
import { UserNameContext } from "../context";

export default function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState();
    const [todos, setTodos] = useState();
    const [newTodoInput, setNewTodoInput] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const userStorage = localStorage.getItem(USER_KEY);

        if (!userStorage) {
            navigate("/");
        }

        const parsedUser = JSON.parse(userStorage);
        setUser(parsedUser);

        refreshUser(parsedUser.userName);
    }, []);

    const refreshUser = async (userName) => {
        try {
            const refreshedUser = await getUser(userName);
            localStorage.setItem(USER_KEY, JSON.stringify(refreshedUser));
            setUser(refreshedUser);
            setTodos(refreshedUser.todos);
        } catch {
            logOut();
        }
    }

    const logOut = () => {
        localStorage.removeItem(USER_KEY);
        navigate("/");
    }

    const saveTodo = async () => {
        const newTodoDescription = newTodoInput;

        setSaving(true);
        setNewTodoInput(SAVING_TEXT);

        await createTodo(user.userName, newTodoDescription);

        setNewTodoInput("");
        setSaving(false);

        await refreshUser(user.userName);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newTodoInput || !newTodoInput.trim() || saving) {
            return;
        }

        saveTodo();
    }

    return (
        <div className="container text-center mt-3">
            <h1>Dashboard</h1>
            <div className="m-3">
                <a href="/upload-picture" className="badge text-muted">Upload profile picture</a>
                <a href="#" className="badge text-muted" onClick={logOut}>Log out</a>
            </div>
            {user &&
                <div className="row">
                    {user.profilePicture &&
                        <img className="p-0 border img-fluid rounded-circle shadow"
                            src={user.profilePicture} />}
                    <h6 className="mt-2 text-center">{user.userName}</h6>
                    <form className="p-0" onSubmit={handleSubmit}>
                        <input className="p-3 shadow-sm form-control"
                            placeholder="New task..."
                            value={newTodoInput}
                            disabled={saving}
                            onChange={(e) => setNewTodoInput(e.target.value)} />
                    </form>
                    <UserNameContext.Provider value={user.userName}>
                        <TodoList
                            title={"Pending"}
                            todos={todos}
                            refreshUser={refreshUser}
                            listState={TODO_STATE.PENDING} />
                        <TodoList
                            title={"In Progress"}
                            todos={todos}
                            refreshUser={refreshUser}
                            listState={TODO_STATE.IN_PROGRESS} />
                        <TodoList
                            title={"Completed"}
                            todos={todos}
                            refreshUser={refreshUser}
                            listState={TODO_STATE.COMPLETED} />
                    </UserNameContext.Provider>
                </div>
            }
        </div>
    )
}
import {
    updateTodoDescription,
    updateTodoStatus,
    removeTodo as apiRemoveTodo
} from '../apiCalls';

import { SAVING_TEXT } from '../constants';
import { UserNameContext } from '../context';
import { useContext, useState } from "react"

export default function Todo({ todo, refreshUser }) {
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [descriptionInput, setDescriptionInput] = useState(todo.description);

    const userName = useContext(UserNameContext);

    const saveDescription = async () => {
        const newTodoDescription = descriptionInput;

        setSaving(true);
        setDescriptionInput(SAVING_TEXT);

        await updateTodoDescription(userName, todo.id, newTodoDescription);

        setDescriptionInput(newTodoDescription);
        setSaving(false);
        setEditing(false);

        refreshUser(userName);
    }

    const saveStatus = async (newStatus) => {
        setSaving(true);
        await updateTodoStatus(userName, todo.id, newStatus);
        setSaving(false);

        refreshUser(userName);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!descriptionInput || !descriptionInput.trim() || saving) {
            return;
        }

        saveDescription();
    }

    const startEditing = () => {
        setDescriptionInput(todo.description);
        setEditing(true);
    }

    const removeTodo = async () => {
        setSaving(true);
        await apiRemoveTodo(userName, todo.id);

        refreshUser(userName);
    }

    return editing
        ? (
            <div className="row">
                <form className="" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-10 p-0">
                            <input className="form-control"
                                value={descriptionInput}
                                disabled={saving}
                                onChange={(e) => setDescriptionInput(e.target.value)} />

                        </div>
                        <div className="col-2">
                            <button className="btn p-0"
                                type="submit"
                                disabled={saving}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-floppy-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
                                    <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
                <select className="form-select"
                    value={todo.status}
                    onChange={(e) => saveStatus(e.target.value)}
                    disabled={saving}>
                    <option value={0}>Pending</option>
                    <option value={1}>In Progress</option>
                    <option value={2}>Completed</option>
                </select>
            </div>
        )
        : (
            <div>
                <div className="d-flex align-items-center justify-content-center">
                    <h6 className="m-0 pt-2">{todo.description}</h6>
                </div>
                <div className="p-sm-0 pb-sm-2">
                    <button className="btn p-2 m-1"
                        onClick={startEditing}
                        disabled={saving}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                        </svg>
                    </button>
                    <button className="btn p-2 m-1"
                        onClick={removeTodo}
                        disabled={saving}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg>
                    </button>
                </div>
                <select className="form-select text-center"
                    value={todo.status}
                    onChange={(e) => saveStatus(e.target.value)}
                    disabled={saving}>
                    <option value={0}>Pending</option>
                    <option value={1}>In Progress</option>
                    <option value={2}>Completed</option>
                </select>
            </div>
        );
}
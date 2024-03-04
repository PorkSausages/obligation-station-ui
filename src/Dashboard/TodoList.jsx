import Todo from "./Todo";

export default function TodoList({ title, todos, refreshUser, listState }) {
    const formatTodos = () => {
        if (!todos) { return null; }
        if (!Array.isArray(todos)) { console.log(todos); }

        return todos
            .filter(todo => todo.status === listState)
            .map(todo =>
                <div className="card p-4 pt-2 mb-3 shadow-sm" key={todo.id}>
                    <Todo
                        todo={todo}
                        refreshUser={refreshUser} />
                </div>);
    }

    const todosMarkup = formatTodos();

    const todosCount = todos 
        ? todos.filter(todo => todo.status === listState).length 
        : "";

    return (
        <div className="todo-list col-sm-4 mt-4">
            <h5>{title} - {todosCount}</h5>
            {todos && <div>{todosMarkup}</div>}
        </div>
    )
}
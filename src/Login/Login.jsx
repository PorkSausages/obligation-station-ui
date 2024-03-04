import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getCreateUser } from "../apiCalls";
import { USER_KEY } from "../constants";

export default function Login() {
    const navigate = useNavigate();
    const [enteredName, setEnteredName] = useState("");

    useEffect(() => {
        if (localStorage.getItem(USER_KEY)) {
            navigate("/dashboard");
        }
    }, []);

    const login = async () => {
        const user = await getCreateUser(enteredName);

        localStorage.setItem(USER_KEY, JSON.stringify(user));
        navigate("/dashboard");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
    }

    return (
        <div className="container text-center mt-3">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <input className="form-control" 
                    onChange={(e) => setEnteredName(e.target.value)}
                    placeholder="Username" />
                <button className="btn" type="submit">Login</button>
            </form>
        </div>
    )
}
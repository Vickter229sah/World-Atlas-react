import { NavLink, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
    // Access the error object from the route context.
    const error = useRouteError();
    console.log("Error Object:", error);

    return (
        <div>
            <h1>Something went wrong.</h1>
            {error && <p>{error.data}</p>}
            <NavLink to="/">
                <button>Go to Home</button>
            </NavLink>
        </div>
    );
};

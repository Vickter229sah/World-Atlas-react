import { Outlet } from "react-router-dom";
import { Footers } from "../UI/Footers";
import { Headers } from "../UI/Headers";

export const AppLayout = () => {
    console.log("Outlet Rendered");
    return (
        <>
            <Headers />
            <Outlet />
            <Footers />
        </>
    );
};

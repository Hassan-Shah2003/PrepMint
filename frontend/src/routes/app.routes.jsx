import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/login.jsx";
import Register from "../features/auth/pages/register.jsx";
import ProtectedRoutes from "../features/auth/components/ProtectedRoutes.jsx";
import InterviewHome from "../features/interview/pages/home.jsx";
import Interview from "../features/interview/pages/interview.jsx";
import NotFound from "../components/NotFound";
import GuestRoute from "../features/auth/components/GuestRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: 
        <GuestRoute>
        <Login /></GuestRoute>
    },
    {
        path: "/register",
        element: <GuestRoute>
            <Register />
        </GuestRoute>
    },
    {
        path: "/",
        element: (
            <ProtectedRoutes>
                <InterviewHome />
            </ProtectedRoutes>
        ),
    },
    {
        path:"/interview/:interviewId",
        element:(
            <ProtectedRoutes>
                <Interview></Interview>
            </ProtectedRoutes>
        )
    }
    ,{
        path: "*",
        element: <NotFound />
    }
]);

export default router;
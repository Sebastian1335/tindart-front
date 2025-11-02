import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "./Auth/routes/AuthRoutes";
import { TindartRoutes } from "./tindart/routes/TindartRoutes";
import { useAuthStore, useProfileStore } from "./Auth/store/authStore";
import { useEffect } from "react";

export const Router = () => {
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = Boolean(token);
    const fetchProfileData = useProfileStore((state) => state.fetchProfileData)
    useEffect(() => {
        fetchProfileData(user.id)
    }, [])
    return (
        <Routes>
            {isAuthenticated ? (
                <>
                    <Route path="/feed/*" element={<TindartRoutes />} />
                    <Route
                        path="/*"
                        element={<Navigate to="/feed" replace />}
                    />
                </>
            ) : (
                <>
                    <Route path="/auth/*" element={<AuthRoutes />} />
                    <Route
                        path="/*"
                        element={<Navigate to="/auth" replace />}
                    />
                </>
            )}
            <Route path="/*" element={<Navigate to={"/auth"} />} />
        </Routes>
    );
};

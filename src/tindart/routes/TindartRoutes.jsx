import { Route, Routes } from "react-router";
import { MainLayout } from "../layout/MainLayout";
import { Feed } from "../pages/feed/Feed";
import Profile from "../pages/profile/Profile";
import { WhiteboardList } from "../pages/whiteboardList/WhiteboardList";
import { Whiteboard } from "../pages/whiteboard/Whiteboard";
import { Chat } from "../pages/chat/Chat";
import { Tienda } from "../pages/tienda/Tienda";
import { useAuthStore, useProfileStore } from "../../Auth/store/authStore";
import { useEffect } from "react";
import { Dashboard } from "../pages/dashboard/Dashboard";

export const TindartRoutes = () => {
    const user = useAuthStore((state) => state.user);
    const fetchProfileData = useProfileStore((state) => state.fetchProfileData)

    useEffect(() => {
        fetchProfileData(user.id)
    }, [])
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/whiteboardList" element={<WhiteboardList />} />
                <Route path="/whiteboard" element={<Whiteboard />} />
                <Route path="/tienda" element={<Tienda />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    );
};

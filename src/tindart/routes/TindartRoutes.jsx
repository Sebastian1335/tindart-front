import { Route, Routes } from "react-router";
import { MainLayout } from "../layout/MainLayout";
import { Feed } from "../pages/feed/Feed";
import Profile from "../pages/profile/Profile";
import { WhiteboardList } from "../pages/whiteboardList/WhiteboardList";
import { Whiteboard } from "../pages/whiteboard/Whiteboard";

export const TindartRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/whiteboardList" element={<WhiteboardList />} />
                <Route path="/whiteboard" element={<Whiteboard />} />
            </Route>
        </Routes>
    );
};

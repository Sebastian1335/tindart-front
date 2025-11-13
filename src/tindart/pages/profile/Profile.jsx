import { useEffect, useState } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import "./Profile.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useAuthStore, useProfileStore } from "../../../Auth/store/authStore";
import { useFeed } from "../../store/feedStore";
import { DetailModal } from "../../componentes/detailModal/detailModal";

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("portfolio");
    const feed = useFeed((state) => state.feed);
    const selectedPost = useFeed((state) => state.selectedPost);
    const selectPost = useFeed((state) => state.selectPost);
    const user = useAuthStore((state) => state.user);

    const fetchPortfolio = useFeed((state) => state.fetchPortfolio);
    const fetchLikedPosts = useFeed((state) => state.fetchLikedPosts);
    const fetchSavedPosts = useFeed((state) => state.fetchSavedPosts);
    const fetchComisiones = useFeed((state) => state.fetchComisiones);

    const loading = useProfileStore((state) => state.loading);
    const userProfileData = useProfileStore((state) => state.userProfileData);
    const fetchProfileData = useProfileStore((state) => state.fetchProfileData);

    useEffect(() => {
        fetchProfileData(user.id);
    }, []);

    useEffect(() => {
        switch (activeTab) {
            case "portfolio":
                fetchPortfolio(1, 20);
                break;
            case "comisiones":
                fetchComisiones(1, 20);
                break;
            case "liked":
                fetchLikedPosts(1, 20);
                break;
            case "guardados":
                fetchSavedPosts(1, 20);
                break;
        }
    }, [activeTab]);
    if (loading || !userProfileData) {
        return <div className="loading">Cargando perfil...</div>;
    }

    return (
        <>
            <div className="tindart-profile">
                {/* Banner */}
                <div className="profile-banner-container">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1704518704021-8a195b821d5c?auto=format&fit=crop&q=80&w=1332"
                        alt="Profile Banner"
                        className="profile-banner"
                    />
                </div>

                <div className="profile-content-wrapper">
                    {/* Left Column: Profile Info */}
                    <div className="profile-info-column">
                        <div className="profile-avatar-wrapper">
                            <div className="profile-avatar-large">
                                <img src="/icono.png" alt="Profile" />
                            </div>
                        </div>

                        <h1 className="profile-username">
                            {userProfileData.userName}
                        </h1>
                        <p className="profile-handle">
                            @{userProfileData.userName}
                        </p>

                        <p className="profile-description">
                            {userProfileData.extra.description}
                        </p>

                        <div className="profile-stats">
                            <div className="stat-item">
                                <span className="stat-label">Seguidores</span>
                                <span className="stat-value">
                                    {userProfileData.extra.followers}
                                </span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Me gusta</span>
                                <span className="stat-value">
                                    {userProfileData.extra.totalLikesReceived}
                                </span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Siguiendo</span>
                                <span className="stat-value">
                                    {userProfileData.extra.following}
                                </span>
                            </div>
                        </div>

                        <button className="seguir-btn">Seguir</button>
                    </div>

                    {/* Right Column: Portfolio Grid */}
                    <div className="portfolio-column">
                        {/* Tabs and Action Buttons */}
                        <div className="profile-header-row">
                            <div className="profile-tabs">
                                <button
                                    className={`tab-btn ${
                                        activeTab === "portfolio"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => setActiveTab("portfolio")}
                                >
                                    Portafolio
                                </button>
                                <button
                                    className={`tab-btn ${
                                        activeTab === "comisiones"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => setActiveTab("comisiones")}
                                >
                                    Comisiones
                                </button>
                                <button
                                    className={`tab-btn ${
                                        activeTab === "liked" ? "active" : ""
                                    }`}
                                    onClick={() => setActiveTab("liked")}
                                >
                                    Liked
                                </button>
                                <button
                                    className={`tab-btn ${
                                        activeTab === "guardados"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => setActiveTab("guardados")}
                                >
                                    Mis guardados
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="profile-actions">
                                <button className="editar-perfil-btn">
                                    Editar Perfil
                                </button>
                                <button className="icon-btn">
                                    <MoreVertIcon sx={{ fontSize: 20 }} />
                                </button>
                                <button className="icon-btn">
                                    <MailOutlineIcon sx={{ fontSize: 20 }} />
                                </button>
                            </div>
                        </div>

                        <ImageList
                            sx={{
                                width: "100%",
                                height: "calc(100% - 120px)",
                                overflowY: "auto",
                                cursor: "pointer",
                                scrollbarWidth: "none",
                                "&::-webkit-scrollbar": { display: "none" },
                            }}
                            variant="quilted"
                            cols={4}
                            rowHeight={200}
                        >
                            {feed.map((item) => {
                                const rows = 2;
                                const cols = 1;
                                return (
                                    <ImageListItem
                                        key={item.id}
                                        cols={cols}
                                        rows={rows}
                                        onClick={() => selectPost(item)}
                                        sx={{
                                            transition: "transform 0.3s ease",
                                            "&:hover": {
                                                transform: "scale(1.03)",
                                            },
                                        }}
                                    >
                                        <img
                                            {...srcset(
                                                item.image,
                                                200,
                                                rows,
                                                cols
                                            )}
                                            alt={item.title}
                                            loading="lazy"
                                            style={{
                                                borderRadius: "8px",
                                                padding: "4.5px",
                                            }}
                                        />
                                    </ImageListItem>
                                );
                            })}
                        </ImageList>
                        {selectedPost !== null && <DetailModal />}
                    </div>
                </div>
            </div>
        </>
    );
}

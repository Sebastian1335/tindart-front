import { useEffect, useState } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import "./Profile.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useAuthStore } from "../../../Auth/store/authStore";
import { useFeed } from "../../store/feedStore";
import { DetailModal } from "../../componentes/detailModal/detailModal";

const portfolioItems = [
    {
        id: 1,
        img: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=1019",
        title: "Water Lilies",
        cols: 2,
        rows: 2,
    },
    {
        id: 2,
        img: "https://images.unsplash.com/photo-1579783902915-f0b0de2c2eb3?auto=format&fit=crop&q=80&w=1035",
        title: "Abstract Purple",
        cols: 1,
        rows: 1,
    },
    {
        id: 3,
        img: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&q=80&w=690",
        title: "Colorful Art",
        cols: 1,
        rows: 1,
    },
    {
        id: 4,
        img: "https://images.unsplash.com/photo-1533158388470-9a56699990c6?auto=format&fit=crop&q=80&w=755",
        title: "Blue Waves",
        cols: 2,
        rows: 1,
    },
    {
        id: 5,
        img: "https://images.unsplash.com/photo-1580136579585-48a5311ee2f7?auto=format&fit=crop&q=80&w=1104",
        title: "Purple Dreams",
        cols: 2,
        rows: 2,
    },
    {
        id: 6,
        img: "https://images.unsplash.com/photo-1533158388470-9a56699990c6?auto=format&fit=crop&q=80&w=755",
        title: "Artistic Vision",
        cols: 1,
        rows: 1,
    },
];

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
    const user = useAuthStore((state) => state.user);
    const feed = useFeed((state) => state.feed);
    const selectedPost = useFeed((state) => state.selectedPost);
    const selectPost = useFeed((state) => state.selectPost);
    const token = useAuthStore((state) => state.token);

    const fetchPortfolio = useFeed((state) => state.fetchPortfolio);
    const fetchLikedPosts = useFeed((state) => state.fetchLikedPosts);
    const fetchSavedPosts = useFeed((state) => state.fetchSavedPosts);
    useEffect(() => {
        switch (activeTab) {
            case "portfolio":
                fetchPortfolio(token, 1, 20);
                break;
            case "liked":
                fetchLikedPosts(token, 1, 20);
                break;
            case "guardados":
                fetchSavedPosts(token, 1, 20);
                break;
        }
    }, [activeTab]);

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

                        <h1 className="profile-username">{user.userName}</h1>
                        <p className="profile-handle">@{user.userName}</p>

                        <p className="profile-description">
                            {user.extra.description}
                        </p>

                        <div className="profile-stats">
                            <div className="stat-item">
                                <span className="stat-label">Seguidores</span>
                                <span className="stat-value">
                                    {user.extra.followers}
                                </span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Me gusta</span>
                                <span className="stat-value">
                                    {user.extra.LikePost}
                                </span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Siguiendo</span>
                                <span className="stat-value">
                                    {user.extra.following}
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
                            cols={3}
                            rowHeight={200}
                        >
                            {feed.map((item) => {
                                const rows = 2
                                const cols = 1
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

import { useProfileStore } from "../../../store/profileStore";

export const ProfilePopOver = () => {

    const userData = useProfileStore((state) => state.userData)
    
    return (
        <div className="profile-popover">
            <div className="profile-popover-banner">
                <img src="/fondo perfil.png" alt="Banner" />
            </div>
            {/* Aca seria ver como se le haria la logica de followers y demas */}
            <div className="profile-popover-content">
                <h3 className="profile-popover-name">{userData.userName}</h3>
                <p className="profile-popover-handle">@{userData.userName}</p>
                <div className="profile-popover-stats">
                    <div className="stat">
                        <span className="stat-label">Seguidores</span>
                        <span className="stat-value">{userData.extra.followers}</span>
                    </div>
                    <div className="stat">
                        {/* Imposible que salga esto por el momento */}
                        <span className="stat-label">Me gusta</span>
                        <span className="stat-value">{userData.extra.totalLikesReceived}</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Siguiendo</span>
                        <span className="stat-value">{userData.extra.following}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

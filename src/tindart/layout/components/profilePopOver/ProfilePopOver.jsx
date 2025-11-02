import { useProfileStore } from "../../../../Auth/store/authStore";

export const ProfilePopOver = () => {

    const userProfileData = useProfileStore((state) => state.userProfileData)
    
    return (
        <div className="profile-popover">
            <div className="profile-popover-banner">
                <img src="/fondo perfil.png" alt="Banner" />
            </div>
            {/* Aca seria ver como se le haria la logica de followers y demas */}
            <div className="profile-popover-content">
                <h3 className="profile-popover-name">{userProfileData.userName}</h3>
                <p className="profile-popover-handle">@{userProfileData.userName}</p>
                <div className="profile-popover-stats">
                    <div className="stat">
                        <span className="stat-label">Seguidores</span>
                        <span className="stat-value">{userProfileData.extra.followers}</span>
                    </div>
                    <div className="stat">
                        {/* Imposible que salga esto por el momento */}
                        <span className="stat-label">Me gusta</span>
                        <span className="stat-value">{userProfileData.extra.totalLikesReceived}</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Siguiendo</span>
                        <span className="stat-value">{userProfileData.extra.following}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

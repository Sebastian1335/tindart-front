import { useAuthStore } from "../../../../Auth/store/authStore";

export const ProfilePopOver = () => {

    const user = useAuthStore((state) => state.user)
    
    return (
        <div className="profile-popover">
            <div className="profile-popover-banner">
                <img src="/fondo perfil.png" alt="Banner" />
            </div>
            {/* Aca seria ver como se le haria la logica de followers y demas */}
            <div className="profile-popover-content">
                <h3 className="profile-popover-name">{user.userName}</h3>
                <p className="profile-popover-handle">@{user.userName}</p>
                <div className="profile-popover-stats">
                    <div className="stat">
                        <span className="stat-label">Seguidores</span>
                        <span className="stat-value">8345</span>
                    </div>
                    <div className="stat">
                        {/* Imposible que salga esto por el momento */}
                        <span className="stat-label">Me gusta</span>
                        <span className="stat-value">8345k</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Siguiendo</span>
                        <span className="stat-value">2345</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

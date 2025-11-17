import { useState, useRef } from "react";
import {useProfileStore } from "../../../Auth/store/authStore";
import "./EditProfileModal.css";
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export function EditProfileModal({ isOpen, onClose, userProfileData }) {
    const [formData, setFormData] = useState({
        userName: userProfileData?.userName || "",
        description: userProfileData?.extra?.description || "",
        bannerImage: userProfileData?.extra?.bannerImage || "/icono.png",
        profileImage: userProfileData?.profileImage || "/icono.png",
    });

    const bannerInputRef = useRef(null);
    const avatarInputRef = useRef(null);
    const updateProfile = useProfileStore((state) => state.updateProfile);

    if (!isOpen) return null;

    const handleBannerUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, bannerImage: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profileImage: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = async () => {
        try {
            await updateProfile({
                userName: formData.userName,
                extra: {
                    ...userProfileData.extra,
                    description: formData.description,
                    bannerImage: formData.bannerImage,
                },
                profileImage: formData.profileImage,
            });
            onClose();
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
        }
    };

    return (
        <div className="edit-profile-overlay" onClick={onClose}>
            <div className="edit-profile-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <button className="close-btn" onClick={onClose}>
                        <CloseIcon />
                    </button>
                    <h2 className="modal-title">Editar Perfil</h2>
                    <button className="save-btn" onClick={handleSubmit}>
                        Guardar
                    </button>
                </div>

                {/* Banner Section */}
                <div className="banner-section">
                    <img 
                        src={formData.bannerImage || "/placeholder.svg"} 
                        alt="Banner" 
                        className="banner-preview"
                    />
                    <button 
                        className="upload-banner-btn"
                        onClick={() => bannerInputRef.current?.click()}
                    >
                        <FileUploadIcon />
                    </button>
                    <input 
                        ref={bannerInputRef}
                        type="file" 
                        accept="image/*" 
                        onChange={handleBannerUpload}
                        style={{ display: "none" }}
                    />
                </div>

                {/* Avatar Section */}
                <div className="avatar-section">
                    <div className="avatar-wrapper">
                        <img 
                            src={formData.profileImage || "/placeholder.svg"} 
                            alt="Profile" 
                            className="avatar-preview"
                        />
                        <button 
                            className="upload-avatar-btn"
                            onClick={() => avatarInputRef.current?.click()}
                        >
                            <FileUploadIcon />
                        </button>
                    </div>
                    
                    <input 
                        ref={avatarInputRef}
                        type="file" 
                        accept="image/*" 
                        onChange={handleAvatarUpload}
                        style={{ display: "none" }}
                    />
                </div>

                {/* Form Section */}
                <div className="form-section">
                    <div className="form-field">
                        <label className="field-label">Nombre</label>
                        <input 
                            type="text"
                            className="field-input"
                            value={formData.userName}
                            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                            placeholder="Tu nombre de usuario"
                        />
                    </div>

                    <div className="form-field">
                        <label className="field-label">Biografía</label>
                        <textarea 
                            className="field-textarea"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Escribe algo sobre ti..."
                            rows="4"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

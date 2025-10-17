import React from 'react'
import { useFeed } from '../../store/feedStore';
import { Box, Modal } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";


export const ImageModal = () => {
    
    const image = useFeed((state) => state.image);
    const seeImage = useFeed((state) => state.seeImage);
    const selectedPost = useFeed((state) => state.selectedPost);
    
    return (
        <Modal open={image} onClose={seeImage}>
            <Box className="image-modal">
                <button className="close-button" onClick={seeImage}>
                    <CloseIcon />
                </button>
                <img
                    src={selectedPost?.image || "/placeholder.svg"}
                    alt={selectedPost?.title}
                    className="image-modal-img"
                    style={{ width: "100%", height: "auto" }}
                />
            </Box>
        </Modal>
    )
}

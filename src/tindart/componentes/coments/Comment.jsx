import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RepeatIcon from "@mui/icons-material/Repeat";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";


export const Comment = ({comment, index}) => {
    return (
        <div key={index} className="comment-card">
            <div className="comment-header">
                <img
                    src={comment.avatar || "/placeholder.svg"}
                    alt={comment.username}
                    className="comment-avatar"
                />
                <span className="comment-username">{comment.username}</span>
            </div>
            <p className="comment-text">{comment.content}</p>
            <div className="comment-actions">
                <button
                    className={`comment-action-button ${null ? "active" : ""}`}
                    // onClick={() => handleCommentLike(index)}
                >
                    <FavoriteIcon />
                </button>
                <button className="comment-action-button">
                    <RepeatIcon />
                </button>
                <button
                    className={`comment-action-button ${null ? "active" : ""}`}
                    // onClick={() => handleCommentBookmark(index)}
                >
                    <BookmarkIcon />
                </button>
                <button className="comment-action-button">
                    <ShareIcon />
                </button>
            </div>
        </div>
    );
};

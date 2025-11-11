import { ImageList, ImageListItem } from "@mui/material";
import "./Feed.css";

import { useFeed } from "../../store/feedStore";
import { DetailModal } from "../../componentes/detailModal/detailModal";
import { useEffect } from "react";

function srcset(image, size, rows = 1, cols = 1) {
    return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };

}

export const Feed = () => {
    const feed = useFeed((state) => state.feed);
    const selectedPost = useFeed((state) => state.selectedPost);
    const selectPost = useFeed((state) => state.selectPost);
    const fetchFeed = useFeed((state) => state.fetchFeed);
    useEffect(() => {
        fetchFeed(1, 20);
    }, []);

    return (
        <>
            <ImageList
                sx={{
                    width: "100%",
                    height: "95%",
                    overflowY: "auto",
                    cursor: "pointer",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
                cols={4}
                rowHeight={200}
                variant="quilted"
            >
                {feed.map((item, index) => {
                    // crea variedad de tamaños visuales
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
                                "&:hover": { transform: "scale(1.03)" },
                            }}
                        >
                            <img
                                {...srcset(item.image, 200, rows, cols)}
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
        </>
    );
};

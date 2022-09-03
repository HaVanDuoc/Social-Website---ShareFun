import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import "./Posts.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { format } from 'timeago.js';
import Avatar from '@mui/material/Avatar';
import { Box } from "@mui/material";

const Posts = ({ post }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    const PostHeader = () => (
        <div className="post__header">
            <Link to={"/profile/" + user.username}>
                <div className="post__poster">
                    <Box display="flex" justifyContent="center" alignContent="center">
                        <Avatar src={user ? PF + user.avatar : PF + "images/noUser.png"} sx={{ width: 40, height: 40 }} />
                    </Box>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "0 10px"
                        }}
                    >
                        <div className="post__username">
                            {user.firstname + " " + user.lastname}
                        </div>
                        <div className="post__date">
                            {format(post.createdAt)}
                        </div>
                    </div>
                </div>
            </Link>
            <div className="post__following">Theo Dõi</div>
        </div>
    )

    const PostBody = () => (
        <div className="post__body">
            <div className="post__title">{post.title}</div>
            <div className="post__content">
                <div>{post.desc}</div>
                <div>
                    <img src={PF + post.img} alt="" />
                </div>
            </div>
            <div className="post__topic">{post.tag}</div>
        </div>
    )

    const PostFooter = () => {
        const [favourite, setFavourite] = useState(post.favourites.length);
        const [isFavourite, setIsFavourite] = useState(false);
        const [comment, setComment] = useState(post.comments.length)
        const [share, setShare] = useState(post.shares.length)
        const [view, setView] = useState(post.views.length)

        const handleFavourite = () => {
            setFavourite(
                isFavourite ? favourite - 1 : favourite + 1
            );
            setIsFavourite(!isFavourite);
        }

        return (
            <div className="post__footer">
                <div className="showInteractive">
                    <div className="like" style={favourite > 0 ? { display: "flex" } : { display: "none" }} >
                        <i className="favoriteIcon">
                            <FavoriteIcon />
                        </i>
                        <span>{favourite}</span>
                    </div>

                    <div className="comment" style={comment > 0 ? { display: "flex" } : { display: "none" }}>
                        <i className="commentIcon">
                            <ChatBubbleOutlineIcon />
                        </i>
                        <span>{comment}</span>
                    </div>

                    <div className="share" style={share > 0 ? { display: "flex" } : { display: "none" }}>
                        <i className="shareIcon">
                            <ReplyIcon />
                        </i>
                        <span> chia sẻ</span>
                    </div>

                    <div className="view">
                        <i className="viewIcon">
                            <VisibilityIcon />
                        </i>
                        <span>{view}</span>
                    </div>
                </div>

                <div className="postInteraction">
                    <div className="like" onClick={handleFavourite}>
                        <i className="favoriteIcon">
                            <FavoriteIcon />
                        </i>
                        <span>Yêu thích</span>
                    </div>
                    <div className="comment">
                        <i className="commentIcon">
                            <ChatBubbleOutlineIcon />
                        </i>
                        <span>Bình luận</span>
                    </div>
                    <div className="share">
                        <i className="shareIcon">
                            <ReplyIcon />
                        </i>
                        <span>Chia sẻ</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="hvdPosts">
            <div className="postWrapper">
                <div id="post">
                    <PostHeader />
                    <PostBody />
                    <PostFooter />
                </div>
            </div>
        </div>
    );
};

export default Posts;

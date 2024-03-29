import React from 'react';
import './CreatePost.scss';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PhotoIcon from '@mui/icons-material/Photo';
import MoodIcon from '@mui/icons-material/Mood';
import { Avatar, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { OpenModalLogin } from '../../../redux/actions/ModalAction';
import { FormLogin } from '../../../redux/actions/SignInOutAction';
import { selectorCurrentUser } from '../../../redux/reducers/AuthReducer';

const CreatePost = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch();

    // fetch user logged
    const user = useSelector(selectorCurrentUser);

    const handleClick = (e) => {
        e.preventDefault();

        if (!user) {
            dispatch(FormLogin());
            dispatch(OpenModalLogin());
        }
    };

    return (
        <div className="hvdCreatePost">
            <div className="createPostWrapper">
                <div className="childTop">
                    <Box
                        onClick={handleClick}
                        sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
                    >
                        <Avatar
                            src={user ? PF + user.user.avatar : PF + 'images/noUser.png'}
                            sx={{ width: 40, height: 40 }}
                        ></Avatar>
                    </Box>
                    <input
                        type="text"
                        placeholder={user ? `Bạn đang nghĩ gì thế ${user.user.username}?` : 'Bạn đang nghĩ gì thế?'}
                        onClick={handleClick}
                    />
                </div>
                <div className="childBottom">
                    <div className="item liveVideo" onClick={handleClick}>
                        <i>
                            <VideoCameraFrontIcon />
                        </i>
                        <span>Video trực tiếp</span>
                    </div>
                    <div className="item photo" onClick={handleClick}>
                        <i>
                            <PhotoIcon />
                        </i>
                        <span>Ảnh/video</span>
                    </div>
                    <div className="item emotion" onClick={handleClick}>
                        <i>
                            <MoodIcon />
                        </i>
                        <span>Cảm xúc/hoạt động</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;

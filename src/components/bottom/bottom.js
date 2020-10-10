import React from "react";
import './style.css';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TimelineIcon from '@material-ui/icons/Timeline';
import ReceiptIcon from '@material-ui/icons/Receipt';

const ITEM_HEIGHT = 48;
function Bottom() {
    const [anchorEl_, setAnchorEl_] = React.useState(null);

    const open_ = Boolean(anchorEl_);

    const handleClick_ = (event) => {
        setAnchorEl_(event.currentTarget);
    };

    const handleClose_ = () => {
        setAnchorEl_(null);
    };

    return (
        <div className="BottomComponent">
            Made by ❤ in Ronika
        </div>
    )
}

export default Bottom;

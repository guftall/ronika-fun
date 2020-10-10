import React, { useContext, useState } from "react";
import './style.css';
import Fab from '@material-ui/core/Fab';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Header(props) {
    const [openDialog, setOpenDialog] = useState(false);

    const openModal = () => {
        setOpenDialog(true);
    }
    const closeModal = () => {
        setOpenDialog(false);
    }
    return (
        <React.Fragment>
            <div className="Header-component">
                <p className="Header-titleHeaderPanel">رونیکا ف!ن</p>
                <Fab className="iconExit" size="small" onClick={openModal}>
                    <PowerSettingsNewIcon color="secondary" />
                </Fab>
            </div>
        </React.Fragment>

    )
}
export default Header;

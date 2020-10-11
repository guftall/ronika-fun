import React from "react";
import './style.css';
import Fab from '@material-ui/core/Fab';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

class Header extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="Header-component">
                    <p className="Header-titleHeaderPanel">رونیکا ف!ن</p>
                    <Fab className="iconExit" size="small">
                        <PowerSettingsNewIcon color="secondary" />
                    </Fab>
                </div>
            </React.Fragment>

        )
    }
}
export default Header;

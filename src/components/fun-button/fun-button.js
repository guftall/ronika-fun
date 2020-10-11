import { Button } from "@material-ui/core";
import React from "react";

class FunButton extends React.Component {

    render() {
        return (
            <button
                style={{
                    height: '60px',
                    width: '100px',
                    margin: 'auto auto',
                }}
                className="btn btn-info"
                onClick={() => this.props.onClick()}>
                {this.props.text}
            </button>
        )
    }
}

export default FunButton;

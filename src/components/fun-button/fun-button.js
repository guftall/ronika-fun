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
                disabled={this.props.disabled}
                className="btn btn-info"
                onClick={() => this.props.onClick()}>
                {this.props.text}
            </button>
        )
    }
}

export default FunButton;

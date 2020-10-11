import React from "react";

class FunColor extends React.Component {

    render() {
        return (
            <div style={{
                height: '100%',
                width: '100%',
                backgroundColor: this.props.color,
            }} />
        )
    }
}

export default FunColor;

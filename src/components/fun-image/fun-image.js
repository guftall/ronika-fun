import React from "react";
import config from '../../config'

class FunImage extends React.Component {

    render() {
        return (
            <img
                style={{
                    height: '100%',
                    width: 'auto',
                    margin: '0 auto'
                }}
                src={config.ApiUrl + this.props.url} />
        )
    }
}

export default FunImage;

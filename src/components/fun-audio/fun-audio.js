import React from "react";
import config from '../../config'

class FunAudio extends React.Component {

    render() {
        const elem = <audio
            style={{
                display: 'none'
            }}
            src={config.ApiUrl + this.props.url}
            autoPlay={true} />

        return (
            elem
        )
    }
}

export default FunAudio;

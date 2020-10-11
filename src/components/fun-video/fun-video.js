import React from "react";
import config from '../../config'

class FunVideo extends React.Component {

    componentDidMount() {
        this.video.play()
    }
    getVideo = elem => {
        this.video = elem
    }
    render() {
        return (
            <video
                style={{
                    height: '100%',
                    width: '100%',
                }}
                ref={this.getVideo}>
                <source
                    src={config.ApiUrl + this.props.url}
                    type="video/mp4" />
            </video>
        )
    }
}

export default FunVideo;

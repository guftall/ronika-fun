import React from "react";
import { FunTypes } from '../../utils'
import config from '../../config'

class FunGroup extends React.Component {

    componentDidMount() {
        if (this.video != undefined) {
            this.video.play()
        }
    }
    createImageElement(url) {
        return <img
            style={{
                height: '100%',
                width: 'auto',
                margin: '0 auto'
            }}
            src={config.ApiUrl + url} />
    }
    createAudioElement(url) {
        return <audio
            style={{
                display: 'none'
            }}
            src={config.ApiUrl + url}
            autoPlay={true} />
    }
    createColorElement(color) {
        return <div
            style={{
                height: '100%',
                width: '100%',
                backgroundColor: color,
            }} />
    }
    getVideo = elem => {
        this.video = elem
    }
    createVideoElement(url) {
        return <video
            style={{
                height: '100%',
                width: '100%',
            }}
            ref={this.getVideo}>
            <source
                src={config.ApiUrl + url}
                type="video/mp4" />
        </video>
    }
    render() {
        let elements = []
        for (let fun of this.props.fun.funs) {
            switch (fun.type) {
                case FunTypes.Image: {
                    var imageNode = this.createImageElement(fun.variables.url)
                    elements.push(imageNode)
                    break
                }
                case FunTypes.Sound: {
                    var soundNode = this.createAudioElement(fun.variables.url)
                    elements.push(soundNode)
                    break
                }
                case FunTypes.Color: {
                    var colorNode = this.createColorElement(fun.variables.color)
                    elements.push(colorNode)
                    break
                }
                case FunTypes.Video: {
                    var videoNode = this.createVideoElement(fun.variables.url)
                    elements.push(videoNode)
                    break
                }
                default: {
                    throw new Error('unsupported fun group element type')
                }
            }
        }
        return (
            elements
        )
    }
}

export default FunGroup;

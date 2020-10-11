import React from "react";
import './style.css';
import socketIOClient from "socket.io-client";

class DisplaySyncer extends React.Component {
    componentDidMount() {
        const socket = socketIOClient();
        socket.on("FromAPI", data => {
            console.lo('data', data)
        });
        socket.on('connect', () => {
            console.log('connected')
        })
    }
    render() {

        return (
            <div className="containerAll">

            </div>
        )
    }
}
export default DisplaySyncer;

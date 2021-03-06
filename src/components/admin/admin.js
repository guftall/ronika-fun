import React from 'react'
import socketIOClient from "socket.io-client";
import config from '../../config'
import AdminCommands from './adminCommands';

export default class AdminComponent extends React.Component {
    constructor() {
        super()

        this.onConnectedToBackend = this.onConnectedToBackend.bind(this)
        this.onUserConnected = this.onUserConnected.bind(this)

        this.restartTries = 0
        this.connectedUsers = []
    }
    componentDidMount() {

        this.command = new AdminCommands(socketIOClient(config.ApiUrl))
        this.command.setOnConnectListener(this.onConnectedToBackend)
        this.command.setOnUserConnectedListener(this.onUserConnected)
    }

    onConnectedToBackend() {
        this.command.sendInit()
    }
    onRestartClick() {
        if (this.restartTries >= 2) {
            console.log('restarting..')
            this.command.sendReload()
            this.restartTries = 0
            this.connectedUsers = []
        } else {
            ++this.restartTries
        }
    }
    onResumeClicked() {

        this.command.sendResume()
    }
    onUserConnected(data) {
        console.log('user connected', data)
        for (let user of this.connectedUsers) {
            if (user.id == data.id) {
                console.log('user already connected')
                return
            }
        }

        this.connectedUsers.push(data)
        this.command.sendResume()
        this.setState({})
    }
    onStartQuestionTable() {
        this.command.sendStartQuestionTable()
    }
    onOpenQuestions() {
        this.command.sendOpenQuestions()
    }
    onStartVideos() {
        this.command.sendStartVideos()
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <button className="btn btn-primary" onClick={() => this.command.sendStartParty()} >Start Party</button>
                    </div>
                    <div className="col-md-4">

                        <button className="btn btn-primary" onClick={() => this.onResumeClicked()} >Resume!</button>

                    </div>
                </div>
                <div className="row">

                    <button className="btn btn-primary" onClick={() => this.onStartQuestionTable()} >Question Table</button>
                    <button className="btn btn-primary" onClick={() => this.onOpenQuestions()} >Open Questions</button>

                </div>
                <div className="row">
                    {this.connectedUsers.map(user =>
                        (
                            <div className="col-md">{user.id}, {user.name}</div>
                        ))
                    }
                </div>
                <div className="row">
                    <button className="btn btn-info" onClick={() => this.onStartVideos()}>Start Videos</button>
                    <button className="btn btn-info" onClick={() => this.command.sendExplosion()}>Explosion</button>
                </div>
                <div className="row">
                    <button className="btn btn-danger" onClick={() => this.onRestartClick()}>Restart Everything!</button>
                </div>
            </div>
        )
    }
}
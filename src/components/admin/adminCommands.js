export default class AdminCommands {
    constructor(socket) {
        this.socket = socket
    }

    setOnConnectListener(cb) {
        this.socket.on('connect', cb)
    }
    setOnUserConnectedListener(cb) {
        this.socket.on('user-connected', cb)
    }
    sendReload() {
        this.send({
            type: 'reload'
        })
    }
    sendStartParty() {
        this.send({
            type: 'start-party'
        })
    }
    sendResume() {
        this.send({
            type: 'resume'
        })
    }
    sendInit() {
        this.send({
            type: 'init'
        })
    }
    sendStartQuestionTable() {
        this.send({
            type: 'fun',
            fun: 'start-question-table'
        })
    }
    sendOpenQuestions() {
        this.send({
            type: 'qt-open-question'
        })
    }
    sendStartVideos() {
        this.send({
            type: 'fun',
            fun: 'start-videos'
        })
    }
    sendExplosion() {
        this.send({
            type: 'fun',
            fun: 'explosion'
        })
    }
    send(data) {
        this.socket.emit('admin-command-32940rje', data)
    }
}
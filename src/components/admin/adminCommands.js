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
    send(data) {
        this.socket.emit('admin-command-32940rje', data)
    }
}
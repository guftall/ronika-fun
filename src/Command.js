import { CommandTypes, serverFunToOurFun } from './utils'

export class Command {

    constructor(object, socket) {
        this.object = object
        this.socket = socket

        this.type = this.object.t
    }

    parseCommandFun() {
        switch (this.type) {
            case CommandTypes.Fun: {
                // object.f.t = object.fun.type
                return serverFunToOurFun(this.object.f, this.socket)
            }
            default: {
                throw new Error('invalid fun type')
            }
        }
    }
}
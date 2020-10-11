import { FunTypes, serverFunToOurFun } from '../utils'

export class FunGroup {
    constructor(duration, funs) {
        this.type = FunTypes.Group
        this.duration = duration
        this.funs = funs
    }

    static deserialize(obj, socket) {
        if (obj.t !== FunTypes.Group) {
            throw new Error('try to deserialize not group fun')
        }

        const funs = []
        // fl = fun list
        for (let fun of obj.fl) {
            funs.push(serverFunToOurFun(fun, socket))
        }
        return new FunGroup(obj.d, funs)
    }
}
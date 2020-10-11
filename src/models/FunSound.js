import { FunTypes } from '../utils'

export class FunSound {
    constructor(duration, url) {
        this.type = FunTypes.Sound
        this.duration = duration
        this.variables = {
            url: url
        }
    }

    static deserialize(obj) {
        if (obj.t !== FunTypes.Sound) {
            throw new Error('try to deserialize not sound fun')
        }

        return new FunSound(obj.d, obj.v.u)
    }
}
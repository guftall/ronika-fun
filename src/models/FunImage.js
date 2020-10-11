import { FunTypes } from '../utils'
export class FunImage {
    constructor(duration, url) {
        this.type = FunTypes.Image
        this.duration = duration
        this.variables = {
            url: url
        }
    }

    static deserialize(obj) {
        if (obj.t !== FunTypes.Image) {
            throw new Error('try to deserialize not image fun')
        }

        return new FunImage(obj.d, obj.v.u)
    }
}
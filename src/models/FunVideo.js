import { FunTypes } from '../utils'

export class FunVideo {
    constructor(duration, url) {
        this.type = FunTypes.Video
        this.duration = duration
        this.variables = {
            url: url
        }
    }

    static deserialize(obj) {
        if (obj.t !== FunTypes.Video) {
            throw new Error('tried to deserialize not video fun')
        }

        return new FunVideo(obj.d, obj.v.u)
    }
}
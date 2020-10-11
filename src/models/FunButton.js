import { FunTypes } from '../utils'

export class FunButton {
    constructor(duration, text, id) {
        this.type = FunTypes.Button
        this.duration = duration
        this.onClickListeners = []
        this.variables = {
            text: text,
            id: id
        }
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        for (let callback of this.onClickListeners) {
            callback(this)
        }
    }

    addOnClickListener(cb) {
        this.onClickListeners.push(cb)
    }

    static deserialize(obj) {
        if (obj.t !== FunTypes.Button) {
            throw new Error('tried to deserialize not button fun')
        }
        return new FunButton(obj.d, obj.v.t, obj.v.i)
    }

    static serialize(funButton) {
        return JSON.stringify({
            t: funButton.type,
            d: funButton.duration,
            v: {
                t: funButton.variables.text,
                i: funButton.variables.id
            }
        })
    }
}
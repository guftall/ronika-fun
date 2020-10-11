import { FunButton } from './models/FunButton'
import { FunColor } from './models/FunColor'
import { FunImage } from './models/FunImage'
import { FunSound } from './models/FunSound'
import { FunVideo } from './models/FunVideo'
import { FunGroup } from './models/FunGroup'

export const CommandTypes = {
    ReloadPage: 'r',
    ResumeGenerator: 'g',
    Fun: 'f',
}

export const FunTypes = {
    Button: 'b',
    Color: 'c',
    Image: 'i',
    Sound: 's',
    Video: 'v',
    Group: 'g'
}

export function serverFunToOurFun(fun, socket) {

    switch (fun.t) {
        case FunTypes.Button: {

            const funBtn = FunButton.deserialize(fun)
            funBtn.addOnClickListener(() => {
                socket.emit('bc', { i: funBtn.variables.id })
            })
            return funBtn
        }
        case FunTypes.Color: {
            return FunColor.deserialize(fun)
        }
        case FunTypes.Image: {
            return FunImage.deserialize(fun)
        }
        case FunTypes.Group: {
            return FunGroup.deserialize(fun, socket)
        }
        case FunTypes.Sound: {
            return FunSound.deserialize(fun)
        }
        case FunTypes.Video: {
            return FunVideo.deserialize(fun)
        }
        default: {
            throw new Error('command error: invalid fun type')
        }
    }
}

export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

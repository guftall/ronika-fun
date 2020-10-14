import { FunButton } from './models/FunButton'
import { FunColor } from './models/FunColor'
import { FunImage } from './models/FunImage'
import { FunSound } from './models/FunSound'
import { FunVideo } from './models/FunVideo'
import { FunGroup } from './models/FunGroup'
import { QuestionTable } from './models/QuestionTable'

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
    Group: 'g',
    QuestionTable: 'q'
}

export const ButtonAction = {
    Default: 'd',
    Jigh: 'j',
}

export const QuestionTableEvent = 'qte'
export const QuestionTableAnswerEvent = 'qtae'

export const QuestionTableEventTypes = {
    OpenQuestion: 'o',
    CloseQuestion: 'c'
}

export const QuestionTableAnswerTypes = {
    Button: 'b',
    Text: 't'
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
        case FunTypes.QuestionTable: {
            var questionTable = QuestionTable.deserialize(fun)
            socket.on(QuestionTableEvent, obj => {

                if (obj.t === QuestionTableEventTypes.OpenQuestion) {
                    let openQuestion = {
                        blinkDuration: obj.bd,
                        questionId: obj.qid,
                        answerType: obj.at,
                    }
                    if (openQuestion.answerType == QuestionTableAnswerTypes.Button) {
                        openQuestion.buttons = []
                        for (let button of obj.b) {
                            openQuestion.buttons.push({
                                value: button.v,
                                action: button.a
                            })
                        }
                    }
                    questionTable.onOpenQuestion(openQuestion)
                } else if (obj.t == QuestionTableEventTypes.CloseQuestion) {
                    let closeQuestion = {
                        questionId: obj.qid,
                        answer: obj.a
                    }

                    questionTable.onCloseQuestion(closeQuestion)
                } else {
                    throw new Error('invalid question table event type')
                }
            })
            questionTable.setOnAnswerListener(data => {
                socket.emit(QuestionTableAnswerEvent, {
                    qid: data.questionId,
                    a: data.answer
                })
            })
            return questionTable
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

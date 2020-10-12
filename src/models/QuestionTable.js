import { FunTypes } from '../utils'

export class QuestionTable {

    constructor(duration, rows, myUserId) {
        this.type = FunTypes.QuestionTable
        this.duration = duration
        this.variables = {
            rows: rows,
            myUserId: myUserId
        }
        this.onAnswer = undefined
    }
    setOnOpenQuestionListener(cb) {
        this.onOpenQuestionListener = cb
    }
    setOnCloseQuestionListener(cb) {
        this.onCloseQuestionListener = cb
    }
    onOpenQuestion(obj) {

        if (this.onOpenQuestionListener != null) {
            this.onOpenQuestionListener(obj)
        }
    }
    onCloseQuestion(obj) {

        if (this.onCloseQuestionListener != undefined) {
            this.onCloseQuestionListener(obj)
        }
    }
    setOnAnswerListener(cb) {
        this.onAnswer = cb
    }
    static deserialize(obj) {
        if (!obj.t === FunTypes.QuestionTable) {
            throw new Error('deserialize not questionTable fun')
        }
        const rows = []
        for (let row of obj.v.r) {
            rows.push({
                answer: undefined,
                userId: row.uid,
                question: row.q,
                questionId: row.qid
            })
        }
        return new QuestionTable(obj.d, rows, obj.v.muid)
    }
}
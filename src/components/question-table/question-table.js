import React from 'react'
import config from '../../config'
import { Question } from './question'
import './style.css'

class FunQuestionTable extends React.Component {

    constructor(props) {
        super()
        const questionList = []
        for (let q of props.data.variables.rows) {
            q.showQuestionMark = true
            questionList.push(q)
        }
        this.state = {
            questionTable: {
                myUserId: props.data.variables.myUserId,
                rows: questionList
            }
        }
        props.data.setOnOpenQuestionListener(this.onOpenQuestion.bind(this))
        props.data.setOnCloseQuestionListener(this.onCloseQuestion.bind(this))
        this.onQuestionAnswered = this.onQuestionAnswered.bind(this)
        this.currentOpenQuestion = undefined
        this.currentQuestion = undefined
        this.openQuestionQueue = []
    }
    onOpenQuestion(obj) {
        this.openQuestionQueue.push(obj)
        this.handleNextQuestionQueue()
    }
    onCloseQuestion(obj) {
        console.log('onCloseQuestion', obj)
        if (this.currentQuestion.questionId != obj.questionId) {
            throw new Error('tried to close question that is not currently open')
        }

        this.currentQuestion.answer = obj.answer
        this.currentQuestion = undefined
        this.currentOpenQuestion = undefined
        this.setState({})

        if (this.openQuestionQueue.length != 0) {
            this.handleNextQuestionQueue()
        }
    }
    onQuestionAnswered(questionId, answer) {
        this.props.data.onAnswer({
            questionId: questionId,
            answer: answer
        })
    }
    handleNextQuestionQueue() {

        if (this.openQuestionQueue.length == 0) {
            console.log('There is no more question in queue')
            return
        }

        if (this.currentQuestion != undefined) {
            console.log('waiting for current question to finish')
            return
        }

        const obj = this.openQuestionQueue.splice(0, 1)[0]

        for (let q of this.state.questionTable.rows) {
            if (q.questionId === obj.questionId) {
                this.currentQuestion = q

                let timerId1 = setInterval(() => {
                    q.showQuestionMark = !q.showQuestionMark
                    this.setState({})
                }, 100)

                let timerId2 = setTimeout(() => {

                    clearInterval(timerId1)
                    clearTimeout(timerId2)

                    this.currentOpenQuestion = obj
                    this.setState({})

                }, 1500)
                break;
            }
        }
    }
    render() {

        let questionElem
        if (this.currentOpenQuestion != undefined) {
            questionElem = <Question onAnswer={this.onQuestionAnswered} question={this.currentQuestion} openQuestion={this.currentOpenQuestion} />
        }
        return (
            <div className="container">
                {questionElem == undefined ?
                    (
                        <div className="row">
                            {this.state.questionTable.rows.map((row, i) => (
                                <div key={`qt-${i}`} className="col-md-3 qt-cell rounded alert alert-secondary">
                                    {row.answer == undefined ?
                                        row.showQuestionMark === true ? (
                                            <img
                                                src={config.ApiUrl + '/assets/img/qmark.png'}
                                                style={{ maxHeight: '100%', width: '100px', margin: '0 auto' }} />
                                        ) : (
                                                <div></div>
                                            ) : (
                                            <div>{row.answer}</div>
                                        )}

                                </div>
                            ))}
                        </div>
                    ) :
                    (
                        questionElem
                    )
                }

            </div>
        )
    }
}

export default FunQuestionTable
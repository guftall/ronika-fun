import React from 'react'
import { QuestionTableAnswerTypes } from '../../utils'

export class Question extends React.Component {
    constructor(props) {
        super()
        this.question = props.question
        this.openQuestion = props.openQuestion
        if (props.onAnswer == undefined) {
            throw new Error('onAnswer callback is undefined')
        }
    }
    onButtonClicked(value) {
        this.props.onAnswer(this.question.questionId, value)
    }
    render() {
        let elems = []
        let i = 0;
        if (this.openQuestion.answerType === QuestionTableAnswerTypes.Button) {

            for (let b of this.openQuestion.buttons) {
                let btn = <div key={`qbtn-${i++}`} style={{ marginTop: '60px' }} className="col-md-4">
                    <button
                        className="btn btn-primary"
                        onClick={() => this.onButtonClicked(b.value)}
                        style={{ height: '80px', width: '120px', fontSize: '25px' }}>{b.value}</button>
                </div>
                elems.push(btn)
            }
        } else if (this.openQuestion.answerType === QuestionTableAnswerTypes.Text) {
            let txtInput = <input type="text" key={`qtxt-${i++}`} />
            elems.push(txtInput)
        } else {
            throw new Error('invalid answer type: ' + this.openQuestion.answerType)
        }
        return (
            <div style={{ direction: 'rtl', textAlign: 'right' }}>
                <div className="row">
                    <h2>{this.question.question}</h2>
                </div>
                <div className="row">
                    {elems}
                </div>
            </div>
        )
    }
}
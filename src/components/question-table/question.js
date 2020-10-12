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
        this.state = {
            inputValue: ''
        }
        this.updateInputValue = this.updateInputValue.bind(this)
        this.onButtonClicked = this.onButtonClicked.bind(this)
    }
    onButtonClicked(value) {
        this.props.onAnswer(this.question.questionId, value)
    }
    updateInputValue(value) {
        this.setState({
            inputValue: value
        });
    }
    onSubmitButtonClicked() {
        this.props.onAnswer(this.question.questionId, this.state.inputValue)
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
            let txtInput =

                <div className="form-row" style={{ width: '100%' }} key="txt-inp">
                    <div className="form-group col-md-6" style={{ marginTop: '40px' }}>
                        <label htmlFor="txt-inp">بنویس</label>
                        <input type="text" value={this.state.inputValue} onChange={event => this.updateInputValue(event.target.value)} id="txt-inp" name="txt-inp" className="form-control" />
                    </div>
                    <div className="form-group col-md-2" style={{ marginTop: '40px' }}>
                        <label htmlFor="btn-submit" style={{ color: 'transparent', userSelect: 'none' }}>I</label>
                        <button name="btn-submit" onClick={() => this.onSubmitButtonClicked()} className="form-control btn btn-info">اوکی</button>
                    </div>
                </div>
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
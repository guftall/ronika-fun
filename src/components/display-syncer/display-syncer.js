import React from "react";
import './style.css';
import socketIOClient from "socket.io-client";
import { Command } from '../../models/Command'
import config from '../../config'
import { CommandTypes, FunTypes, QuestionTableEventTypes } from '../../utils'
import FunColor from "../fun-color/fun-color";
import FunButton from "../fun-button/fun-button";
import FunImage from "../fun-image/fun-image";
import FunGroup from "../fun-group/fun-group";
import FunVideo from "../fun-video/fun-video";
import FunQuestionTable from "../question-table/question-table";

const CommandEvent = 'c'

class DisplaySyncer extends React.Component {
    constructor() {
        super()

        this.funQueue = []
        this.currentExecuting = undefined

        this.onExecuteQueueFun = this.onExecuteQueueFun.bind(this)
        this.onFunExecutionFinished = this.onFunExecutionFinished.bind(this)
        this.onConnectedToBackend = this.onConnectedToBackend.bind(this)
        this.onFunReceived = this.onFunReceived.bind(this)
    }
    componentDidMount() {
        this.socket = socketIOClient(config.ApiUrl)

        this.socket.on('connect', this.onConnectedToBackend)
    }
    onConnectedToBackend() {

        this.socket.on(CommandEvent, msg => {
            var cmd = new Command(msg, this.socket)

            if (cmd.type === CommandTypes.ReloadPage) {

                window.location.reload()
            } else if (cmd.type === CommandTypes.ResumeGenerator) {

                this.resumeInfiniteFun()
            } else if (cmd.type === CommandTypes.Fun) {

                const fun = cmd.parseCommandFun()
                this.onFunReceived(fun)
            }
        })
    }
    resumeInfiniteFun() {

        if (this.currentExecuting === undefined || this.currentExecuting.fun.duration !== 0) {
            throw new Error('not paused on infinite fun')
        } else if (this.funQueue.length === 0) {
            console.log('resume called, but there is no fun to execute')
            return
        }

        this.onExecuteQueueFun()
    }
    onFunReceived(fun) {
        console.log(fun)
        this.pushFunToQueue(fun)
    }
    pushFunToQueue(fun) {
        this.funQueue.push({
            createdAt: new Date(),
            fun: fun
        })

        if (this.currentExecuting == undefined) {
            this.onExecuteQueueFun()
        }
    }
    onExecuteQueueFun() {
        if (this.funQueue.length == 0) {
            this.currentExecuting = undefined
            console.log('empty fun queue')
            return
        }

        const fun = this.funQueue.splice(0, 1)[0]
        fun.startedAt = new Date()
        this.currentExecuting = fun

        // if fun duration is zero next fun should start explicity
        if (fun.fun.duration === 0) {

        } else {
            this.timerId = setTimeout(() => {
                this.onFunExecutionFinished(fun)

            }, fun.fun.duration)
        }

        this.setState({
            fun: fun.fun
        })
    }
    onFunExecutionFinished(fun) {
        fun.finishedAt = new Date()
        this.onExecuteQueueFun()
    }
    createFunColor(fun) {
        return <FunColor color={fun.variables.color} />
    }
    createFunButton(fun) {
        return <FunButton text={fun.variables.text} onClick={fun.onClick} />
    }
    createFunImage(fun) {
        return <FunImage url={fun.variables.url} />
    }
    createFunGroup(fun) {
        return <FunGroup fun={fun} />
    }
    createFunVideo(fun) {
        return <FunVideo url={fun.variables.url} />
    }
    createQuestionTable(fun) {
        return <FunQuestionTable data={fun} />
    }
    getFun() {
        if (this.state == undefined || this.state.fun == undefined) {
            return
        }
        const fun = this.state.fun
        switch (fun.type) {
            case FunTypes.Color: {
                return this.createFunColor(fun)
            }
            case FunTypes.Button: {
                return this.createFunButton(fun)
            }
            case FunTypes.Image: {
                return this.createFunImage(fun)
            }
            case FunTypes.Group: {
                return this.createFunGroup(fun)
            }
            case FunTypes.Video: {
                return this.createFunVideo(fun)
            }
            case FunTypes.QuestionTable: {
                return this.createQuestionTable(fun)
            }
            default: {
                throw new Error('invalid fun type: ' + fun.type)
            }
        }
    }
    render() {

        const elem = this.getFun()
        return (
            <div className="containerAll h-100" style={{ display: 'flex' }}>
                {elem}
            </div>
        )
    }
}
export default DisplaySyncer;

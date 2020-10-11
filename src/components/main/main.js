import React from "react";
import './style.css';
import Header from "../header/header";
import ContentPage from "../contentpage/contentPage";
import Bottom from "../bottom/bottom";

class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.date.toLocaleTimeString()}</h1>
    }
    componentWillUnmount() {
        console.log('unmounted')
    }
}
class Goodbye extends React.Component {
    render() {
        return <h1>Goodbye</h1>
    }
}
class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            date: new Date(),
            hi: true
        }
    }
    componentDidMount() {
        this.timerId = setInterval(() => this.tick(), 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timerId)
    }
    tick() {
        this.setState((prevState, props) => {
            return {
                date: new Date(),
                hi: !prevState.hi
            }
        })
    }
    render() {
        return (
            <div className="mainContainer">
                <div className="sectionPanel">
                    <div className="sectionHeaderPanel">
                        <Header history={this.props.history} />
                    </div>
                    <div className="renderPagesSection">
                        <ContentPage history={this.props.history} />
                    </div>
                </div>
                <div className="sectionBottomPanel">
                    <Bottom history={this.props.history} />
                </div>
            </div>
        )
    }
}

export default Main;
import React from "react";
import './style.css';
import Header from "../header/header";
import ContentPage from "../contentpage/contentPage";
import Bottom from "../bottom/bottom";

class Main extends React.Component {
    render() {
        return (
            <div className="mainContainer">
                <div className="sectionPanel">
                    <div className="sectionHeaderPanel">
                        <Header history={this.props.history} />
                    </div>
                    <div className="renderPagesSection container-fluid">
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
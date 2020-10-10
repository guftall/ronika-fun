import React from "react";
import './style.css';
import Header from "../header/header";
import ContentPage from "../contentpage/contentPage";
import Bottom from "../bottom/bottom";

function Main(props) {
    return (
        <div className="mainContainer">
            <div className="sectionPanel">
                <div className="sectionHeaderPanel">
                    <Header history={props.history} />
                </div>
                <div className="renderPagesSection">
                    <ContentPage history={props.history} />
                </div>
            </div>
            <div className="sectionBottomPanel">
                <Bottom history={props.history} />
            </div>
        </div>
    )
}

export default Main;
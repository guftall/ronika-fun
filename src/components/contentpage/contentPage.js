import React from "react";
import './style.css';
import DisplaySyncer from "../display-syncer/display-syncer";
import { Switch, Route } from "react-router-dom";

function ContentPage() {
    return (
        <div className="sectionRenderPage">
            <Switch>
                <Route path="/" component={DisplaySyncer} />
            </Switch>
        </div>
    )
}
export default ContentPage;

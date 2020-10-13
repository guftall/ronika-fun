import React from "react";
import './style.css';
import DisplaySyncer from "../display-syncer/display-syncer";
import { Switch, Route } from "react-router-dom";
import AdminComponent from '../admin/admin'

function ContentPage() {
    return (
        <div className="sectionRenderPage">
            <Switch>
                <Route exact path="/" component={DisplaySyncer} />
                <Route path="/admin-oiuewrjn4238ij" component={AdminComponent} />
            </Switch>
        </div>
    )
}
export default ContentPage;

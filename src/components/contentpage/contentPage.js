import React, { useEffect, useState } from "react";
import './style.css';
import Tickets from "../tickets/tickets";
import { Switch, Route } from "react-router-dom";
// let flag ;
function ContentPage(props) {

    const checkValidToken = () => {

    }
    useEffect(() => {
        checkValidToken();
    }, [])
    return (
        <div className="sectionRenderPage">
            <Switch>
                <Route path="/" component={Tickets} />
            </Switch>
        </div>
    )
}
export default ContentPage;

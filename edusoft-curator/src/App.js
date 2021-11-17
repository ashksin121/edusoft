import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import "./App.css";
import { app } from "./firebase";
import Dashboard from "./features/dashboard/Dashboard";
import Session from "./features/session/Session";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/courses" component={Dashboard} />
                    <Route exact path="/session" component={Session} />
                    <Redirect to={"/courses"} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;

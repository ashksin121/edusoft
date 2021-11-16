import React from "react";

import "./App.css";
import Dashboard from "./features/dashboard/Dashboard";
import Header from "./utils/header/Header";

function App() {
    return (
        <div className="App">
            <Header />
            <Dashboard />
        </div>
    );
}

export default App;

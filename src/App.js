import React from "react";
import { Calculator } from "./components/containers/Calculator";
import "./styles/App.css";

export default function App() {
    return (
        <div className="main-container">
            <h1 className="head-text">
                spli
                <br />
                tter
            </h1>

            <Calculator />
        </div>
    );
}

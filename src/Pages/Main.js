import React from "react";
import Graph from "../components/Graph/Graph";
import Header from "../components/header/Header";
import Toolbar from "../components/Toolbar/Toolbar";
import Footer from "../components/footer/Footer";
import Modal from "../components/Modal/Modal";

const Main = () => {
    return (
        <div className="container">
            <Modal />
            <Header />
            <Graph />
            <Toolbar />
            <Footer />
        </div>
    );
};

export default Main;

import React, { Component } from 'react';
import Navbar from "react-bootstrap/Navbar";

class AppBar extends Component {
    render() {
        return <Navbar bg={"dark"} sticky={"top"}  variant={"dark"}>
            <Navbar.Brand >LikeItIsButItDo</Navbar.Brand>
        </Navbar>
    }
};

export default AppBar;
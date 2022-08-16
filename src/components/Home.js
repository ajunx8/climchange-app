import React, { Component } from "react";

class Home extends Component {

    render() {
        return (
            <div>
                <Navbar />
                <h1>Climate Change Blog</h1>
                <Blog />
                <nav className="location-api">
                    <Location />
                </nav>
            </div>
        )
    }
}
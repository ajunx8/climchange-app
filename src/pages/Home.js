import React, { Component } from "react";
import Header from '../components/Header';
import Blogs from './Blogs';

class Home extends Component {

    render() {
        return (
            <div>
                <Header />
                <h1>Climate Change Blog</h1>
                <Blogs />
            </div>
        );
    };
}

export default Home;
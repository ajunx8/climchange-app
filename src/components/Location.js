import React, { Component } from "react";

class Location extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    render() {
        return(
            <div>
                <form>
                    <input type="text" required placeholder="Location" />
                    <input type="submit" value="Search" />
                </form>
            </div>
        )
    }


}

export default Location;
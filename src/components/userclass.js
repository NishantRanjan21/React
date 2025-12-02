import React from "react";

class UserClass extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
    return (
        <div>
            <h1>Name: {this.props.name}</h1>
            <h2>location: Patna</h2>
        </div>
    );
}
}

export default UserClass;

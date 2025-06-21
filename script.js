import React from "react";
import ReactDOM from "react-dom/client";

// const header = React.createElement("div", { id: "parent" }, [
//   React.createElement("div", { id: "child" }, [
//     React.createElement("h1", {}, "This is React"),
//     React.createElement("h2", {}, "I'm h1 tag"),
// ]),
//   React.createElement("div", { id: "child2" }, [
//     React.createElement("h1", {}, "I'm h1 tag"),
//     React.createElement("h2", {}, "I'm h1 tag"),
// ]),
// ]);

//React functional component
const Title = () => (
    <h1 className="head" tabIndex="5">
        React
    </h1>
)
//component composition of Title
const HeadingComponent = () => (
    <div  id="container">
        <Title/>
        <h1 className="header">this is functional component</h1>
    </div>
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent/>);

const jsxHeading = <h1 id="header">React using JSX</h1>;
// root.render(jsxHeading);
// console.log(jsxHeading);

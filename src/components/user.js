const User = (props) => {
    const {name} = props;
    return (
        <div>
            <h1>Name: {name}</h1>
            <h2>location: Patna</h2>
        </div>
    );
};

export default User;
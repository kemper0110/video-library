import useUser from "../hooks/useUser.tsx";

const TestMain = () => {
    const user = useUser(state => state.user)
    console.log(user)
    return (
        <div>
            <div>{user.username}</div>
            <div>{user.role}</div>
            <div>{user.id}</div>
        </div>
    );
};

export default TestMain;
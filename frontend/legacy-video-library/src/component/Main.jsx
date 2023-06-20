

const Main = ({children}) => {
    return (
        <main
            style={{minWidth: "60rem", margin: "0 20rem", backgroundColor: "white", display: "inline-block", minHeight: 900, maxWidth: "70rem"}}
            className="shadow p-1">
            {children}
        </main>
    )
}

export default Main;
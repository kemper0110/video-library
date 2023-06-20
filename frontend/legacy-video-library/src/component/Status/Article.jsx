import Status from "./Status";

const Article = ({name, videos: statusvideos}) => {

    return (
        <>
            <h1 className="m-1 p-1">{name}</h1>
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Название</th>
                    <th>Оценка</th>
                    <th>Эпизоды</th>
                    <th>Тип</th>
                </tr>
                </thead>
                <tbody>
                {
                    statusvideos.map(
                        (videostatus, idx) => <Status videostatus={videostatus} idx={idx} key={videostatus.video.id}/>
                    )
                }
                </tbody>
            </table>
        </>
    );
}

export default Article;
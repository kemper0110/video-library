import {GenreModel} from "../../models/genre.ts";
import useGenresQuery from "../queries/useGenresQuery.tsx";

const Genre = ({genre, active, toggle}: { genre: GenreModel, active: boolean, toggle: (id: number) => void }) => {
    const color = active ? ' bg-blue-200 border-blue-500 border-solid' : ' bg-gray-200 border-gray-300 border-solid'
    return (
        <button
            className={'transition duration-500 rounded-xl px-3 py-1.5 font-medium border-2 flex items-center ' + color}
            onClick={() => toggle(genre.id)}
            type='button'
        >
            <div className={'transition-all duration-200 leading-none ' + (!active ? 'text-[0px]' : 'text-2xl me-1.5')}>
                +
            </div>
            <div className=''>
                {genre.name}
            </div>
        </button>
    )
}

const GenreSelector = ({setValues, values}: { values: number[], setValues: (checked: number[]) => void }) => {
    const {data, isLoading, isError} = useGenresQuery()
    const toggle = (id: number) => {
        const newChecked = values.indexOf(id) === -1 ?
            [...values, id] : values.filter(c => c !== id)
        setValues(newChecked)
    }
    return (
        <div className=''>
            <div className='text-lg font-medium text-gray-700'>Выберите подходящие жанры</div>
            <div className='font-light text-gray-700'>Выбраны: {values.length}</div>
            <span className='mt-4 flex flex-wrap gap-3'>
                    {
                        isLoading ?
                            <>Загрузка жанров</> :
                            isError ? <>Ошибка загрузки жанров</> :
                                data.map(g => <Genre key={g.id} genre={g} active={values.indexOf(g.id) !== -1}
                                                     toggle={toggle}/>)
                    }
            </span>
            <button
                type='button'
                className={'mt-3 px-3.5 py-2 bg-red-200 text-red-600 font-semibold rounded-lg transition-colors' +
                    ' hover:bg-red-300 border-2 border-solid border-red-400 hover:border-red-600 '}
                onClick={() => setValues([])}
            >Сбросить
            </button>
        </div>
    );
};

export default GenreSelector;
import {useState} from "react";
import useEpisodesMutation from "./mutations/useEpisodesMutation.tsx";

export interface EpisodeCellProps {
    episodes: number
    video_episodes: number
    video_id: number
}

const EpisodeCell = ({episodes, video_episodes, video_id}: EpisodeCellProps) => {
    const [state, setState] = useState({
        active: false,
        show: false
    })
    return (
        <td className='w-min px-3 py-1 text-center'
            onMouseEnter={() => setState({...state, show: true})}
            onMouseLeave={() => setState(state =>
                (!state.active) ? {...state, show: false} : state
            )}
        >
            {
                state.show ? (
                    /* Ключ необходим, чтобы при изменении episodes, компонент пересоздался с новым стейтом */
                    <SetEpisode key={episodes}
                        initEpisodes={episodes} video_id={video_id}
                                onFocus={() => setState({...state, active: true})}
                                onSubmit={() => setState({...state, show: false, active: false})}
                    />
                ) : (
                    <>{episodes}/{video_episodes}</>
                )
            }
        </td>
    );
};

interface SetEpisodeProps {
    initEpisodes: number
    video_id: number
    onSubmit: () => void
    onFocus: () => void
}

const SetEpisode = ({initEpisodes, video_id, onFocus, onSubmit}: SetEpisodeProps) => {
    const [episodes, setEpisodes] = useState<number>(initEpisodes)
    const episodesMutation = useEpisodesMutation(video_id)
    const submit = () => {
        onSubmit()
        if (episodes !== initEpisodes) {
            console.log("mutating episodes")
            episodesMutation.mutate(episodes)
        }
    }
    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            submit()
    }
    const onIncrement = () => {
        setEpisodes(episodes => episodes + 1)
        console.log("mutating episodes")
        episodesMutation.mutate(episodes + 1)
    }
    const onFocusImpl = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select()
        onFocus()
    }
    return (
        <span className='flex items-center gap-2'>
            <input type='number' min={0} max={10}
                   className='rounded-lg border text-center p-0 m-0 w-[50px] h-[25px]'
                   value={episodes}
                   onChange={e => setEpisodes(Number.parseInt(e.target.value))}
                   onBlur={submit}
                   onKeyDown={onEnter}
                   onFocus={onFocusImpl}
            />
            <button className='font-bold text-2xl leading-none'
                    onClick={onIncrement}>
                +
            </button>
        </span>
    )
}

export default EpisodeCell;
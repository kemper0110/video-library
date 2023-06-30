import React, {useState} from "react";
import useRatingMutation from "./mutations/useRatingMutation.tsx";

export interface RatingCellProps {
    rating: number
    video_id: number
}

const RatingCell = ({rating, video_id}: RatingCellProps) => {
    const [state, setState] = useState({
        active: false,
        show: false
    })
    return (
        <td className='w-min px-3 py-1 text-center '
            onMouseEnter={() => setState({...state, show: true})}
            onMouseLeave={() => setState(state =>
                (!state.active) ? {...state, show: false} : state
            )}
        >
            {
                state.show ? (
                    /* Ключ необходим, чтобы при изменении rating, компонент пересоздался с новым стейтом */
                    <SetRating key={rating}
                        initRating={rating} video_id={video_id}
                               onFocus={() => setState({...state, active: true})}
                               onSubmit={() => setState({...state, show: false, active: false})}
                    />
                ) : (
                    <>{rating}</>
                )
            }
        </td>
    );
};

interface SetRatingProps {
    initRating: number
    video_id: number
    onSubmit: () => void
    onFocus: () => void
}

const SetRating = ({initRating, video_id, onSubmit, onFocus}: SetRatingProps) => {
    const ratingMutation = useRatingMutation(video_id)
    const [rating, setRating] = useState<number>(initRating)
    const submit = () => {
        onSubmit()
        if (rating !== initRating) {
            console.log("mutating")
            ratingMutation.mutate(rating)
        }
    }
    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            submit()
    }
    const onFocusImpl = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select()
        onFocus()
    }
    return (
        <input type='number' min={0} max={10}
               className='rounded-lg border text-center p-0 m-0 w-[50px] h-[25px]'
               value={rating}
               onChange={e => setRating(Number.parseInt(e.target.value))}
               onBlur={submit}
               onKeyDown={onEnter}
               onFocus={onFocusImpl}
        />
    )
}
export default RatingCell;
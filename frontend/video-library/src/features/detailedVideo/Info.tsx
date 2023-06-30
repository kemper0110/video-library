import Headline from "../../components/Headline.tsx";
import {ReactNode} from "react";
import {VideoTypeModel} from "../../models/video.ts";
import {GenreModel} from "../../models/genre.ts";
import {localizeVideoType} from "../localize/localise.ts";

const Info = ({type, episodes, genres}: { type: VideoTypeModel, episodes: number, genres: GenreModel[] }) => (
    <div className='grid-in-info'>
        <Headline title='Информация'/>
        <ul className='pt-2'>
            <InfoItem>
                <Field text='Тип:'/>
                <div>{localizeVideoType(type)}</div>
            </InfoItem>
            {
                type === "season" ? (
                    <InfoItem>
                        <Field text='Эпизоды:'/>
                        <div>{episodes}</div>
                    </InfoItem>
                ) : null
            }
            <InfoItem>
                <Field text='Жанры:'/>
                {genres.map(genre => <div key={genre.id} className='underline'>{genre.name}</div>)}
            </InfoItem>
        </ul>
    </div>
)

const Field = ({text}: {text: string}) => (
    <div className='text-slate-500'>
        {text}
    </div>
)

const InfoItem = ({children}: { children: ReactNode | ReactNode[] }) => (
    <li className='flex flex-wrap gap-x-2'>
        {children}
    </li>
)

export default Info;
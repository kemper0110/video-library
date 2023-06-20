import {ReactNode} from 'react';

const Main = ({children}: {children: ReactNode | ReactNode[]}) => {
    return (
        <div className='bg-gray-400'>
            <main className='mx-auto min-h-[900px] max-w-[1440px] bg-white'>
                {children}
            </main>
        </div>
    );
};

export default Main;
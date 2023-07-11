import {ReactNode} from 'react';

const Content = ({children}: { children: ReactNode | ReactNode[] }) => {
    return (
        <div className='bg-gray-100'>
            <div className='mx-auto min-h-[900px] max-w-[1440px] bg-white pb-10'>
                {children}
            </div>
        </div>
    );
};

export default Content;
import Spinner from "./Spinner.tsx";

const ScreenSpinner = () => {
    return (
        <div className='flex flex-col justify-center items-center mx-auto w-full h-full'>
            <Spinner bounds='h-16 w-16'/>
        </div>
    );
};

export default ScreenSpinner;
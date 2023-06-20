const SkeletonCard = () => {
    return (
        <div className='flex flex-col gap-3 bg-white pb-3 border-4 border-black mx-auto'>
            <span className='bg-gray-300 w-[200px] h-[280px]'>
                <img alt=''/>
            </span>
            <div className='w-[60px] h-[40px] bg-gray-300'>
            </div>
            <div className='flex justify-between w-[100px] h-[30px] bg-gray-300'>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
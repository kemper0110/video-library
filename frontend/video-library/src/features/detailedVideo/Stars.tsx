const Patterns = () => (
    <>
        <svg width="0" height="0" viewBox="0 0 32 32">
            <defs>
                <mask id="half">
                    <rect width="32" height="32" fill="white"/>
                    <rect x="50%" width="32" height="32" fill="grey"/>
                </mask>
                <mask id="full">
                    <rect width="32" height="32" fill="white"/>
                </mask>
                <mask id="empty">
                    <rect width="32" height="32" fill="grey"/>
                </mask>
                <symbol id="star" viewBox="0 0 32 32">
                    <path
                        d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z"/>
                </symbol>
            </defs>
        </svg>
    </>
)

const Full = () => (
    <svg className="fill-[#4c86c8]" width="32" height="32" viewBox="0 0 32 32">
        <use xlinkHref="#star" mask="url(#full)"/>
    </svg>
)
const Empty = () => (
    <svg className="fill-[#4c86c8]" width="32" height="32" viewBox="0 0 32 32">
        <use xlinkHref="#star" mask="url(#empty)"/>
    </svg>
)
const Half = () => (
    <svg className="fill-[#4c86c8]" width="32" height="32" viewBox="0 0 32 32">
        <use xlinkHref="#star" mask="url(#half)"/>
    </svg>
)

const Stars = ({rating}: { rating: number }) => {
    const rounded_rating = Math.round(rating)
    const fullStarsCount = Math.floor(rounded_rating / 2)
    const halfStarsCount = (rounded_rating / 2 - fullStarsCount >= 0.5) ? 1 : 0
    const emptyStarsCount = 5 - fullStarsCount - halfStarsCount
    console.log("stars", fullStarsCount, halfStarsCount, emptyStarsCount)
    return (
        <div className='flex gap-1'>
            <Patterns/>
            {
                Array.from({length: fullStarsCount}, (_, i) => <Full key={i}/>)
            }
            {
                halfStarsCount === 1 ? <Half/> : null
            }
            {
                Array.from({length: emptyStarsCount}, (_, i) => <Empty key={i}/>)
            }
        </div>
    );
};

export default Stars;
interface SpinnerProps extends React.InputHTMLAttributes<HTMLDivElement> {
    bounds?: string
}

const Spinner = ({bounds = "h-8 w-8", ...divprops}: SpinnerProps) => {
    return (
        <div className={'inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] ' +
            'motion-reduce:animate-[spin_1.5s_linear_infinite] ' + bounds}
             {...divprops}
        />
    )
}
export default Spinner;
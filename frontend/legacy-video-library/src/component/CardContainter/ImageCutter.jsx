
const ImageCutter = ({children, maxWidth, maxHeight}) => {
    return (
        <span style={{maxWidth, maxHeight, overflow: "hidden"}}>
            {children}
        </span>
    );
}

export default ImageCutter;
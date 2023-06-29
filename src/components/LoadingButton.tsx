import React, { useState, useEffect } from 'react'

const image = [
    'assets/images/clapperboard.png',
    'assets/images/coke.png',
    'assets/images/film-roll.png',
    'assets/images/popcorn.png',
]

const LoadingButton = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const imageLength = image.length;
    let imageInterval: NodeJS.Timeout;
    const intervalTime = 300;
    const nextImage = () => {
        setCurrentImage(currentImage === imageLength - 1 ? 0 : currentImage + 1);
    }

    function autoChange() {
        imageInterval = setInterval(nextImage, intervalTime);
    }

    useEffect(() => {
        setCurrentImage(0);
    }, [])

    useEffect(() => {
        autoChange();
        return () => clearInterval(imageInterval);
        // eslint-disable-next-line
    }, [currentImage])

    return (
        <div>
            {image.map((image, index) => (
                <div className='loading' key={index}>
                    {index === currentImage && <img src={`../${image}`} alt={image} />}
                </div>
            ))}
        </div>
    )
}

export default LoadingButton

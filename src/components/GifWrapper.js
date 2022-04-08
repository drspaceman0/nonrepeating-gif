import React from 'react';
import { useIsVisible } from 'react-is-visible'

export default function GifWrapper({imgSrc, alt="", refresh=false}) { 
    const imgRef = React.useRef();
    const isVisible = useIsVisible(imgRef)
    if(isVisible) {
        if(typeof imgRef !== "undefined") {  
            imgRef.current.src = imgSrc;
        }
    }
 
    const restartGif = (e) => {  
        e.target.src = imgSrc;
    }
 
    return (
        <img ref={imgRef} onClick={restartGif} key={imgSrc} id={imgSrc} src={imgSrc} alt={alt} className="border-black border-2 cursor-pointer mt-2"  /> 
    )
}
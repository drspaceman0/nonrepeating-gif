import React from 'react';
const DisableLooping = true;
 
export default function FramePlayer({ frames, frameSpeed }) {
    const canvasRef = React.useRef(null)
    const width = frames[0].width;
    const height = frames[0].height;
 
    React.useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let index = 0;

        let interval = null;
        if (frames.length === 1) {
            // frames are being edited, so just show the first or last frame being changed
            context.drawImage(frames[0], 0, 0);
        } else {

            // not being edited, start playing
            interval = window.setInterval(() => {
                if (DisableLooping && index === frames.length - 1) {
                    window.clearInterval(interval);
                    return;
                }
                context.drawImage(frames[index], 0, 0);
                index = (index === frames.length - 1 ? 0 : index + 1);
            }, frameSpeed);
        }

        return () => window.clearInterval(interval);
    }, [frames, frameSpeed]);

 
    return (
        <>
            <canvas className="w-full mx-auto border-black border-2" ref={canvasRef} width={width} height={height} />
        </>
    );
}

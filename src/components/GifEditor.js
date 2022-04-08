import React from 'react';
import FramePlayer from './FramePlayer';
import Slider from '@mui/material/Slider';
import { Switch } from '@headlessui/react'

 
export default function GifEditor({ frames, frameSpeed, generateCallback, cancelCallback }) {

    const [frameRange, setFrameRange] = React.useState([0, frames.length]);
    const [activeSliderHandle, setActiveSliderHandle] = React.useState(-1);
    const [enableTwitterMode, setEnableTwitterMode] = React.useState(false);

    React.useEffect(() => {
        setFrameRange([0, frames.length - 1])
    }, [frames]);

    const handleFrameChange = (e, newRange, handle) => {
        if (!newRange || (newRange[0] === frameRange[0] && newRange[1] === frameRange[1]) || newRange[0] >= newRange[1])
            return;

        setFrameRange(newRange);
        if (activeSliderHandle === -1) {
            setActiveSliderHandle(handle);
        }
    };

    const getEditorFrames = () => {
        if (activeSliderHandle === 0)
            return [frames[frameRange[0]]];
        if (activeSliderHandle === 1)
            return [frames[frameRange[1]]];

        return frames.slice(frameRange[0], frameRange[1] + 1);
    }

    const triggerDownload = (fr, fs, tm) => { 
        generateCallback(fr, fs, tm);
    }
 
    return (
        <>
            <FramePlayer frames={getEditorFrames()} frameSpeed={frameSpeed} />
            <div className="px-4 mt-10 w-full">
                <Slider
                    getAriaLabel={() => 'Gif frames range'}
                    min={0}
                    max={frames.length - 1}
                    value={frameRange}
                    onChange={handleFrameChange}
                    onChangeCommitted={() => { setActiveSliderHandle(-1) }}
                    valueLabelDisplay="on"
                    disableSwap
                    color="primary"
                />
            </div>
            <div className=" mt-2 w-full       flex flex-col gap-5"> 

                <Switch.Group>
                    <div className="flex flex-col-reverse sm:flex-row items-start gap-2">
                        <Switch
                            checked={enableTwitterMode}
                            onChange={setEnableTwitterMode}
                            className={`${enableTwitterMode ? 'bg-teal-600' : 'bg-gray-200'
                                } relative inline-flex items-center h-7 rounded-full w-12  border-black border-2`}
                        >
                            <span className="sr-only">Enable 'Twitter mode'</span>
                            <span className={`${enableTwitterMode ? 'translate-x-5' : 'translate-x-1'
                                } transform transition ease-in-out duration-200 inline-block w-5 h-5 bg-white rounded-full  border-black border-2`}
                            />
                        </Switch>
                        <Switch.Label className="mr-4">Enable 'Twitter mode'</Switch.Label>
                    </div>
                </Switch.Group> 
            </div> 

            <div className="pt-3 mt-2 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    onClick={() => triggerDownload(frameRange, frameSpeed, enableTwitterMode)}
                    className="inline-flex justify-center rounded-md  shadow-sm px-4 py-2 bg-teal-600 text-base font-medium border-2 border-black text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 mt-3 w-full sm:mt-0 sm:w-auto sm:text-sm"
                >
                    Generate Gif
                </button> 
                <button
                    type="button"
                    onClick={cancelCallback}
                    className="inline-flex justify-center rounded-md  shadow-sm px-4 py-2 bg-white text-base font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 sm:ml-3 mt-3 w-full sm:mt-0 sm:w-auto sm:text-sm"
                >
                    Back
                </button> 
 
            </div>
        </>
    );
} 
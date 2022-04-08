import React from 'react';
import GIF from "gif.js";
import gifFrames from 'gif-frames';
import workerScript from "./gifWorkerScript";
 
import GifEditor from './GifEditor';
import DownloadGifModal from './DownloadGifModal';



function showMessageForHire(): void {
    console.log("***** ");
    console.log("NEED A WEB DEVELOPER? ");
    console.log("email: eric@ericmarshblog.com");
    console.log("github: @drspaceman0 ");
    console.log("linkedin: @eric-marsh-415b1b112 ");
    console.log("***** ");
  }

function waitForImagesLoaded(imageURLs, callback) {
    console.log("waiting...")
    var imageElements = [];
    var remaining = imageURLs.length;
    var onEachImageLoad = function () {
        if (--remaining === 0 && callback) {
            callback(imageElements);
        }
    };
 
    for (let i = 0; i < imageURLs.length; i++) {
        let img = new Image();
        imageElements.push(img);
        img.onload = onEachImageLoad;
        img.src = imageURLs[i].toDataURL();
    }

}

function Generator() {
    const [importedGif, setImportedGif] = React.useState(null);
    const [frames, setFrames] = React.useState([]);
    const [frameSpeed, setFrameSpeed] = React.useState(0);
    const [resultGif, setResultGif] = React.useState("");
    const [isGenerating, setIsGenerating] = React.useState(false);

    function generateGif(myFrameRange, myFrameSpeed, enableTwitterMode) { 
        if (!frames.length) return;
 
        var gif = new GIF({
            workers: 2,
            quality: 2,
            repeat: (enableTwitterMode ? 0 : -1),
            workerScript: workerScript,
        });


        let start = (!myFrameRange ? 0 : myFrameRange[0]);
        let end = (!myFrameRange ? frames.length : Math.min(frames.length, myFrameRange[1]));

        let myFrames = frames.slice();
        

        waitForImagesLoaded(myFrames, function (images) {
            for (var i = start; i < end; i++) {
                gif.addFrame(images[i], { delay: myFrameSpeed });
            }

            if(enableTwitterMode) {
                // add the last frame repeatedly so it looks like it ended, even though it will still loop
                const numRepeats = 100; 
                for(let i = 0; i < numRepeats; i++) 
                    gif.addFrame(images[images.length-1], { delay: myFrameSpeed });
            }
            gif.render();
        });


        gif.on('finished', function (blob) { 
            let blobURL = URL.createObjectURL(blob);
            setResultGif(blobURL);
            setIsGenerating(false);
        });
    } 


    function handleFileImport({ target }) { 
        console.log(target);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            setImportedGif(e.target.result);
        }
    }

    React.useEffect(() => {
        if (!importedGif) return;

        gifFrames({ url: importedGif, frames: 'all', outputType: 'canvas' }).then(function (frameData) { 
            let fSpeed = frameData[0].frameInfo.delay; 
            let fArray = frameData.map((f) => f.getImage()); 
            setFrameSpeed(fSpeed);
            setFrames(fArray);
        }).catch(console.error.bind(console));
    }, [importedGif]);


    const startGenerateGif = (fr, fs, tm) => { 
        generateGif(fr, fs, tm);
        setIsGenerating(true);
    }  
    
    React.useEffect(()=>showMessageForHire(),[]);

    return ( 
        <section className="mx-auto w-full">
            <div className="bg-white rounded-none md:rounded-lg py-4 px-6 border-black border-2">
                <h2 className="mt-4 text-2xl font-bold leading-6 text-gray-900 mb-4">
                    Non-Looping Gif Generator
                </h2>
                {
                    // import image file
                    (!importedGif) && <FileInput callback={handleFileImport}  />
                }
                {
                    // edit gif and show generate button
                    (importedGif && frames.length > 0) && <GifEditor frames={frames} frameSpeed={frameSpeed} generateCallback={startGenerateGif} cancelCallback={()=>setImportedGif(null)} />
                }
                { 
                    // show completed gif in modal overlay
                    resultGif.length > 0 && <DownloadGifModal gif={resultGif} onCloseCallback={()=>setResultGif("")} />
                } 
                {
                    isGenerating && !resultGif && (
                        <div className="flex flex-row gap-2 justify-end mt-4"> 
                            <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>     
                            <span className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                            Processing... 
                            </span> 
                        </div>
                    )
                } 
             </div>
        </section >

    );
}
 
function FileInput({callback}) { 
    return (
        <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">Upload Gif</label>
            <div className='flex items-center justify-center w-full'>
                <label className='flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-gray-300 group'>
                    <div className='flex flex-col items-center justify-center pt-7'>
                    <svg className="w-10 h-10 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <p className='lowercase text-sm text-gray-400 group-hover:text-gray-600 pt-1 tracking-wider'>Select a photo</p>
                    </div>
                <input type="file" className="hidden" accept="image/gif" onChange={callback}/>
                </label>
            </div>
        </div> 
    );
}

export default Generator;

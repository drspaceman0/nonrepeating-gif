import React from 'react';
import GIF from "gif.js";
import gifFrames from 'gif-frames';
import workerScript from "./gifWorkerScript";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import cat from '../cat.gif';
import GifEditor from './GifEditor';

const exportFileName = "nonlooping.gif";

const DEBUG = true;


// generate gif from frames
function waitForImagesLoaded(imageURLs, callback) {
    var imageElements = [];
    var remaining = imageURLs.length;
    var onEachImageLoad = function () {
        if (--remaining === 0 && callback) {
            callback(imageElements);
        }
    };

    // first create the images and apply the onload method
    for (var i = 0, len = imageURLs.length; i < len; i++) {
        var img = new Image();
        imageElements.push(img);
        img.onload = onEachImageLoad;
        img.src = imageURLs[i];
    }
}

function Generator() {
    const [importedGif, setImportedGif] = React.useState(null);
    const [frames, setFrames] = React.useState([]);
    const [frameSpeed, setFrameSpeed] = React.useState(0);
    const [resultGif, setResultGif] = React.useState("");

    function generateGif(myFrameRange, myFrameSpeed) {
        if (!frames.length) return;
        var gif = new GIF({
            workers: 2,
            quality: 2,
            repeat: -1,
            workerScript: workerScript,
        });

        let start = (!myFrameRange ? 0 : myFrameRange[0]);
        let end = (!myFrameRange ? frames.length : Math.min(frames.length, myFrameRange[1]));

        waitForImagesLoaded(frames, function (images) {
            for (var i = start; i < end; i++) {
                gif.addFrame(images[i], { delay: myFrameSpeed });
            }
            gif.render();
        });

        gif.on('finished', function (blob) {
            let blobURL = URL.createObjectURL(blob);
            setResultGif(blobURL);

            const elt = document.createElement('a')
            elt.style.display = 'none'
            elt.href = blobURL
            elt.download = exportFileName;
            document.body.appendChild(elt)
            elt.click();
            document.body.removeChild(elt)
        });
    }

    React.useEffect(() => {
        if (DEBUG) {
            setImportedGif(cat);
        }
    }, []);


    function handleFileImport({ target }) {
        // check to make sure its a gif
        // check its not malicious
        console.log(target);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            setImportedGif(e.target.result);
        }
    }

    React.useEffect(() => {
        if (!importedGif) return;

        gifFrames({ url: importedGif, frames: 'all', outputType: 'canvas' })
            .then(function (frameData) {
                let fSpeed = frameData[0].frameInfo.delay * 10;
                let fArray = frameData.map((f) => f.getImage().toDataURL());
                console.log("frameSpeed: " + fSpeed)
                setFrameSpeed(fSpeed);
                setFrames(fArray);
            }).catch(console.error.bind(console));
    }, [importedGif]);


    const startGenerateGif = (fr, fs) => {
        let myFrameRange = fr;
        console.log("downloadEditorGif(" + fr + ", " + fs + ")");
        generateGif(fr, fs);
    }

    return (

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-slate-600">
            {
                (!importedGif) && <input type="file" accept="image/gif" onChange={handleFileImport} />
            }
            {
                (importedGif && frames.length > 0) && <GifEditor frames={frames} frameSpeed={frameSpeed} callBack={startGenerateGif} />
            }
        </div>
    );


    return (
        <Container className="App" maxWidth="md" sx={{ marginTop: 8 }}>
            <Button hidden variant="contained" component="label" sx={{ display: 'none' }}>
                Upload Gif
                <input type="file" accept="image/gif" hidden onChange={handleFileImport} />
            </Button>
            {/* {
          importedGif && <>
            <p>Original</p>
            <img src={importedGif} />
          </>
        } */}


            {
                importedGif && <>
                    <GifEditor frames={frames} frameSpeed={frameSpeed} callBack={startGenerateGif} />
                </>
            }
            {
                resultGif && <>
                    <p>Result</p>
                    <img src={resultGif} />
                </>
            }

            {/* <ul>
          <li>
            <p>Chuckleton -tumblr</p>
            <img src="https://64.media.tumblr.com/52533cb44d653ca1e11e7ccc48666c83/8fd1803b9d28daf8-35/s400x600/054aa80b58754ad7b07141431186dad17e9d1d17.gifv" />
          </li>
        </ul> */}

        </Container>
    )
}

export default Generator;

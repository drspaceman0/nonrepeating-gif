import React from 'react';
import { styled } from '@mui/material/styles';

import Container from "@mui/material/Container";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import OutlinedInput  from '@mui/material/Input';

import { blueGrey } from '@mui/material/colors';
import Grid from '@mui/material/Grid';

import cat from '../bird.jfif';
import { compose } from '@mui/system';
const DEBUG = false;

const disableLooping = false;


function FramePlayer({ frames, frameSpeed, frameRange }) {
    
    const [frameIndex, setFrameIndex] = React.useState(frameRange[0]); 
    console.log(`FrameRange: ${frameRange}`)
    React.useEffect(() => {
        setFrameIndex(frameRange[0]);
        // setting interval for gif playback

        const interval = window.setInterval(() => {
                setFrameIndex(prevIndex => (prevIndex + 1 > frameRange[1]-1 ? frameRange[0] : prevIndex + 1)  ); 
        }, frameSpeed);

        return () => window.clearInterval(interval);
    }, [frameRange]);
 
    const imgSrc = frames[frameIndex];  
    return (
        <Container id="frameContainer" maxWidth="sm" sx={{ alignItems: 'center' }}>
            <img id="gifFrames" src={imgSrc} style={{ width: "100%", height: "auto", bgcolor: 'grey' }} />
        </Container>
    );
}


const Input = styled(OutlinedInput)`
  width: 42px;
`;

const minDistance = 1;
function GifEditor({ frames, frameSpeed, callBack }) {
    
    // uncomment this later
    // if (!props.frames.length) return null;
    const totalFrames = frames.length;
    const framesMin = 0;
    const framesMax = totalFrames - 1;
    console.log("Total frames: " + frames.length);
    const [frameRange, setFrameRange] = React.useState([0, totalFrames]);

    React.useEffect(()=>{
        setFrameRange([0, frames.length-1])
    },[]);

    const handleSliderChange = (event, newValue, activeThumb) => { 
        
        if (!Array.isArray(newValue)) {
            return;
          } 
          if (activeThumb === 0) {
            setFrameRange([Math.min(newValue[0], frameRange[1] - minDistance), frameRange[1]]);
          } else {
            setFrameRange([frameRange[0], Math.max(newValue[1], frameRange[0] + minDistance)]);
          }
    };
 
    return (
        <Container> 

                <form action="#" method="POST">
                    <Container>
                        <FramePlayer frames={frames} frameSpeed={frameSpeed} frameRange={frameRange}/>
                        {/* <img className="object-cover shadow-lg rounded-xs" id="gifFrames" src="https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg" /> */}
                    </Container> 

                    <Container sx={{ width: 250 }}>
               
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                            <OutlinedInput 
                                value={frameRange[0]}
                                size="small"
                                // onChange={}
                                // onBlur={handleBlur}
                                inputProps={{
                                step: 1,
                                min: 0,
                                max: framesMax,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                                }}
                            />
                            </Grid>
                            <Grid item xs> 
                                <Slider
                                    getAriaLabel={() => 'Frame range'}
                                    value={frameRange}
                                    min={framesMin}
                                    max={framesMax}
                                    valueLabelDisplay="on"
                                    disableSwap
                                    onChange={handleSliderChange} 
                                    // getAriaValueText={valuetext}
                                    /> 
                            </Grid>
                            <Grid item>
                            <OutlinedInput 
                                value={frameRange[1]}
                                size="small"
                                variant="outlined"
                                // onChange={handleInputChange}
                                // onBlur={handleBlur}
                                inputProps={{
                                step: 1,
                                min: 0,
                                max: framesMax,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                                }}
                            />
                            </Grid>
                        </Grid>
                        </Container> 
 

                    <div >
                        <input id="longending-gif" name="longending-gif" type="checkbox" />
                        <label htmlFor="longending-gif">Twitter Friendly Mode<a href="#" >What's this?</a>. </label>
                    </div>
                    <div>
                        <button type="submit" >Download</button>
                    </div>
                </form> 
        </Container>


        // <Container className="GifEditor" sx={{ marginTop: 5 }}>
        //     <FramePlayer frames={frames} frameSpeed={frameSpeed} frameRange={frameRange} />
        //     <Slider
        //         getAriaLabel={() => 'Frame range'}
        //         value={frameRange}
        //         onChange={handleSliderChange}
        //         min={0}
        //         max={frames.length - 1}
        //         valueLabelDisplay="on"
        //         disableSwap

        //         sx={{ width: 300 }}
        //     // getAriaValueText={valuetext}
        //     />
        //     <Button variant="contained" onClick={() => { callBack(frameRange, frameSpeed) }}>Download</Button>
        // </Container>

        // <Container sx={{ flexGrow: 1, border: 1, bgcolor: blueGrey[300] }}>
        //     <Grid container spacing={2}>
        //         <Grid item xs={12}  >
        //             <FramePlayer frames={frames} frameSpeed={frameSpeed} frameRange={frameRange} />
        //         </Grid>
        //         <Grid item xs={12}  >
        //             <Slider
        //                 getAriaLabel={() => 'Frame range'}
        //                 value={frameRange}
        //                 onChange={handleSliderChange}
        //                 min={0}
        //                 // max={frames.length - 1}
        //                 max={10}
        //                 valueLabelDisplay="on"
        //                 disableSwap

        //                 sx={{ maxWidth: 300 }}
        //             // getAriaValueText={valuetext}
        //             />
        //         </Grid>
        //         <Grid item xs={12}  >
        //             <Button variant="contained" onClick={() => { callBack(frameRange, frameSpeed) }}>Download</Button>
        //         </Grid>
        //     </Grid>
        // </Container>

    );
}

export default GifEditor;

import React from 'react';
import GifWrapper from './GifWrapper';
import homer from '../img/homer.gif';
import homer_nonlooping from '../img/homer_nonlooping.gif'; 
import Showcase from './ShowCase';
 
function Info() { 
    return ( 
        <>
            <section className="mt-4 mx-auto w-full ">
                <div className="bg-white rounded-none md:rounded-lg py-4 px-6 sm:px-12 border-black border-2">
                    <h3 className="mt-4 text-xl md:text-2xl font-bold leading-6 text-gray-900 ">
                        Why would you use a non-looping gif?
                    </h3    >
                    <p className="mt-4">
                        Sometimes it just makes gifs funnier. Compare the two gifs below.
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                        <div className="" > 
                            <GifWrapper imgSrc={homer} /> 
                        </div>
                        <div className=""> 
                            <GifWrapper imgSrc={homer_nonlooping} />
                        </div>
                    </div>
                    <p className="mt-4">
                        Do you find it funnier? Do you think homer will every get out of that bush? 
                    </p>
                    <h3 className="mt-6 text-xl md:text-2xl font-bold leading-6 text-gray-900 ">
                        Why do I never see non-looping gifs online?
                    </h3    >
                    <p className="mt-4">
                        Every major social media website automatically converts non-looping gifs into looping gifs. 
                        I am not exactly sure why they do this. 
                        This can be especially scene on the r/noloop subreddit, which was quickly abandoned after its users found Reddit didn't support those gifs. 
                        
                    </p>
                    <h3 className="mt-6 text-xl md:text-2xl font-bold leading-6 text-gray-900 ">
                        Is there anyway to post a non-looping gif to social media?
                    </h3>
                    <p className="mt-4">
                        If you use Tumblr, that website allows non-looping gifs and several users create them there all the time. 
                        Besides that, you can try enabling the 'twitter mode' on the generator above.  
                        It doesn't generate a true non-looping gif, but it adds several of the last frames to the gif so it will appear like one before it loops again.  
                    </p>
                    <h3 className="mt-6 text-xl md:text-2xl font-bold leading-6 text-gray-900 ">
                        Can I send you a non-looping gif to add to this website?
                    </h3>
                    <p className="mt-4">
                        Sure! Send me your gifs <a href="mailto:eric@ericmarshblog.com" className="no-underline hover:underline text-blue-600 font-bold">here</a>
                    </p>
                </div>
            </section>

            <section className="mt-4 mx-auto w-full ">
            <div className="bg-white rounded-none md:rounded-lg py-4 px-6 sm:px-12 border-black border-2">
                    <h3 className="mt-4 text-xl md:text-2xl font-bold leading-6 text-gray-900 ">
                        Some of my favorite non-looping gifs
                    </h3>
                    <h4 className="mt-4">
                        Note: Gifs will replay if you click on them or scroll them into view!
                    </h4>
                    <div className="mt-4 max-w-xl flex flex-col gap-2 justify-center mx-auto">
                        {
                            Showcase.map((imgSrc, index) => (
                                <GifWrapper key={index} imgSrc={imgSrc} /> 
                            ))
                        } 
                    </div>
                </div>
            </section>
        </>
    );
}

export default Info;

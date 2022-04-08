import React from 'react';
import ReactDOM from 'react-dom';
import Generator from './components/Generator';
import Info from './components/Info'; 
import './index.css';




ReactDOM.render(
  <React.StrictMode> 
    {/* <main className="h-full min-h-screen flex flex-col    DELETEME bg-red-500 sm:bg-yellow-500 md:bg-green-500 lg:bg-blue-500"> */}
    <main className="h-full min-h-screen flex flex-col bg-gray-700">
      <div className="mx-auto w-full sm:max-w-3xl ">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"> */}

        <Generator />
        <Info />
        <footer className="h-10 static my-4 w-full text-center text-white font-semibold  ">
        © 2022 EricMarshBlog <br></br>
        Need a web developer? <a href="mailto:eric@ericmarshblog.com" className="no-underline hover:underline hover:text-blue-500 text-gray-400 font-bold">Contact me</a>

        </footer>
      </div>
    </main>
  </React.StrictMode>,
  document.getElementById('root')
);
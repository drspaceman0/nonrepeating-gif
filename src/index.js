import React from 'react';
import ReactDOM from 'react-dom';
import Generator from './components/Generator';
import Info from './components/Info'; 
import './index.css';




ReactDOM.render(
  <React.StrictMode>  
    <main className="h-full min-h-screen flex flex-col bg-teal-700 ">
      <div className="mx-auto w-full sm:max-w-3xl mt-4">  
        <Generator />
        <Info />
        <footer className="h-10 static my-4 w-full text-center text-white font-semibold  ">
            © 2022 EricMarshBlog <br></br>
            Need a web developer? <a href="mailto:eric@ericmarshblog.com" className="no-underline hover:underline hover:text-teal-900 text-gray-400 font-bold">Contact me</a>
        </footer>
      </div>
    </main>
  </React.StrictMode>,
  document.getElementById('root')
);
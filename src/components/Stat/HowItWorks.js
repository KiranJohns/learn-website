import React, { Component } from 'react';
import Link from 'next/link';
import ReactPlayer from "react-player";
import Modal from "react-responsive-modal";
import Breadcrumb from '../Common/Breadcrumb';
import YouTube from "react-youtube";

class HowItWorks extends Component{
   
          render() {
            
            const opts = {
                height: "520",
                width: "1000",
                playerVars: {
                  autoplay: 0,
                },
              };

        return(
            <main>
          <Breadcrumb pageTitle="How it Works" />
             <div className="container mb-5">
              <div className="row">
                <div className="col-xxl-12 col-xl-12 col-lg-12">
                <h3 className='mt-2'>For Company / Managers</h3>
                
            <YouTube videoId="sTnm5jvjgjM" 
             opts={opts} onReady={this._onReady} />
    
            </div>
           </div>
         </div>
            </main>
        )
    }
    _onReady(event) {
        event.target.pauseVideo();
      }
}

export default HowItWorks
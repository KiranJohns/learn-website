import React, { Component } from 'react';
import Link from 'next/link';
import ReactPlayer from "react-player";

import Breadcrumb from '../Common/Breadcrumb';
import YouTube from "react-youtube";

class HowItWorks extends Component{
   
          render() {
            
            const opts = {
                height: "520",
                width: "100%",
                playerVars: {
                  autoplay: 0,
                },
              };

        return(
            <main>
          <Breadcrumb pageTitle="How it Works" />
             <div className="container mt-25 mb-5">
              <div className="row">
                <div className="col-xxl-12 col-xl-12 col-lg-12">
                <h3 className='mt-2'>For Company / Managers</h3>
                
            <YouTube videoId="7PIji8OubXU?si=H7CV4YYW9UPF1Jjz" 
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
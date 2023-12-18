import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';
import BundleCare from "../../components/Stat/BundleCare";
import CourseGridBundle from '../Elements/Tab/CourseGridBundle';
import BundleChild from '../Stat/BundleChildCare';

class ChildCBundle extends Component {

    render() {

        return (
            <main>

                 <Breadcrumb pageTitle="Child Care Bundle"/>  


	          
                <BundleChild name="Child Care Bundle"/>
		   
              
                {/* cta-start */}
				<Cta />
                
				{/* cta-end */}
        	</main>
        );
    }
}

export default ChildCBundle;
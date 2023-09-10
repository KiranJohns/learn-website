import React from 'react';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import BlogDetailsMain from '../components/BlogDetails/BlogDetailsMain';
import FooterThree from '../components/Layout/Footer/FooterStyleThree';
import Footer from '../components/Layout/Footer/Footer';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';

class BlogDetails extends React.Component {

    static getInitialProps({ store }) { }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <HeaderOpaque />
                <main>
                    {/* Blog Main */}
                    <BlogDetailsMain />
                    {/* Blog Main End */}
                </main>
                <Footer/>
            </React.Fragment>
        );
    }
}


export default BlogDetails;


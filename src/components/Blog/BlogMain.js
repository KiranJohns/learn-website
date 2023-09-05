import React, { Component } from 'react';
import ArticleLayout from '../Common/ArticleLayout';
import posts from '../../sample-data/blog-posts/posts.json';
import Breadcrumb from '../Common/Breadcrumb';
import PaginationSection from '../Common/Pagination';
import Search from './SearchSection';
import RecentPost from './RecentPostSection';
import Category from './CategorySecion';
import Tags from './TagsSection';
import SidebarBanner from './SidebarBannerSection';

class BlogMain extends Component {

    render() {

        return (
            <main>

                {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Blog" />
				{/* breadcrumb-end */}

	            <section className="blog__area pt-120 pb-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-12 col-xl-12 col-lg-12">
                            
                                <div className='row'>
                                    {posts && posts.map((post, i) => (
                                    <div key={i} className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
                                        <ArticleLayout post={post} />
                                    </div>
                                    ))}
                                </div>

                                {/* <PaginationSection /> */}
	                        </div>

	                        {/* <div className="col-xxl-4 col-xl-4 col-lg-4">
                                <div className="blog__sidebar pl-70">

                                    <Search />

                                    <RecentPost />

                                    <Category />

                                    <Tags />

                                    <SidebarBanner />
                                </div>
                            </div> */}
	                    </div>
	                </div>
	            </section>
        	</main>
        );
    }
}

export default BlogMain;
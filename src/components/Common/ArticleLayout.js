import React, { Component } from "react";
import Link from "next/link";
import { FaUser, FaRegCalendarDays } from "react-icons/fa6";


const ArticleLayout = ({ post }) => {
  return (
    <div className="blog__wrapper">
      <div className="blog__item white-bg mb-30 transition-3 fix">
        <div className="blog__thumb w-img fix" style={{height: '15rem'}}>
          <Link href={`/blog/${post.id}`}>
            <img src={post.img} alt="blog image" />
          </Link>
        </div>
        <div className="blog__content">
          <h3 className="blog__title" style={{marginBottom: '1rem'}}>
            <Link href={`/blog/${post.id}`}>{post.header.slice(0, 50) + "..."}</Link>
          </h3>      
          <div className="blog__meta d-flex flex-column justify-content-between">
            <div style={{marginBottom: '1rem'}}  className="blog__date d-flex align-items-center justify-content-between">
              
              <span><FaRegCalendarDays style={{marginBottom:".35rem",fontSize:"1rem",color:"#212a50"}}/> {new Date(post.date).toLocaleDateString()}</span> <span><FaUser style={{marginBottom:".3rem",color:"#212a50"}}/> {post.author}</span>
            </div>
            <div className="blog__author d-flex">
              <div className="blog__author-info">
                <h5>{post.content.slice(0, 125)} ...</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleLayout;

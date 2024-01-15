import React, { Component } from 'react';
import Link from 'next/link';

class CookiesSection extends Component {

    render() {

        return (
        <section className="about__area pt-90 pb-45">
            <div className="container">
           <p> Cookies play a crucial role in the operation of websites. Cookies are small text files that are stored on
a user&#39;s device (such as a computer or smartphone) when they visit a website. They can serve
various functions, including improving user experience, providing analytics, and enabling essential
features. Below are some common types of cookies used on LMS websites:</p>

<p>Session Cookies: These cookies are temporary and are deleted as soon as the user closes their web
browser. They are typically used to maintain session information, such as login status and user
preferences during a single browsing session.</p>

<p>Persistent Cookies: Persistent cookies are stored on the user&#39;s device for a specified duration, even
after the browser is closed. They are often used to remember user preferences across multiple
sessions, such as language settings or course progress.</p>

<p>First-Party Cookies: First-party cookies are set by the LMS website itself and are used to store
information about the user&#39;s interactions with the site. They are generally considered essential for
the website&#39;s functionality. </p>

<p>Third-Party Cookies: These cookies are set by third-party services or domains. They are commonly
used for analytics, tracking, or integrating external tools (e.g., Google Analytics, social media
widgets, or embedded content). Third-party cookies may be subject to stricter regulations under
data protection laws.</p>

<p>Analytical Cookies: These cookies collect data about how users interact with the LMS website. They
help website owners understand how users navigate their site, what content is most popular, and
identify areas for improvement.</p>

Authentication Cookies: These cookies are essential for user authentication and maintaining login
sessions on the LMS platform. They store information like user IDs and tokens to identify the user
and ensure secure access to the system.

<p>Functional Cookies: Functional cookies enhance user experience by remembering settings and
preferences. For an LMS, this may include remembering language preferences, course progress, or
display preferences.</p>

<p>Marketing Cookies: Marketing cookies track user behaviour across the website and may be used to
display personalized content or advertisements. Users typically need to give explicit consent for
these cookies to be placed.</p>

<p>Compliance Cookies: In the context of an LMS website operating in the UK or EU, these cookies are
used to manage user consent for cookies and comply with data protection regulations like the
General Data Protection Regulation (GDPR).</p>

<p>When using cookies on our LMS website, it's essential to:</p>

<p>Inform users about the types of cookies you use and their purpose in your privacy policy.</p>

<p>Obtain explicit consent for non-essential cookies, especially marketing and third-party cookies, in
compliance with data protection regulations.</p>

<p>Offer users the ability to manage their cookie preferences, including opting in or out of certain
categories of cookies.</p>

<p>Ensure that any third-party services you use, which may set cookies, also comply with data
protection laws.</p>

<p>Remember that cookie laws and regulations can change, so it&#39;s vital to stay updated on the latest
requirements and adapt your cookie practices accordingly. Always consult with legal counsel or a
data protection specialist to ensure your cookie usage complies with the most current regulations.</p>

            </div>
         </section>
        );
    }
}

export default CookiesSection;
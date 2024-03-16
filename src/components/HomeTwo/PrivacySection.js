import React, { Component } from 'react';
import Link from 'next/link';

class PrivacySection extends Component {

    render() {

        return (
            <section className="about__area pt-90 pb-45">
                <div className="container">
                    <p>Effective Date: 15/01/2024</p>
                    <p>Last Updated: 15/01/2024</p>
                    <br />

                    <h2 style={{ fontWeight: '700', fontSize:"1rem", color:"#6D6E75" }}>1. Introduction</h2>
                    <p>Welcome to Learn For Care. We are committed to protecting your privacy and ensuring the security
                        of your personal information. This Privacy Policy explains how we collect, use, disclose, and
                        safeguard your data when you use our Learning Management System website. By accessing and
                        using our website, you consent to the practices described in this policy.</p>
                    <br />

                    <p style={{ fontWeight: 'bold' }}>2. Information We Collect</p>
                    <p><span style={{ fontWeight: 'bold', marginLeft: "1.5rem" }}>a. Personal Information:</span> We may collect the following types of personal information:</p>
                    <p style={{ marginLeft: "3rem" }}>I. Name</p>
                    <p style={{ marginLeft: "3rem" }}>II. Email address</p>
                    <p style={{ marginLeft: "3rem" }}>III. Username and password</p>
                    <p style={{ marginLeft: "3rem" }}>IV. Contact information</p>
                    <p style={{ marginLeft: "3rem" }}>V. Billing and payment information (if applicable)</p>
                    <p style={{ marginLeft: "3rem" }}>VI. Other information you provide voluntarily.</p>
                    <br />

                    <p><span style={{ fontWeight: 'bold', marginLeft: "1.5rem" }}>b. User Content:</span> Any content, including assignments, posts, comments, and other submissions you
                        make on our website may be collected and stored.</p><br />

                    <p><span style={{ fontWeight: 'bold', marginLeft: "1.5rem" }}>c. Automated Data:</span>We collect certain information automatically when you use our website,
                        including:</p><br />

                    <p style={{ marginLeft: "3rem" }}>I. IP address</p>
                    <p style={{ marginLeft: "3rem" }}>II. Browser type</p>
                    <p style={{ marginLeft: "3rem" }}>III. Device type</p>
                    <p style={{ marginLeft: "3rem" }}>IV. Operating system</p>
                    <p style={{ marginLeft: "3rem" }}>V. Date and time of access</p>
                    <p style={{ marginLeft: "3rem" }}>VI. Usage data and analytics</p>
                    <br />

                    <p style={{ fontWeight: 'bold' }}>3. How We Use Your Information</p>
                    <p>We use your information for the following purposes:</p>
                    <p style={{ marginLeft: "3rem" }}>I. Providing and improving our LMS services.</p>
                    <p style={{ marginLeft: "3rem" }}>II. Personalizing your experience on our website.</p>
                    <p style={{ marginLeft: "3rem" }}>III. Communicating with you about updates, changes, or important notices.</p>
                    <p style={{ marginLeft: "3rem" }}>IV. Analyzing and optimizing our website&#39;s performance.</p>
                    <p style={{ marginLeft: "3rem" }}>V. Complying with legal requirements and obligations.</p>
                    <br />

                    <p style={{ fontWeight: 'bold' }}>4. Disclosure of Your Information</p>
                    <p>We may share your information in the following circumstances:</p>
                    <p style={{ marginLeft: "3rem" }}>I. With service providers who assist us in delivering our services.</p>
                    <p style={{ marginLeft: "3rem" }}>II. To comply with legal requirements or respond to lawful requests.</p>
                    <p style={{ marginLeft: "3rem" }}>III. In connection with a business transition, such as a merger or sale.</p>
                    <br />

                    <p style={{ fontWeight: 'bold' }}>5. Your Privacy Choices</p>
                    <p><span style={{ fontWeight: 'bold', marginLeft: "1.5rem" }}>a. Account Settings:</span> You can update and manage your account settings, including communication
                        preferences, from your account dashboard.</p>
                    <p><span style={{ fontWeight: 'bold', marginLeft: "1.5rem" }}>b. Opting Out:</span> You may opt out of receiving promotional communications from us by following the
                        unsubscribe instructions provided in the emails.</p>
                    <br />

                    <p style={{ fontWeight: 'bold' }}>6. Security Measures</p>
                    <p>We implement reasonable security measures to protect your personal information. However, no
                        method of transmission over the internet or electronic storage is entirely secure.</p>
                    <br />

                    <p style={{ fontWeight: 'bold' }}>7. Data Retention</p>
                    <p>We will retain your personal information for as long as necessary to fulfil the purposes outlined in
                        this Privacy Policy unless a longer retention period is required by law.</p>
                    <br />

                    <p style={{ fontWeight: 'bold' }}>8. Cookies and Tracking Technologies</p>
                    <p>We may use cookies and similar tracking technologies to collect information about your usage of our
                        website. You can control cookies through your browser settings.</p>
                    <br />

                    <p style={{ fontWeight: 'bold' }}>9. GDPR Compliance</p>
                    <p>We adhere to the requirements of the General Data Protection Regulation (GDPR). We store your
                        data in secure servers located within the EU, and we may share it with EU-based processors for
                        website management and payment processing purposes. Regular vulnerability tests are conducted
                        to maintain data security.</p>
                    <br />

                    <p style={{ fontWeight: 'bold' }}>10. Changes to this Privacy Policy</p>
                    <p>We may update this Privacy Policy to reflect changes in our practices or for other operational, legal,
                        or regulatory reasons. We will notify you of any significant changes.</p>
                    <br />

                    <p style={{ fontWeight: 'bold' }}>11. Contact Information</p>
                    <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
                    <br />
                    <p style={{fontWeight:"bold"}}>Learn For Care</p>
                    <p style={{fontWeight:"bold"}}>Suite 14, Neals Corner, 2 bath road, Hounslow TW3 3HJ</p>
                    <p style={{fontWeight:"bold"}}>Email us directly.</p>
                    <p style={{fontWeight:"bold"}}>support@learnforcare.co.uk</p>
                    <p style={{fontWeight:"bold"}}>Phone</p>
                    <p style={{fontWeight:"bold"}}>+(44)-2031483007</p>

                </div>
            </section>
        );
    }
}

export default PrivacySection;
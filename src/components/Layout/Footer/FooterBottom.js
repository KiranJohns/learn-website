import React from 'react';
import Link from 'next/link';

const FooterBottom = () => {
    return (
        <div className="footer__bottom">
            <div className="container">
                <div className="row">
                <div className="col-xxl-12">
                    <div className="footer__copyright footer__copyright-2 text-center">
                        <p>© 2023, All Rights Reserved. <Link href="/"><a> LearnForCare</a></Link></p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default FooterBottom;
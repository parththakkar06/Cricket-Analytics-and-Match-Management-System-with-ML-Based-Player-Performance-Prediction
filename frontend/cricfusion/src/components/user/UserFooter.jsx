import React from 'react'
import { Link } from 'react-router-dom'

export const UserFooter = () => {
    return (
        <div><footer>
            <div className="footer-content">
                {/* <div className="footer-about">
        <div className="footer-logo">
          Cric<span style={{ color: "#f8c300" }}>Fusion</span>
        </div>
        <p>
          The most comprehensive cricket scoring and management platform for
          players, clubs, and leagues worldwide.
        </p>
      </div>
       */}
                <div className="footer-about">
                    <div className="footer-logo">
                        Cric<span style={{ color: "#f8c300" }}>Fusion</span>
                    </div>
                    <p>
                        The most comprehensive cricket scoring and management platform for
                        players, clubs, and leagues worldwide.
                    </p>
                    <div className="social-icons">
                        <a href="https://www.instagram.com/youraccount" target="_blank" rel="noopener noreferrer">
                            <img src="/src/assets/insta.png" alt="Instagram" style={{ width: '30px', height: '30px', margin: '0 10px' }} />
                        </a>
                        <a href="https://www.youtube.com/youraccount" target="_blank" rel="noopener noreferrer">
                            <img src="/src/assets/yt.png" alt="YouTube" style={{ width: '30px', height: '30px', margin: '0 10px' }} />
                        </a>
                        <a href="https://twitter.com/youraccount" target="_blank" rel="noopener noreferrer">
                            <img src="/src/assets/tweet.png" alt="Twitter" style={{ width: '30px', height: '30px', margin: '0 10px' }} />
                        </a>
                        <a href="https://www.facebook.com/youraccount" target="_blank" rel="noopener noreferrer">
                            <img src="/src/assets/fb.png" alt="Facebook" style={{ width: '30px', height: '30px', margin: '0 10px' }} />
                        </a>
                    </div>
                </div>
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>
                            <Link to="#">Home</Link>
                        </li>
                        <li>
                            <Link to="#">Features</Link>
                        </li>
                        <li>
                            <Link to="#">Pricing</Link>
                        </li>
                        <li>
                            <Link to="#">Blog</Link>
                        </li>
                        <li>
                            <Link href="#">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-links">
                    <h3>Resources</h3>
                    <ul>
                        <li>
                            <Link to="#">Help Center</Link>
                        </li>
                        <li>
                            <Link to="#">Video Tutorials</Link>
                        </li>
                        <li>
                            <Link to="#">API Documentation</Link>
                        </li>
                        <li>
                            <Link to="#">Community Forum</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-links">
                    <h3>Legal</h3>
                    <ul>
                        <li>
                            <Link to="#">Terms of Service</Link>
                        </li>
                        <li>
                            <Link to="#">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="#">Cookie Policy</Link>
                        </li>
                        <li>
                            <Link to="#">Data Processing</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 CricketPro. All rights reserved.</p>
            </div>
        </footer></div>
    )
}

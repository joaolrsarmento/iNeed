import React from 'react';
import {Link} from 'react-router-dom';

import instaLogo from '../../assets/instalogo.png';
import faceLogo from '../../assets/facelogo.png';
import './styles.css';


export default function Login() {

    return (
        <div>
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <form action="/">
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="/facebook" className="social"><i className="fab fa-facebook-f"><img src={faceLogo} alt="face"class="media-logo"/></i></a>
                            <a href="/googleplus" className="social"><i className="fab fa-google-plus-g"><img src={instaLogo} alt="insta" class="media-logo"/></i></a>
                        </div>
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="/recovery">Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <Link to = "/register"><button class="ghost" id="signUn">Sign Up</button></Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}


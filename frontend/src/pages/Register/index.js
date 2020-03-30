import React from 'react';
import {Link} from 'react-router-dom';

import logoImg from '../../assets/logoSimple.png';
import instaLogo from '../../assets/instalogo.png';
import faceLogo from '../../assets/facelogo.png';

import './styles.css';


export default function Register() {

    return (
        <div>
            <div class="container" id="container">

                <div class="form-container sign-up-container">
                    <form action="/">
                        <h1>Create Account</h1>
                        <div class="social-container">
                            <a href="/facebook" class="social"><i class="fab fa-facebook-f"><img src={faceLogo} alt = "face" class="media-logo"/></i></a>
                            <a href="/googleplus" class="social"><i class="fab fa-google-plus-g"><img src={instaLogo} alt ="insta" class="media-logo"/></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-right">
                            <img src= {logoImg} alt="logo"/>
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <Link to = "/"><button class="ghost" id="signIn">Sign In</button></Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}


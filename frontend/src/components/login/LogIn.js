import React from 'react';
import { connect } from 'react-redux';

class LogIn extends React.Component {
    render() {
        return (
            <div>
                <div className="navBar">
                    <div>
                        <a id={"logo"} className="options" href="https://pusheen.com/wp-content/themes/pusheen-custom/img/header-pusheen.gif">SmartCook</a>
                    </div>
                    <div>
                        <a id={"logIn"} className="options" href="https://pusheen.com/wp-content/themes/pusheen-custom/img/header-pusheen.gif">Log in</a>
                    </div>
                    <div>
                        <a id={"signUp"} className="options" href="https://pusheen.com/wp-content/themes/pusheen-custom/img/header-pusheen.gif">Sign up</a>
                    </div>
                </div>
                <div id={"forms"}>
                    <form>
                        <div className={"formElements"}>
                            <div><label htmlFor="usernameInput">Username:</label></div>
                            <div><input id="usernameInput" type="text"/></div>
                        </div>
                        <div className={"formElements"}>
                            <div><label htmlFor="PasswordInput">Password:</label></div>
                            <div><input id="passwordInput" type="text"/></div>
                        </div>
                        <div>
                            <button
                                id="enterInput"
                                type="button"
                                onClick={() => alert("This takes you to the landing page!")}>
                                Log in
                            </button>
                        </div>
                    </form>
                    <button
                        id="forgotPassword"
                        type="button"
                        onClick={() => alert("This takes you to the page to reset password!")}>
                        Forgot Password?
                    </button>
                </div>
            </div>
        );
    }
}
export default LogIn;
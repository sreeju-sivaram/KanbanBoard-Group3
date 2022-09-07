import React, { useRef, useState, useEffect, useContext, useCallback } from "react";
import AuthContext from "../context/AuthProvider";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@.]).{5,24}$/;

const Login = () => {
      const { setAuthData } = useContext(AuthContext);
      const userRef = useRef();
      const errRef  = useRef();

      const [email, setEmail] = useState('');
      const [password, setPwd] = useState('');
      const [errMsg, setErrMsg] = useState('');
      const [success, setSuccess] = useState(false);

      const [validEmail, setValidEmail] = useState(false);
      const [emailFocus, setEmailFocus] = useState(false);
      const [validPwd, setValidPwd] = useState(false);
      const [pwdFocus, setPwdFocus] = useState(false);
  
      let navigate = useNavigate();
      useEffect(() => {
        userRef.current.focus();
       }, [])

       useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PASSWORD_REGEX.test(password));
    }, [password])

      useEffect(() => { 
        setErrMsg('');
      }, [email, password])

      const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const fetchUser = {"email" : email, "password": password};
            const response = await login(fetchUser);
            if(response.data.loggedIn){
                setSuccess(true);
                setAuthData({"name":response.data.name, "id":response.data.id, "email":response.data.email})
            }
            else{
                setSuccess(false);
                setErrMsg("Login failed. Please try again");
            }

        }, [email, password, setAuthData]);


      return ( 
        <main className="App">
           {success ? (
            <section>
                <h1>You are logged in!</h1>
                <br />
                <p>
                    <button
                        onClick={() => {
                            navigate('/projects');
                        }}
                    >Go to Projects</button>
                </p>
            </section>
           ) : (
            
            <section>
                <p ref ={errRef} className={errMsg ? "errmsg" : "offscreen"} 
                aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        Email:
                        <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                    </label>
                    <input
                        type= "email"
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emailnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p id="emailnote" className={emailFocus  && !validEmail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must and should contain . and @ <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    <label htmlFor="password">
                        Password:
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                    </label>
                    <input
                        type= "password"
                        id="password"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setPwd(e.target.value)}
                        value={password}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="Line">
                    {/*put router link here*/}
                    <a href="http://localhost:3000/register">Sign Up</a>
                    </span>
                </p>
            </section>
           )}
        </main>
    )
}

export default Login
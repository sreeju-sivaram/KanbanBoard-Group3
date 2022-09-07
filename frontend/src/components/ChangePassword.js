import React, { useRef, useState, useEffect, useContext, useCallback } from "react";
import AuthContext from "../context/AuthProvider";
import {changePassword} from '../api/api';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [successMsgInd, setSuccessMsgInd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const {auth} = useContext(AuthContext);

    const userRef = useRef();

    useEffect(() => {
        setValidPwd(PASSWORD_REGEX.test(newPassword));
    }, [newPassword])

    useEffect(() => { 
        setErrMsg('');
    }, [newPassword])

      const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const fetchUser = {"password": newPassword, "user_id": auth.data.id};
            const response = await changePassword(fetchUser);
            if(response.data === 'success'){
                setShowChangePassword(false);
                setErrMsg('');
                setSuccessMsgInd(true);
            }
            else{
                setErrMsg("Change password failed. Please try again");
            }
        }, [newPassword, auth]);

      return ( <div>
        {showChangePassword ? <section>
                <h1>Change Password</h1>
                <span className={errMsg ? "errorMessg" : "" }>{errMsg}</span>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="oldpassword">Old Password:</label>
                    <input
                    type= "password"
                    id="oldpassword"
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                    />
                    <label htmlFor="newpassword">
                        Password:
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !newPassword ? "hide" : "invalid"} />
                    </label>
                    <input
                        type= "password"
                        id="newpassword"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
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
                    <button type="submit">Change Password</button>
                    <button onClick={() => setShowChangePassword(false)}>Cancel</button>
                </form>
            </section> : 
            <><button onClick={() => setShowChangePassword(true)}> Change Password</button>
            {successMsgInd && <p>Password updated successfully</p>}</>}
      </div>
                    
      )
}

export default ChangePassword
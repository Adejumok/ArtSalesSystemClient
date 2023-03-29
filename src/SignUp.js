import {useRef, useEffect, useState} from 'react'

const FIRST_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,24}$/;

const SignUp = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validName, setValidName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // useEffect(()=>{
    //     useRef.current.focus();
    // }, []);

    useEffect(()=>{
        const output = FIRST_NAME_REGEX.test(firstName);
        console.log(output);
        console.log(firstName);
        setValidName(output);
    }, [firstName]);

    useEffect(()=>{
        const output = PASSWORD_REGEX.test(password);
        console.log(output);
        console.log(password);
        setValidPassword(output);
    }, [password]);

    useEffect(()=>{
        setErrMsg('');
    }, [firstName, password]);

  return (
    <section>
        <p ref={errRef} className={errMsg? "errmsg" : "offscreen"}
        aria-live="assertive">{errMsg}</p>
        <h1>SignUp</h1>
        <form>
            <label htmlFor='firstName'>First Name: </label>
            <input
            type="text"
            id="firstName"
            ref={userRef}
            autoComplete="off"
            onChange={(e)=>setFirstName(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={()=> setFirstNameFocus(true)}
            onBlur={() => setFirstNameFocus(false)}/>
            <p id='uidnote' className={firstName && firstNameFocus && !validName ? "instructions" : "offscreen"}>
                4 to 24 characters.<br/>
                Must begin with a letter.<br/>
                Letters, numbers, hyphens and underscores allowed.
            </p>

            <label htmlFor='password'>Password: </label>
            <input
            type="password"
            id="password"
            onChange={(e)=>setPassword(e.target.value)}
            required
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={()=> setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}/>
            <p id='pwdnote' className={passwordFocus && password && !validPassword ? "instructions" : "offscreen"}>
                8 to 24 characters.<br/>
                Must include uppercase and lowercase letters, a number and a special character.<br/>
                Allow special characters
            </p>
        </form>
    </section>
  )
}

export default SignUp
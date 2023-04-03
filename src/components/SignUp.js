import {useRef, useEffect, useState} from 'react'
import axios from 'axios';

const FIRST_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,24}$/;
const SIGNUP_URL = '/api/v1/auth/register';


const SignUp = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validName, setValidName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        const output = FIRST_NAME_REGEX.test(firstName);
        console.log(output);
        console.log(firstName);
        setValidName(output);
    }, [firstName]);

    useEffect(()=>{
        const output = EMAIL_REGEX.test(email);
        console.log(output);
        console.log(email);
        setValidEmail(output);
    }, [email]);

    useEffect(()=>{
        const output = PASSWORD_REGEX.test(password);
        console.log(output);
        console.log(password);
        setValidPassword(output);
    }, [password]);

    useEffect(()=>{
        setErrMsg('');
    }, [firstName, email, password]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const vF = FIRST_NAME_REGEX.test(firstName);
        const vE = EMAIL_REGEX.test(email);
        const vP = PASSWORD_REGEX.test(password);
        if(!vF || !vE || !vP){
            setErrMsg("Invalid Entry");
            return;
        }
        
        axios.post('http://localhost:8081/api/v1/auth/register', {
            firstName: firstName,
            email: email,
            password: password
        })
        .then(response => console.log(response))
        .catch(error => console.error(error));
        };
  return (
    <section>
        <p ref={errRef} className={errMsg? "errmsg" : "offscreen"}
        aria-live="assertive">{errMsg}</p>
        <h1>SignUp</h1>
        <form onSubmit={handleSubmit}>
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

            <label htmlFor='email'>Email: </label>
            <input
            type="text"
            id="email"
            autoComplete="off"
            onChange={(e)=>setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={()=> setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}/>
            <p id='emailnote' className={email && emailFocus && !validEmail ? "instructions" : "offscreen"}>
                The length of the personal_info part may be up to 64 characters long <br/>
                Domain name may be up to 253 characters.<br/>
                Can contain letters, numbers and characters.<br/>
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
            <button disabled={!validName || !validEmail || !validPassword ? true : false}>Sign Up</button>
        </form>
        <p>
            Already registered?<br/>
            <span className='line'>
                <a href='#'>Sign In</a>
            </span>
        </p>
    </section>
  )
}

export default SignUp
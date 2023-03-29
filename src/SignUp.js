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

    useEffect(()=>{
        useRef.current.focus();
    }, []);

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
        setValidName(output);
    }, [password]);

    useEffect(()=>{
        setErrMsg('');
    }, [firstName, password]);

  return (
    <div>SignUp</div>
  )
}

export default SignUp
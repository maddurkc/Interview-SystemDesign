import { useRef, useState, useEffect } from 'react';

/* If you are pro in RegExp, use below 

 const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
 const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

*/

const Register = () => {
  const userRef = useRef();

  //userName
  const [userName, setUserName] = useState('');
  //userName validations
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  //password
  const [pwd, setPwd] = useState('');
  //password validations
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  //confirmPassword
  const [matchPwd, setMatchPwd] = useState('');
  //confirmPassword validations
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [success, setSuccess] = useState(false);

  //upon component loads, we are making the userName field as focussed
  useEffect(() => {
    userRef.current.focus();
  }, []);

  function isValidUsername(username) {
    if (username.length < 4 || username.length > 24) return false;
    // Check if the username starts with a letter (either uppercase or lowercase).
    // If the username does not start with a letter, return false.
    if (!username.match(/^[A-Za-z]/)) return false;

    // Check if the username consists only of letters (uppercase or lowercase), numbers, hyphens (-), and underscores (_).
    // If the username contains any other character, return false.
    if (!username.match(/^[A-Za-z0-9-_]+$/)) return false;

    return true;
  }

  function isValidPassword(password) {
    if (password.length < 8 || password.length > 24) return false;
    if (!password.match(/[a-z]/)) return false; // Check for lowercase
    if (!password.match(/[A-Z]/)) return false; // Check for uppercase
    if (!password.match(/[0-9]/)) return false; // Check for digit
    if (!password.match(/[!@#$%]/)) return false; // Check for special character
    return true;
  }

  //every time the userName fields changes, we are testing it with our regex validations
  useEffect(() => {
    setValidName(isValidUsername(userName)); // cleaner approach
    // setValidName(USER_REGEX.test(userName));
  }, [userName]);

  //every time the password or confirmPassword field(s) changes, we are testing it with our regex validations
  useEffect(() => {
    // setValidPwd(PWD_REGEX.test(pwd));
    setValidPwd(isValidPassword(pwd)); // cleaner approach
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  //onClick of signUp button, userName, password is validated with the help of REGEX validations
  const handleSubmit = (e) => {
    e.preventDefault();

    // if everything entered is as per the validations, then success is true and empty all the other fields
    setSuccess(true);
    setUserName('');
    setPwd('');
    setMatchPwd('');
  };

  return (
    <>
      {success ? (
        <section>
          <h1 className='success-text'>Success!</h1>
          <a href='/'>Back to Home</a>
        </section>
      ) : (
        <section>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input
              className={validName ? 'valid-name' : 'invalid-name'}
              type='text'
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby='uidnote'
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id='uidnote'
              className={userFocus && !validName ? 'instructions' : 'offscreen'}
            >
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              className={validPwd ? 'valid-password' : 'invalid-password'}
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={!validPwd}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />

            <p
              id='pwdnote'
              className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
            >
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{' '}
              <span aria-label='exclamation mark'>!</span>{' '}
              <span aria-label='at symbol'>@</span>{' '}
              <span aria-label='hashtag'>#</span>{' '}
              <span aria-label='dollar sign'>$</span>{' '}
              <span aria-label='percent'>%</span>
            </p>

            <label htmlFor='confirm_pwd'>Confirm Password:</label>
            <input
              type='password'
              id='confirm_pwd'
              className={
                validPwd && matchPwd === pwd
                  ? 'confirmed-password'
                  : 'invalid-password'
              }
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby='confirmnote'
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id='confirmnote'
              className={
                matchFocus && !validMatch ? 'instructions' : 'offscreen'
              }
            >
              Must match the above password input field.
            </p>

            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;

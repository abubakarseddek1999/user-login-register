/* eslint-disable no-unused-vars */

import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../fireconfig/faireBase.config";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';


const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted)

        // reset eroor  and success

        setRegisterError('')
        setSuccess('')

        if (password.length < 6) {
            setRegisterError('password should be at 6 characters or long')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('your password should have at least one upper case charecters ')
            return;
        }
        else if (!accepted) {
            setRegisterError('please accept our terms and condition !')
            return;
        }
        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
                setSuccess('User Created Successfully')
                // update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                    .then(() => console.log('profile updated'))
                    .catch()

                // send verification email;
                sendEmailVerification(result.user)
                    .then(() => {
                        alert('please check your email and verify your account ')
                    })
            })

            .catch(error => {
                console.log(error.message);
                setRegisterError(error.message)
            })

    }

    return (
        <div className="border">
            <div className="mx-auto md:w-1/2">
                <h3 className="text-3xl mb-8">Please Register</h3>

                <form onSubmit={handleRegister}>
                    <div>
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="your name" className="mb-2 w-full py-2 px-4 border rounded-lg" />
                    </div>

                    <input className="mb-2 w-full py-2 px-4 border rounded-lg" type="email" name="email" placeholder="email address" id="" />
                    <br />

                    <div className="mb-2 relative">
                        <input
                            className=" w-full py-2 px-4 border rounded-lg"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="password add"
                            id="" />
                        <span className="absolute top-3 right-2" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye>
                            }
                        </span>
                    </div>
                    <br />

                    <div className="mb-4">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2 mb-4" htmlFor="terms"> Accept our  <a href="#"> terms and Conditions</a></label>
                    </div>


                    <input className="btn btn-secondary mb-2 w-full " type="submit" value="register" />
                </form>
                {
                    registerError && <p className="text-red-300 font-bold">{registerError}</p>
                }
                {
                    success && <p className=" text-green-600 font-bold">{success}</p>
                }
            </div>

        </div>
    );
};

export default Register;
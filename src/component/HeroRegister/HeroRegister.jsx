import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../fireconfig/faireBase.config";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const HeroRegister = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleRegister = (e) => {
        e.preventDefault();
        const name =e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted,name)

        // reset eroor 

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
                updateProfile(result.user,{
                    displayName:name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(()=>console.log('profile updated'))
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
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">

                        <form onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="your name" className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name="email" placeholder="email" className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>


                                <div className="relative">
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

                            </div>

                            <div className="mb-4">
                                <input type="checkbox" name="terms" id="terms" />
                                <label className="ml-2 mb-4" htmlFor="terms"> Accept our  <a href="#"> terms and Conditions</a></label>
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>

                        {
                            registerError && <p className="text-red-300 font-bold">{registerError}</p>
                        }
                        {
                            success && <p className=" text-green-600 font-bold">{success}</p>
                        }
                        <p>Already have an account? please<Link className="text-red-600 font-bold underline" to={"/login"}> Login</Link></p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroRegister;
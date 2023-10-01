import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../fireconfig/faireBase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);

    const handleLogin = e => {

        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // reset Error  and success
        setRegisterError('')
        setSuccess('')

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);

                if (result.user.emailVerified) {
                    setSuccess('User logged in Successfully')
                }
                else{
                    alert('please verified your email address')
                }

            })
            .catch(error => {
                console.log(error.message);
                setRegisterError(error.message)
            })
    }
    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log('please provide an email', email)
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        ) {
            console.log('please write a valid email')
            return;
        }

        // send validation email
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('please cheek your email')
            })
            .catch(error => {
                console.log(error)
            })

    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body rounded-xl">

                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    ref={emailRef}
                                    placeholder="email"
                                    className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>

                        {
                            registerError && <p className="text-red-300 font-bold">{registerError}</p>
                        }
                        {
                            success && <p className=" text-green-600 font-bold">{success}</p>
                        }
                        <p>New to this Website please <Link className="text-red-600 font-bold underline" to={"/heroregister"}> Register</Link></p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
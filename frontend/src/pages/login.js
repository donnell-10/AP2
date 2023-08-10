import React, {useState} from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;
    
    const onChange = e => setFormData ({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };
    
    if (isAuthenticated) {
        return <Navigate to='/'/>
    }

    return(
        <div>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', background:'#48EF48', width:'100%', border:'1px', borderRadius:'2px', height:'100vh'}}>
                <div style={{textAlign:'center', marginBottom:'50px'}}>
                    <h2 style={{color:'white'}}>Log In</h2>
                    <h4 style={{color:'white'}}>Sign Into Your Account</h4>
                    <form onSubmit={e=>onSubmit(e)}>
                        <div className='form-group' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                            <label className='input-label' style={{color:'white',fontSize:'20px'}}>
                                Email
                            </label>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '150%', marginBottom:'30px' }}>
                                <input
                                    className='form-control'
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    value ={email}
                                    onChange = {e => onChange(e)}
                                    required
                                    style={{width: '100%', maxWidth: '1000px', margin: '0 auto' }}/>
                            </div>
                            <label className='input-label' style={{color:'white',fontSize:'20px'}}>
                                Password
                            </label>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '150%', marginBottom:'40px' }}>
                                <input
                                    className='form-control'
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    value ={password}
                                    onChange = {e => onChange(e)}
                                    minLength = '6'
                                    required
                                    style={{width: '100%', maxWidth: '1000px', margin: '0 auto' }}/>
                            </div>
                        </div>
                        <button className='btn btn-lg' type="submit" style={{background:'black', color:'white', width:'200px'}}>
                            Log In
                        </button>
                    </form>
                    <p className = 'mt-3'>
                        Don't have an account? <Link to= '/register'>Sign Up</Link>
                    </p>
                    <p className = 'mt-3'>
                        Forgot your password? <Link to='/reset-password'>Reset Password</Link>
                    </p>
                </div>

            </div>
        </div>
    )
    // return(
    //     <div className="container mt-5">
    //         <h1>Log In</h1>
    //         <p>Sign into your Account</p>
    //         <form onSubmit={e=> onSubmit(e)}>
    //             <div className="form-group">
    //                 <input
    //                     className = 'form-control'
    //                     type = 'email'
    //                     placeholder="Email"
    //                     name = 'email'
    //                     value ={email}
    //                     onChange = {e => onChange(e)}
    //                     required
    //                 />
    //                 <input
    //                     className = 'form-control'
    //                     type = 'password'
    //                     placeholder="Password"
    //                     name = 'password'
    //                     value ={password}
    //                     onChange = {e => onChange(e)}
    //                     minLength = '6'
    //                     required
    //                 />
    //             </div>
    //             <button className ='btn btn-primary' type='submit'>Log In</button>
    //         </form>
    //         <p className = 'mt-3'>
    //             Don't have an account? <Link to= '/register'>Sign Up</Link>
    //         </p>
    //         <p className = 'mt-3'>
    //             Forgot your password? <Link to='/reset-password'>ResetPassword</Link>
    //         </p>
    //     </div>
    // );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
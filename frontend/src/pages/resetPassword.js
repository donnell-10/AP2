import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../actions/auth";

const ResetPassword = ({reset_password}) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const {email} = formData;
    
    const onChange = e => setFormData ({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    };
    
    if (requestSent) {
        return <Navigate to='/'/>
    }

    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', background:'#48EF48', width:'100%', border:'1px', borderRadius:'2px', height:'100vh'}}>
                <div style={{textAlign:'center', marginBottom:'50px'}}>
                    <h2 style={{color:'white'}}>Request Password Reset</h2>
                    <h4 style={{color:'white'}}>Enter Your Email To Request A New Password</h4>
                    <form onSubmit={e=> onSubmit(e)}>
                        <div className='form-group' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                            <label className='input-label' style={{color:'white',fontSize:'20px'}}>
                                Email
                            </label>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '150%', marginBottom:'30px' }}>
                                <input
                                    className = 'form-control'
                                    type = 'email'
                                    placeholder="Email"
                                    name = 'email'
                                    value ={email}
                                    onChange = {e => onChange(e)}
                                    required
                                    style={{width: '100%', maxWidth: '1000px', margin: '0 auto' }}
                                />
                            </div>
                        </div>
                        <button style={{background:'black', color:'white', width:'300px'}} type = 'submit' className="btn btn-lg ">
                            Request Password Reset
                        </button>
                    </form>

                </div>
                

            </div>
        </div>
    );
};



export default connect(null, {reset_password})(ResetPassword);
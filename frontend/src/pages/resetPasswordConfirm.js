import React, {useState} from "react";
import {Navigate, useMatch } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth";

const ResetPasswordConfirm = ({reset_password_confirm}) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const {new_password, re_new_password} = formData;
    
    const onChange = e => setFormData ({...formData, [e.target.name]: e.target.value});
    let match = useMatch('/password/reset/confirm/:uid/:token');
    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };
    
    if (requestSent) {
        return <Navigate to='/'/>
    }

    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', background:'#48EF48', width:'100%', border:'1px', borderRadius:'2px', height:'100vh'}}>
                <div style={{textAlign:'center', marginBottom:'50px'}}>
                <h2 style={{color:'white'}}>Create A New Password</h2>
                <form onSubmit={e=> onSubmit(e)}>
                    <div className='form-group' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <label className='input-label' style={{color:'white',fontSize:'20px'}}>
                        New Password
                    </label>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '150%', marginBottom:'30px' }}>
                        <input
                            className='form-control'
                            type='password'
                            name='new_password'
                            placeholder='New Password'
                            value ={new_password}
                            onChange = {e => onChange(e)}
                            required
                            minLength='6'
                            style={{width: '100%', maxWidth: '1000px', margin: '0 auto' }}
                        />
                    </div>
                    <label className='input-label' style={{color:'white',fontSize:'20px'}}>
                        Confirm New Password
                    </label>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '150%', marginBottom:'30px' }}>
                        <input
                        className='form-control'
                        type='password'
                        name='re_new_password'
                        placeholder='Confirm New Password'
                        value ={re_new_password}
                        onChange = {e => onChange(e)}
                        required
                        minLength='6'
                        style={{width: '100%', maxWidth: '1000px', margin: '0 auto' }}
                        />
                    </div>
                    </div>            
                    <button
                    style={{background:'black', color:'white', width:'300px'}}
                    type = 'submit'
                    className="btn btn-lg "
                    >
                        Reset Password
                    </button>
                </form>
    
                
                </div>
            </div>
        </div>
       
    );
};



export default connect(null, {reset_password_confirm})(ResetPasswordConfirm);
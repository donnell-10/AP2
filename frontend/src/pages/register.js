import React, {useState} from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../actions/auth";
import DatePicker from 'react-datepicker';

const Register = ({register, isAuthenticated}) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        dob: false,
        email: '',
        password: '',
        re_password: '',
      });

    const {name, dob, email, password, re_password} = formData;
    
    const onChange = e => setFormData ({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            register(name, (JSON.stringify(dob).substring(1,11)), email, password, re_password);
            setAccountCreated(true);
          } else {
            alert('Passwords do not match.');
          }
    };
    
    if (isAuthenticated) {
        return <Navigate to='/'/>
    }

    if (accountCreated) {
        return <Navigate to='/login' />
    }

    return(
        <div>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', background:'#48EF48', width:'100%', border:'1px', borderRadius:'2px', height:'120vh',}}>
            <div style={{textAlign:'center', marginBottom:'50px', }}>
                <h2 style={{color:'white'}}>Register</h2>
                <h4 style={{color:'white'}}>Create An Account</h4>
                <form onSubmit={e=> onSubmit(e)}>
                    <div className='form-group' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <label className='input-label' style={{color:'white',fontSize:'20px'}}>
                            Name
                    </label>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '150%', marginBottom:'20px' }}>
                        <input
                            className='form-control'
                            type='text'
                            name='name'
                            placeholder='Name*'
                            value ={name}
                            onChange = {e => onChange(e)}
                            required
                            style={{width: '100%', maxWidth: '1000px', margin: '0 auto' }}/>
                    </div>
                    <label className='input-label' style={{color:'white',fontSize:'20px'}}>
                    Date Of Birth
                    </label>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '150%', marginBottom:'20px' }}>
                        <DatePicker 
                            dateFormat="dd/MM/yyyy"
                            selected={dob}
                            name ="dob"
                            placeholderText="Date of Birth*"
                            showYearDropdown={true}
                            calendarStartDay = {1}
                            onKeyDown = {e => {if (e.key === 'Enter') e.preventDefault()}}
                            onChange={(date) => setFormData({ ...formData, dob: date })}
                            required                           
                        />
                    </div>
                    <label className='input-label' style={{color:'white',fontSize:'20px'}}>
                    Email
                    </label>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '150%', marginBottom:'20px' }}>
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
                    <div style={{ display: 'flex', justifyContent: 'center', width: '150%', marginBottom:'20px' }}>
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
                    <label className='input-label' style={{color:'white',fontSize:'20px'}}>
                    Confirm Password
                    </label>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '150%', marginBottom:'30px' }}>
                        <input
                            className='form-control'
                            type='password'
                            name='re_password'
                            placeholder='Confirm Password'
                            value ={re_password}
                            onChange = {e => onChange(e)}
                            minLength = '6'
                            required
                            style={{width: '100%', maxWidth: '1000px', margin: '0 auto' }}/>
                    </div>
                </div>
                <button className='btn btn-lg' type='submit' style={{background:'black', color:'white', width:'200px'}}>
                    Register
                </button>
                </form>        
                <p className = 'mt-3'>
                Already have an account? <Link to= '/login'>Sign In</Link>
                </p>
            </div>
            </div>
        </div>    
    )
    // return(
    //     <div className="container mt-5">
    //         <h1>Register</h1>
    //         <p>Create An Account</p>
    //         <form onSubmit={e=> onSubmit(e)}>
    //             <div className="form-group">
    //                 <input
    //                     className = 'form-control'
    //                     type = 'text'
    //                     placeholder="Name*"
    //                     name = 'name'
    //                     value ={name}
    //                     onChange = {e => onChange(e)}
    //                     required
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <div>
                        // <DatePicker
                            
                        //     dateFormat="dd/MM/yyyy"
                        //     selected={dob}
                        //     name ="dob"
                        //     placeholderText="Date of Birth*"
                        //     showYearDropdown={true}
                        //     calendarStartDay = {1}
                        //     onKeyDown = {e => {if (e.key === 'Enter') e.preventDefault()}}
                        //     onChange={(date) => setFormData({ ...formData, dob: date })}
                        //     required
                        // />
    //                 </div>
    //                 {/* <div className="input-group date" data-provide="datepicker">
    //                     <input
    //                         type='text'
    //                         className="form-control"
    //                         placeholder="Date of Birth ~ dd/MM/yyyy*"
    //                         id="datepicker"
    //                         onChange={e => onChange(e)}
    //                     />                   
    //                     <div class="input-group-addon">
    //                         <span class="glyphicon glyphicon-th"></span>
    //                     </div>
    //                 </div> */}
    //             </div>
    //             <div className="form-group">
    //                 <input
    //                     className = 'form-control'
    //                     type = 'email'
    //                     placeholder="Email*"
    //                     name = 'email'
    //                     value ={email}
    //                     onChange = {e => onChange(e)}
    //                     required
    //                 />
 
    //             </div>
    //             <div>
    //                 <input
    //                         className = 'form-control'
    //                         type = 'password'
    //                         placeholder="Password"
    //                         name = 'password'
    //                         value ={password}
    //                         onChange = {e => onChange(e)}
    //                         minLength = '6'
    //                         required
    //                     />
    //             </div>
    //             <div>
    //                 <input
    //                         className = 'form-control'
    //                         type = 'password'
    //                         placeholder="Confirm Password"
    //                         name = 're_password'
    //                         value ={re_password}
    //                         onChange = {e => onChange(e)}
    //                         minLength = '6'
    //                         required
    //                     />
    //             </div>
    //             <button className ='btn btn-primary' type='submit'>Register</button>
    //         </form>
            // <p className = 'mt-3'>
            //     Already have an account? <Link to= '/login'>Sign In</Link>
            // </p>
    //     </div>
    // );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register})(Register);
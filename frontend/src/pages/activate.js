import React, {useState} from "react";
import { Navigate, useMatch } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";

const Activate = ({verify}) => {
    const [verified, setVerified] = useState(false);
    let match = useMatch('/activate/:uid/:token');
    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);
    };
    
    if (verified) {
        return <Navigate to='/'/>
    }

    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', background:'#48EF48', width:'100%', border:'1px', borderRadius:'2px', height:'100vh'}}>
                <div style={{textAlign:'center', marginBottom:'50px'}}>
                    <h1 style={{color:'white'}}>Verify your Account</h1>
                    <button onClick={verify_account}
                    style={{background:'black', color:'white', width:'300px'}}
                    type = 'button'
                    className="btn btn-lg"
                    >
                        Verify
                    </button>
                </div>
            </div>
            
        </div>
    );
};


export default connect(null, {verify})(Activate);
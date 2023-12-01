import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { database } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";

function ForgetPasswordSection(){
    const history = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const emalVal = e.target.email.value;
        sendPasswordResetEmail(database,emalVal).then(data=>{
            alert("Check your gmail")
            history("/register")
        }).catch(err=>{
            alert(err.code)
        })
    }
    return(
        <div className="reset">
            <h1>Forgot Password</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <p>Email:</p>
                <input name="email" /><br/><br/>
                <button>Reset</button>
            </form>
        </div>
    )
}
export default ForgetPasswordSection;
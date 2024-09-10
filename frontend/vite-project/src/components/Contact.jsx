import React, { useState } from 'react';
import "../App.css"

function Contact() {
    const [formData,setformData]=useState({name:"",email:"", message:""});
    const [status,setStatus]=useState("");

    function handleChange(e){
      setformData({...formData , [e.target.name]:e.target.value
    });
   }

    async function handleSubmit(e){
        e.preventDefault();
        setStatus("Sending.....");

       try{
        const response=await fetch('https://nodemailer-nfe1.onrender.com/submit' ,{
            method:"POST" ,
            headers:{"content-Type": "application/json"},
            body:JSON.stringify(formData)
        })
        if(response.ok){
            setStatus("message sent Successfully");
        }
        else{
            setStatus("Error !! Someting went wrong");
        }
    }
    catch(err){
        setStatus("Error Sending message" + err);
    }
    }

  return (
   <>
     <div className="form-container">

        <form onSubmit={handleSubmit}>
            <h2>Contact Us</h2>
            <input 
             type="text"
             name='name'
             value={formData.name}
             onChange={handleChange}
             placeholder='Your name'
             required
            />

            <input 
            type="email"
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Your email'
            required />

            <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder='Your message'
            required
            ></textarea>

            <button type='submit'>Send Message</button>
            <p>{status}</p>
        </form>
     </div>
   </>
  )
}

export default Contact;
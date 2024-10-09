import React, { useState } from 'react';
import axios from 'axios';
import styles from"./Style/ContactUs.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane} from'@fortawesome/free-regular-svg-icons'
import {faPhone,faMapLocationDot} from'@fortawesome/free-solid-svg-icons'

const ContactUs = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

  
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/ContactUs',
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        message: message,
      }
    })
    .then(function (response) {
      
      console.log('Server Response:', response.data);
    })
    .catch(function (error) {
      
      console.error('Error submitting form:', error);
    });
  };

  return (

    <div className='contactpage'>
      <div className='left'>
        <div className='rightcontainer'>
        <h1>Contact Information</h1>
      <ul className='footerMenu contactFooter d-flex flex-column align-items-center justify-content-center gap-2'>
                            <li>
                                <a><FontAwesomeIcon className='fafooter' icon={faPaperPlane}/><i className="footerLink">CineTicketBooking@gmail.com</i></a>
                            </li>
                            <li><a><FontAwesomeIcon className='fafooter' icon={faPhone} /> <i className="footerLink">6998989898</i></a></li>
                            <li><a><FontAwesomeIcon className='fafooter' icon={faMapLocationDot}/> <i className="footerLink">University of Pireaus, Karaoli & Dimitriou 80</i></a></li>
                            
                        </ul>
      <iframe className='map'src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5770.744440797834!2d23.65201386303523!3d37.94162434190397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bbe5bb8515a1%3A0x3e0dce8e58812705!2zzqDOsc69zrXPgM65z4PPhM6uzrzOuc6_IM6gzrXOuc-BzrHOuc-Oz4IgKM6gzpEuzqDOlc6ZLik!5e0!3m2!1sel!2sgr!4v1707671616494!5m2!1sel!2sgr" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
      <div className='right'>
      <h1>Contact Us</h1>
      <form className='contactform' onSubmit={handleFormSubmit}>
      <div className='contactelement'>
        <label className='contactlabel'>
          <a>Name</a>
          </label>
          <input className="contactus_input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <br />
        <div className='contactelement'>
        <label className='contactlabel'>
          <a>Email</a>
          </label>
          <input className="contactus_input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <br />
        <div className='contactelement'>
          <label className='contactlabel'>
            <a>How can we help?</a>
            </label>
            <textarea className="contactus_textarea" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <br/>
        <button className ='submitbutton' type="submit">Submit</button>
      </form>
      </div>
      
    </div>
  );
};

export default ContactUs;

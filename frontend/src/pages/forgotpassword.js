import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './forgotpassword.css';  
import { EmailContext } from './EmailContext';

function ForgotPassword() {
  const { email,setEmail } = useContext(EmailContext);
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [email, setEmail] = useState('');
 // const [inputemail, setInputEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
     // setEmail(e.target.value);
      setEmail(e.target.value);
  };


  const handleSubmit = async (e) => {
      e.preventDefault();
      setEmail(email);
      try {
          const response = await fetch('http://localhost:5000/api/send-code', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email }),
          });
          const result = await response.json();
          if (response.ok) {
              console.log('Verification code sent:', result.message);
              navigate('/verifycode');
          } else {
              console.error('Error:', result.message);
              alert(result.message);
          }
      } catch (error) {
          console.error('Error sending code:', error);
      }
  };

  return (
    <div className="body-forgotpass">
    <div className="forgotpassword-container">
        <div className="forgot-password-box">
            <h2 className="forgotpassword-heading">Forgot your password?</h2>
            <p className="forgotpassword-description">
                Don't worry, happens to all of us. Enter your email below to recover your password.
            </p>
            <form onSubmit={handleSubmit} className="forgotpassword-form">
                <div className="forgotpassword-input-group">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className={email ? 'forgotpassword-filled' : ''}
                    />
                    <label htmlFor="email" className="forgotpassword-label">Email</label>
                </div>
                <button type="submit" className="forgotpassword-submit-button">Submit</button>
            </form>
            <Link to="/login" className="forgotpassword-login-alternative">← Back to login</Link>
        </div>
    </div>
    </div>
);
}

export default ForgotPassword;

 
//   return (
//     <div className ="forgot-password-page">
//     <div className="container">
//       <h2>Forgot your password?</h2>
//       <p>Don't worry, it happens to everyone. Enter your email below to recover your password.</p>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           placeholder="Enter your Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//          <Link to="/verifycode" className="submit-link">
//   <button type="button">Submit</button>
// </Link>
 
         
//       </form>
      
//       <a href="/login" className="back-link">Back to login</a>
   
//     </div>
//     </div>
//   );
// }
 
// export default ForgotPassword;
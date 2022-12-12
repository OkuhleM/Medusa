import React, { useState } from 'react';
import PasswordChecklist from "react-password-checklist"

function Register() {

  const [usersDetails, setUsersDetails] = useState({
    name: "", username: "", email: "",
    phoneNumber: "", gender: "", birthDate: ""
  })
  const [password, setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")

  const handleChange = e => {
    e.preventDefault()
    console.log('handleChange:', usersDetails)
    setUsersDetails({ ...usersDetails, [e.target.name]: e.target.value })
  }

console.log('password:', password)
console.log('confirmPassword:', confirmPassword)

  return (
    <div>
      <div className='signUp-form'>
        
        <input type='text' placeholder="Name" onChange={handleChange} name="name" />
        <input type='text' placeholder="Username" onChange={handleChange} name="username" />
        <input type='email' placeholder="Email" onChange={handleChange} name="email" />
        <input type='tel' placeholder="PhoneNumber" onChange={handleChange} name="phoneNumber" />
        <input type='password' placeholder="Enter Password" onChange={e => setPassword(e.target.value)} name="password" />
        <input type='password' placeholder="Confirm Password"  onChange={e => setConfirmPassword(e.target.value)} name="confirmPassword" />

        <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={8}
				value={password}
				valueAgain={confirmPassword}
				messages={{
					minLength: "Password should contain 8 characters.",
					specialChar: "Password should contain a special character.",
					number: "Password should contain a number.",
					capital: "Password should contain ann uppercase.",
					match: "Password match.",
				}}
			/>

        <select name="gender" onChange={handleChange}>
          <option value="none" selected disabled>Please select your Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <br />
        <label>Birth Date:</label>
        <input type='date' name="birthDate" onChange={handleChange} />

        <button>signUp</button>

      </div>
    </div>
  )
}

export default Register
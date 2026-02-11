import './App.css';
import { useState } from 'react';
import logo from './logo.svg';

export default function App() {

const [firstName,setFirstName]= useState("");
const [lastName,setLastName]=useState(" ")


//   Create guest on form submission line 17

  return (
    <div className="App">


      <form >
        <label htmlFor='first'>First Name</label>
        <input type="text" value={firstName}></input>
        <label htmlFor='last'>Last Name</label>
        <input type="text" value={lastName}id="last"></input>
      </form>

    </div>
  );
}

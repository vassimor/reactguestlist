import './App.css';
import { useEffect, useState } from 'react';
import logo from './logo.svg';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guestList, setGuestlist] = useState([]);


     function handleToggle(id,attending){
    //  setGuestlist([...guestList,guest.isAttending===true])
    const newguestList=[...guestList];
    console.log(newguestList);
    const attendingGuest=newguestList.find((guest)=>guest.id===id)
    attendingGuest.isAttending=attending;
    console.log(attendingGuest);
    console.log(attending);
    // setGuestlist(newguestList)

  }

  function handleDelete(guest) {
    setGuestlist(guestList.filter((member) => member.id !== guest.id));}



  function handleSubmit() {
    const id = guestList.length + 1;
      setGuestlist([
      ...guestList,
      {
        id: id,
        firstName: firstName,   // The data structure is important
        lastName: lastName,
        isAttending: false,
      },
    ]);
    setFirstName("");
    setLastName("");


  }



  return (
    <div className="App">
      <header>This is a Guest List App</header>

      <form
        style={{ marginTop: '50px' }}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="first">First Name</label>
        <input
          type="text"
          id="first"
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
        <label htmlFor="last">Last Name</label>
        <input
          type="text"
          value={lastName}
          id="last"
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {guestList.map((guest) => {
        return (
          <div key={guest.id} data-test-id="guest">
            {guest.firstName} {guest.lastName}{' '}
            {guest.isAttending ? 'Attending' : 'Not Attending'}
            <button onClick={()=>handleDelete(guest)}>Delete</button>
            <input type="checkbox" 
                   aria-label ={`${guest.firstName} ${guest.lastName} attending status`}

            onChange={()=>{
              console.log("guestid",guest.id)

              // handleToggle(guest.id,!guest.isAttending)
              }}

                  >

              </input>
          </div>
        );
      })}
    </div>
  );
}

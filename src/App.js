import './App.css';
import { useEffect, useState } from 'react';
import logo from './logo.svg';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guestList, setGuestlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = 'https://express-guest-list-api-memor-rppfmfj6w2ky.vassimor.deno.net/';

  async function handleToggle(id, isAttending) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !isAttending }),
    });
    const updatedGuest = await response.json();

    const newGuestList = guestList.filter(
      (guest) => guest.id !== updatedGuest.id,
    );

    setGuestlist([...newGuestList, updatedGuest]);
  }

  async function handleDelete(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();

    setGuestlist(guestList.filter((person) => person.id !== deletedGuest.id));
  }

  async function handleSubmit() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });

    const createdGuest = await response.json();

    setGuestlist([...guestList, createdGuest]);

    setFirstName('');
    setLastName('');
  }

  async function fetchGuests() {
    const response = await fetch(`${baseUrl}/guests`);
    const allGuests = await response.json();
    setGuestlist(allGuests);
  }

  useEffect(() => {
    console.log('inside use effect', guestList);
    fetchGuests();
    console.log('after fetch', guestList);
    setIsLoading(false)
  }, []);

  return (
    <div className="App">
      <header>This is a Guest List App</header>

      <form
        style={{ marginTop: '50px' }}
        onSubmit={async (event) => {
          event.preventDefault();
          await handleSubmit();
        }}
      >
        <label htmlFor="first">First Name</label>
        <input disabled={isLoading}
          type="text"
          id="first"
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
        <label htmlFor="last">Last Name</label>
        <input disabled={isLoading}
          type="text"
          value={lastName}
          id="last"
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        guestList.map((guest) => {
          return (
            <div key={guest.id} data-test-id="guest">
              {guest.firstName} {guest.lastName}{' '}
              {guest.attending ? 'Attending' : 'Not Attending'}
              <button onClick={() => handleDelete(guest.id)}>Delete</button>
              <input
                type="checkbox"
                aria-label={`${guest.firstName} ${guest.lastName} attending status`}
                onChange={() => handleToggle(guest.id, guest.attending)}
              ></input>
            </div>
          );
        })
      )}
    </div>
  );
}

import { useEffect, useState } from "react";

// Interface describing the data we are fetching from API
export interface User {
  title: string;
  first: string;
  last: string;
  phone: string;
  email: string;
  age: number;
  picture: string;
}

function ContactCard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Make API call on page render
  // Warning: because React renders components 2 times in the development environment, API is called twice
  // This is not a bug, this is React's feature
  useEffect(() => {
    makeApiCall();
  }, []);

  const makeApiCall = () => {
    fetch('https://randomuser.me/api/')
      // Convert json into object
      .then(response => response.json())
      // Read data and create an instance of the user
      .then(payload => {
        console.log(payload);

        const data = payload.results[0];
        setUser({
          title: data.name.title,
          first: data.name.first,
          last: data.name.last,
          phone: data.phone,
          email: data.email,
          age: data.dob.age,
          picture: data.picture.large
        });
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.toString());
      });
    setLoading(false);
  }


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;

  return (
    <div>
      <img className="contactCardPicture" src={user.picture} alt="User" />
      <div className="contactCard">
        <ul>
          <li><strong>Title:</strong> {user.title}</li>
          <li><strong>First Name:</strong> {user.first}</li>
          <li><strong>Last Name:</strong> {user.last}</li>
        </ul>
        <ul>
          <li><strong>Phone:</strong> {user.phone}</li>
          <li><strong>Email:</strong> {user.email}</li>
          <li><strong>Age:</strong> {user.age}</li>
        </ul>
      </div>
      <hr />
      <button className="apiButton" onClick={makeApiCall}>Make API Call</button>
      <br />
    </div>
  );
}


export default ContactCard;
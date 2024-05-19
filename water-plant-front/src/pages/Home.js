//  import React from 'react'
// import './css/Home.css'

// const Home = () => {
//   return (
//       <div>
//          <h1>Home</h1>
//       {/* Add the link to the localhost URL */}
//       <a href="http://127.0.0.1:5000/">Take me to my plant</a>
//       </div>
//   )
// }

// export default Home;


import React from 'react';
import './css/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to HydroPal!</h1>
      <a className="home-link" href="http://127.0.0.1:5000/">Take me to my plant</a>
    </div>
  );
}

export default Home;

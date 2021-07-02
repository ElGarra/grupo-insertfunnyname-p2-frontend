import React from 'react';
import './App.scss';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import IndexCards from '../IndexCards/IndexCards';

function App() {
  return (
    <div className="App">
      <Navbar />
      <IndexCards />
      <Footer />
    </div>
  );
}

export default App;

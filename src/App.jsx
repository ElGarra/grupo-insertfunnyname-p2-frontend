import React from 'react';
import Footer from './components/Footer/Footer';
import Routes from './routes/Routes';
import Navbar from './components/Navbar/Navbar';

const App = () => (
  <div className="App">
    <Navbar />
    <Routes />
    <Footer />
  </div>
);

export default App;

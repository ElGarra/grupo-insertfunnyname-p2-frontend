import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';

const App = () => (
  <div className="App">
    <Router>
      <Routes />
    </Router>
  </div>
);

// function App() {
//   return (
//     <Router>
//       <Routes />
//     </Router>
//   );
// }

export default App;

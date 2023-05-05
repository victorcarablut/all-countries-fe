import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Home from './components/Home';
import Footer from './components/Footer';
import NotFound from './components/other/NotFound';

// Notifications
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div>
      <Router>
        <Toaster position="bottom-right" reverseOrder={false} />
        <main>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
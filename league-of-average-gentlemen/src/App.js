import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigation-bar/navigation-bar.component';
import ContactInfo from './components/contact-info/contact-info.component';
import AboutComponent from './components/about/about.component';
import Home from './components/home/home.component';
import NotFound from './components/not-found/notfound';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutComponent />} />
          <Route path="/contact" element={<ContactInfo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


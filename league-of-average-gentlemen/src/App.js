import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutComponent from './components/about/about.component';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={AboutComponent} /> {/* Include the AboutComponent */}
          <Route path="/contact" component={ContactInfo} />
          <Route component={NotFound} /> {/* Fallback for unmatched routes */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;


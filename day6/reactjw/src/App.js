import React from 'react';
import './App.css';
import Header from './components/Header'
import Homepage from './pages/Homepage'
import About from './pages/about'
import {Route,Switch} from 'react-router-dom'

class App extends React.Component {
  state = {  }
  render() { 
    return (
      <div>
        <section className="section1">
          <Header/>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/about' component={About}/>
          </Switch>
        </section>

      </div>
      );
  }
}
 
export default App;



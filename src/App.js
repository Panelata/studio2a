import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';

import Login from './Components/login';
import Home from './Components/home';
import NewAssignment from './Components/newAssignment';
import StudentEntry from './Components/studentEntry';

import Layout from './Components/Layout';
import auth from './Components/auth';
import React from 'react';

function App() {
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(()=>{
    setAuthenticated(auth.isAuthenticated());
  }, []);

  const checkLogin = () =>{
    setAuthenticated(auth.isAuthenticated());
  }

  return (
    <div className="App">
      {authenticated ?
      <Switch>
        {/* Declare page routes here */}
        <RouteWrapper path='/home' exact component={Home} layout={Layout} />
        <RouteWrapper path='/new-task' component={NewAssignment} layout={Layout} />
        <RouteWrapper path='/join-task' component={StudentEntry} layout={Layout} />

        {/* If the route doesn't exist, default to /home */}
        <Redirect to='/home' />
      </Switch>
      :
      <Switch>
        <RouteWrapper path='/login' exact component={()=><Login checkLogin={checkLogin}/>} layout={Layout} />
        <Redirect to='/login' />
      </Switch>
      }
    </div>
  );
}

function RouteWrapper({
  component: Component,
  layout: Layout,
  ...rest
}) {
  return (
    <Route {...rest} render={(props) =>
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    } />
  );
}

export default App;

import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';

import Login from './components/Login/login';
import AdminHome from './components/adminHome';
import AdminClass from './components/adminClass';
import StudentEntry from './components/studentEntry';
import StudentHome from './components/studentHome';
import Register from './components/register';
import StudentClass from './components/studentClass';
import AdminProject from './components/adminProject';
import CreateSubject from './components/createSubject';
import StudentProject from './components/studentProject';
import Layout from './components/Layout';
import auth from './components/auth';
import React from 'react';

function App() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [userType, setUserType] = React.useState('');

  React.useEffect(() => {
    setAuthenticated(auth.isAuthenticated());
  }, []);

  const checkLogin = () => {
    setAuthenticated(auth.isAuthenticated());
    setUserType(auth.getUserType());
  }

  return (
    <div className="App">
      {authenticated ?
        (userType === "student" &&
          <Switch>
            {/* Declare Student routes here */}
            <RouteWrapper path='/join-task' component={StudentEntry} layout={Layout} />
            <RouteWrapper path='/student-home' component={StudentHome} layout={Layout} />
            <RouteWrapper path='/student/class' exact component={StudentClass} layout={Layout} />
            <RouteWrapper path='/student/class/project' exact component={AdminProject} layout={Layout} />
            {/* If the route doesn't exist, default to /home */}
            <Redirect to='/student-home' />
          </Switch>
        ) ||
        (userType === "admin" &&
          <Switch >
            {/* Declare Admin routes here */}
            < RouteWrapper path='/admin-home' exact component={AdminHome} layout={Layout} />
            <RouteWrapper path='/admin/register' exact component={Register} layout={Layout} />
            <RouteWrapper path='/admin/class/project' component={AdminProject} layout={Layout} />
            <RouteWrapper path='/admin/class/create' component={CreateSubject} layout={Layout} />
            <RouteWrapper path='/admin/class' component={AdminClass} layout={Layout} />
            {/* If the route doesn't exist, default to /home */}
            <Redirect to='/admin-home' />
          </Switch>
        )
        :
        <Switch>
          <RouteWrapper path='/login' exact component={() => <Login checkLogin={checkLogin} />} layout={Layout} />
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

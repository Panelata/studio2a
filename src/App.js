import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './Components/login';
import Home from './Components/home';
import NewAssignment from './Components/newAssignment';
import StudentEntry from './Components/studentEntry';

import Layout from './Components/Layout';

function App() {
  return (
    <div className="App">
      <Switch>
        {/* Declare page routes here */}
        <RouteWrapper path='/login' exact component={Login} layout={Layout} />
        <RouteWrapper path='/home' exact component={Home} layout={Layout} />
        <RouteWrapper path='/new-task' component={NewAssignment} layout={Layout} />
        <RouteWrapper path='/join-task' component={StudentEntry} layout={Layout} />
        {/* If the route doesn't exist, default to /home */}
        <Redirect to='/home' />
      </Switch>
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

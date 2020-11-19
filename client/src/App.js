import './App.css';
import Posts from './components/Posts';
import Register from './components/Register';
import { Container, Header, Segment, Icon, Button } from 'semantic-ui-react';
import { Link, Route, Switch } from 'react-router-dom';
import PostDetail from './components/PostDetail';
import Login from './components/login';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './redux/action';

function App() {
  const user = useSelector(state => state);
  console.log(user);

  const dispatch = useDispatch();
  function logout() {
    dispatch(setUser(null));
  }

  return (
    <Container>
      <Header textAlign='center' as='h2' icon>
        <Icon color='black' name='edit outline' />
        <Link to='/'>Daily</Link>
        <Header.Subheader>Write your Daily</Header.Subheader>
      </Header>

      {/* Register button */}
      {user ? (
        <div className='logbutton'>
          {user.name}
          <Button onClick={logout} as={Link} to='/'>
            Logout
          </Button>
        </div>
      ) : (
        <div className='logbutton'>
          <Button as={Link} to='/register'>
            Sign in
          </Button>
          <Button as={Link} to='/login'>
            Log in
          </Button>
        </div>
      )}

      <Segment vertical>
        <Switch>
          <Route path='/' exact component={Posts} />
          <Route path='/post/:postId' component={PostDetail} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          {/* Fallback Page - 404 */}
          <Route>
            <Segment vertical textAlign='center'>
              <Header>404 - Page not found</Header>
              <Link to='/'>Click here to return home</Link>
            </Segment>
          </Route>
        </Switch>
      </Segment>
    </Container>
  );
}

export default App;

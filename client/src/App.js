import './App.css';
import Posts from './components/Posts';
import Register from './components/Register';
import { Container, Header, Segment, Icon, Button } from 'semantic-ui-react';
import { Link, Route, Switch } from 'react-router-dom';
import PostDetail from './components/PostDetail';
import Login from './components/login';

function App() {
  return (
    <Container>
      <Header textAlign='center' as='h2' icon>
        <Icon justify-content='center' color='black' name='edit outline' />
        <Link to='/'>Daily</Link>
        <Header.Subheader>Write your Daily</Header.Subheader>
      </Header>
      {/* Register button */}
      <Button as={Link} to='/register'>
        Sign in
      </Button>
      <Button as={Link} to='/login'>
        Log in
      </Button>
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

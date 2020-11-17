import './App.css';
import Posts from './components/Posts';
import { Container, Header, Segment, Icon } from 'semantic-ui-react';
import { Link, Route, Switch } from 'react-router-dom';
import PostDetail from './components/PostDetail';

function App() {
  return (
    <Container>
      <Header textAlign='center' as='h2' icon>
        <Icon color='black' name='edit outline' />
        Daily
        <Header.Subheader>Write your Daily</Header.Subheader>
      </Header>
      <Segment vertical>
        <Switch>
          <Route path='/' exact component={Posts} />
          <Route path='/post/:postId' component={PostDetail} />
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

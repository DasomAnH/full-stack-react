import React, { Component, useState } from 'react';
import { Button, Form, Header, Label, Input } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const history = useHistory();

  const handleLogin = e => {
    fetch('/api/v1/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('success login');
          history.push('/');
        }
        console.log(data);
      });
  };

  return (
    <Form>
      <Label>
        <Header>Log In </Header>
        <Input
          required
          name='email'
          type='email'
          placeholder='email'
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <Input
          required
          name='password'
          type='password'
          placeholder='password'
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </Label>
      <Button onClick={handleLogin} type='submit' value='Submit'>
        login
      </Button>
    </Form>
  );
}

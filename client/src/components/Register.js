import React, { Component } from 'react';
import { Button, Form, Header, Label, Input } from 'semantic-ui-react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/v1/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('successfully create user');
          this.props.history.push('/login');
        }
        console.log(data);
      });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label>
          <Header>Register </Header>
          <Input
            placeholder='FullName'
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Input
            placeholder='email'
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
          />

          <Input
            placeholder='password'
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
        </Label>
        <Button type='submit' value='Submit'>
          Submit
        </Button>
      </Form>
    );
  }
}
export default Register;

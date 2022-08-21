import React, { useState } from 'react'
import { Container, Form, Button, Card } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/login', {
        email: email,
        password: password
      });
      navigate({ pathname: "/dashboard" });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <div>
      <Container style={{ height: '100vh' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: "100%",
          height: '100%'
        }}>
          <Card style={{ width: '50%' }}>
            <Card.Body>
              <Card.Title className="text-center">Login Menu</Card.Title>
              <Card.Text>
                <form onSubmit={Auth}>
                  <p className="text-center">{msg}</p>
                  <div>
                    <Form.Label htmlFor="email">Email or Username</Form.Label>
                    <Form.Control type="email" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                  </div>
                  <div className='mt-3'>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <Button variant='success' type='submit'>Login</Button>
                  </div>
                </form>
              </Card.Text>
              <Card.Link className='float-end' href='/register'>Register Account</Card.Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  )
}

export default Login

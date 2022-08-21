import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const EditData = () => {

  const location = useLocation();

  const [name, setName] = useState(location.state.name);
  const [email, setEmail] = useState(location.state.email);
  const [dateOfBirth, setDateOfBirth] = useState(location.state.dateOfBirth);
  const [skill, setSkill] = useState(location.state.skill);
  const [node, setNode] = useState(location.state.node);
  const [react, setReact] = useState(location.state.react);
  const [sql, setSql] = useState(location.state.sql);
  const [nonSql, setNonSql] = useState(location.state.nonSql);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate({ pathname: "/" });
      }
    }
  }

  const UpdateData = async (e) => {
    e.preventDefault();
    const body = {
      id: location.state.id,
      name: name,
      email: email,
      dateOfBirth: dateOfBirth,
      node: node,
      react: react,
      sql: sql,
      nonSql: nonSql
    }
    try {
      const response = await axios.put('http://localhost:5000/users', body);
      setMsg(response.data.msg);
      alert(response.data.msg);
      navigate({ pathname: "/dashboard" });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  const CheckedAllSkill = (e) => {
    if (e === true) {
      setNode(true);
      setReact(true);
      setSql(true);
      setNonSql(true);
    } else {
      setNode(false);
      setReact(false);
      setSql(false);
      setNonSql(false);
    }
  }

  const IsChecked = (e) => {
    if (e === false) {
      setSkill(false);
    } else {
      const item = [document.getElementById('node').checked,
      document.getElementById('react').checked,
      document.getElementById('sql').checked,
      document.getElementById('nonSql').checked];
      console.log(item);
      item.forEach((data, index, arr) => {
        if (data === true) {
          if (index === parseInt(item.length - 1)) {
            setSkill(true)
          } else {
            setSkill(false);
            arr.length = index + 1;
          }
        } else {
          setSkill(false)
          arr.length = index + 1;
        }
      })
    }
  }

  return (
    <div>
      <Container>
        <div>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Edit Data</Card.Title>
              <Card.Text>
                <form onSubmit={UpdateData}>
                  <p className="text-center">{msg}</p>
                  <div>
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                  </div>
                  <div className='mt-3'>
                    <Form.Label htmlFor="email">Email or Username</Form.Label>
                    <Form.Control type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                  </div>
                  <div className='mt-3'>
                    <Form.Label htmlFor="dateOfBirth">Date of Birth</Form.Label>
                    <Form.Control type="date" className="input" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}></Form.Control>
                  </div>
                  <div className='mt-3'>
                    <Form.Label htmlFor="skill">Skill</Form.Label>
                    <Form.Check type='checkbox' label={'Web Developer'} onChange={(e) => { setSkill(e.target.checked); CheckedAllSkill(e.target.checked) }} checked={skill} />
                    <Row>
                      <Col>
                        <Form.Check type='checkbox' id='node' label={'Node Js'} onClick={(e) => { setNode(e.target.checked); IsChecked(e.target.checked) }} checked={node} />
                      </Col>
                      <Col>
                        <Form.Check type='checkbox' id='react' label={'React'} onClick={(e) => { setReact(e.target.checked); IsChecked(e.target.checked) }} checked={react} />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Check type='checkbox' id='sql' label={'DB SQL'} onClick={(e) => { setSql(e.target.checked); IsChecked(e.target.checked) }} checked={sql} />
                      </Col>
                      <Col>
                        <Form.Check type='checkbox' id='nonSql' label={'DB Non SQL'} onClick={(e) => { setNonSql(e.target.checked); IsChecked(e.target.checked) }} checked={nonSql} />
                      </Col>
                    </Row>
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <Button variant='success' type='submit'>Update Data</Button>
                  </div>
                </form>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  )
}

export default EditData

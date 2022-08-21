import React, { useState, useEffect } from 'react'
import { Container, Button, ButtonGroup, Table } from "react-bootstrap";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import NavBar from "./Navbar";

const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
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

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get('http://localhost:5000/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const getUsers = async () => {
    const response = await axiosJWT.get('http://localhost:5000/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(response.data);
  }

  const EditData = async (e) => {
    e.preventDefault();
    const index = e.currentTarget.getAttribute('index');
    console.log("Ini index data:", users[index]);
    try {
      navigate("/edit-data", {
        state: users[index]
      });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  const DeleteData = async (e) => {
    e.preventDefault();
    const index = e.currentTarget.getAttribute('index');
    console.log("Ini index data:", users[index]);
    try {
      await axiosJWT.delete(`http://localhost:5000/users/${users[index].id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (users[index].name === name) {
        alert('User login telah terhapus, Silahkan login dengan User lain');
        await axios.delete('http://localhost:5000/logout');
        navigate({ pathname: "/" });
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <div className="mt-5">
      <Container>
        <NavBar />
        <h1>Welcome Back: {name}</h1>
        <Button onClick={getUsers} variant="info">Get Users</Button>
        <Table className="striped bordered hover">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.dateOfBirth}</td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="warning" index={index} onClick={EditData}>Edit</Button>
                    <Button variant="danger" index={index} onClick={DeleteData}>Delete</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default Dashboard

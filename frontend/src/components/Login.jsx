import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px;
  background-color: #CDB4DB;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: 'dmorissette@example.net',
    password: 'password'
  });
  let navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/login', {
      email: formData.email,
      password: formData.password
    })
    .then(response => {
      const { token, data } = response.data;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(data));
      
      if (data.role.name === 'Customer') {
        navigate("/planeri");
      } else if (data.role.name === 'Administrator') {
        navigate("/admin");
      }
      
      onLogin();
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <Container>
      <h2>Prijava</h2>
      <Form onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <Input type="password" name="password" placeholder="Lozinka" value={formData.password} onChange={handleChange} required />
        <Button type="submit">Prijavi se</Button>
      </Form>
    </Container>
  );
};

export default Login;

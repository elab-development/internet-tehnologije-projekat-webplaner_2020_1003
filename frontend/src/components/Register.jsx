 
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/register', {
      username: formData.username,
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <Container>
      <h2>Registracija</h2>
      <Form onSubmit={handleSubmit}>
        <Input type="text" name="username" placeholder="Korisničko ime" value={formData.username} onChange={handleChange} required />
        <Input type="text" name="fullName" placeholder="Puno ime" value={formData.fullName} onChange={handleChange} required />
        <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <Input type="password" name="password" placeholder="Lozinka" value={formData.password} onChange={handleChange} required />
        <Input type="password" name="confirmPassword" placeholder="Potvrdi lozinku" value={formData.confirmPassword} onChange={handleChange} required />
        <Button type="submit">Registruj se</Button>
      </Form>
    </Container>
  );
};

export default Register;

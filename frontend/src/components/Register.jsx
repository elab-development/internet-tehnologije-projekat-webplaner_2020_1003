import React, { useState, useEffect } from 'react';
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

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://randomuser.me/api/')
      .then(response => {
        const user = response.data.results[0];
        setFormData({
          username: user.login.username,
          fullName: `${user.name.first} ${user.name.last}`,
          email: user.email,
          password: 'password', // Placeholder lozinka
          confirmPassword: 'password'
        });
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: formData.username,
      body: formData.fullName,
      userId: 1, // Placeholder API zahteva userId, koji može biti bilo koji broj
    })
    .then(response => {
      alert("USPESNO REGISTROVAN KORISNIK  ");
      navigate("/login");
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

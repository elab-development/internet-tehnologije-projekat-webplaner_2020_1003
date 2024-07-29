 
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #A2D2FF;
  width: 100%;
  padding: 20px 0;
  text-align: center;
  color: #fff;
`;

const FooterText = styled.p`
  margin: 5px 0;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterText>Radno vreme radnje</FooterText>
      <FooterText>Radnim danima: 12.00 - 20.00</FooterText>
      <FooterText>Subotom: 11.00 - 16.00</FooterText>
      <FooterText>Čumićevo sokače, lokal 29</FooterText>
      <FooterText>© 2024 Web Planners. All rights reserved.</FooterText>
    </FooterWrapper>
  );
};

export default Footer;

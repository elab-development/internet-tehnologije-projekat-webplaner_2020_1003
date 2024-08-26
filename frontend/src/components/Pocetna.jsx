import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Header = styled.header`
  background-color: #CDB4DB;
  width: 100%;
  padding: 20px 0;
`;

const Title = styled.h1`
  margin: 0;
  color: #fff;
`;

const HeroSection = styled.section`
  background-color: #FFC8DD;
  padding: 60px 20px;
  width: 100%;
`;

const HeroText = styled.h2`
  margin: 0;
  color: #333;
`;

const SectionsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

const Section = styled.section`
  background-color: ${({ bgColor }) => bgColor || '#fff'};
  padding: 60px 20px;
  width: 30%;
  min-width: 300px;
  margin: 10px;
  text-align: left;
  animation: ${fadeIn} 0.5s ease-out forwards;
  opacity: 0;
  animation-delay: ${({ index }) => index * 0.2}s;
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  color: #333;
`;

const SectionText = styled.p`
  color: #333;
`;

const PlannersSection = styled.section`
  background-color: #FFAFCC;
  padding: 60px 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PlannerCard = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 20px;
  padding: 20px;
  width: 300px;
  text-align: left;
  animation: ${fadeIn} 0.5s ease-out forwards;
  opacity: 0;
  animation-delay: ${({ index }) => index * 0.2}s;
`;

const PlannerImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const PlannerTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
`;

const Footer = styled.footer`
  background-color: #A2D2FF;
  width: 100%;
  padding: 20px 0;
`;

const FooterText = styled.p`
  margin: 0;
  color: #fff;
`;

const Pocetna = () => {
  return (
    <Container>
      <Header>
        <Title>Web Planners</Title>
      </Header>
      <HeroSection>
        <HeroText>Welcome to the best web planners store!</HeroText>
      </HeroSection>
      <PlannersSection>
        <PlannerCard index={0}>
          <PlannerImage src="https://images.squarespace-cdn.com/content/v1/5d41414f4f8c15000124126e/1722241510042-EGAPO9WJY05PD1MBH39R/image-asset.jpeg?format=750w" alt="Planner 1" />
          <PlannerTitle>MODERAN DIZAJN</PlannerTitle>
          <p>Naši planeri spajaju savremeni izgled sa praktičnošću, omogućavajući vam da planirate svoje dane sa stilom i elegancijom.</p>
        </PlannerCard>
        <PlannerCard index={1}>
          <PlannerImage src="https://images.squarespace-cdn.com/content/v1/5d41414f4f8c15000124126e/1720870546119-0M718LOB0KOS4QYB60BN/IMG_5558.jpg?format=2500w" alt="Planner 2" />
          <PlannerTitle>NAJKVALITETNIJI MATERIJAL</PlannerTitle>
          <p>Izrađeni od najfinijih materijala, naši planeri su robusni i dizajnirani da izdrže svakodnevnu upotrebu, pružajući vam dugotrajnu pouzdanost.</p>
        </PlannerCard>
        <PlannerCard index={2}>
          <PlannerImage src="https://images.squarespace-cdn.com/content/v1/5d41414f4f8c15000124126e/1718125343445-GBMRPXEI16ZNKNTG0DRH/BD2B14F9-DC14-4244-BFD9-71FCD2C97CC2.JPG?format=1500w" alt="Planner 3" />
          <PlannerTitle>FLEKSIBILNOST U PLANIRANJU</PlannerTitle>
          <p>Planeri nude prilagodljive opcije koje vam omogućavaju da efikasno organizujete svoje zadatke, ciljeve i beleške, sve na jednom mestu.</p>
        </PlannerCard>
      </PlannersSection>
      <SectionsContainer>
        <Section bgColor="#BDE0FE" index={0}>
          <SectionTitle>Odabir planera</SectionTitle>
          <SectionText>Planeri su podeljeni na modele i unutar modela postoje delovi koji su fiksni i delovi koji se mogu birati.</SectionText>
          <SectionText>Na ovoj stranici su neka osnovna uputstva za pronalaženje pravog planera za vaš tip obaveza i način života. Ako nakon čitanja uputstva ne budete sigurni šta je pravi izbor za vas, možete nas pitati za mišljenje na društvenim mrežama.</SectionText>
        </Section>
        <Section bgColor="#FFC8DD" index={1}>
          <SectionTitle>Dizajn korica</SectionTitle>
          <SectionText>Celokupnu trenutnu ponudu dizajna korica možete videti ovde ili unutar formulara za naručivanje.</SectionText>
          <SectionText>Svaki dizajn korica dostupan je za svaki model planera.</SectionText>
        </Section>
        <Section bgColor="#CDB4DB" index={2}>
          <SectionTitle>Saveti o planiranju</SectionTitle>
          <SectionText>Probali smo mnogo različitih sistema organizacije i planiranja za različite vrste poslova i vrlo rado pričamo o tome.</SectionText>
          <SectionText>Kontaktirajte nas i probaćemo da pomognemo.</SectionText>
          <SectionText>Želimo da približimo planiranje svima jer tako postižemo ono što želimo, time smo zadovoljniji, a kada smo svi zadovoljni svet postaje lepše mesto.</SectionText>
        </Section>
      </SectionsContainer>
      <Footer>
        <FooterText>© 2024 Web Planners. All rights reserved.</FooterText>
      </Footer>
    </Container>
  );
};

export default Pocetna;

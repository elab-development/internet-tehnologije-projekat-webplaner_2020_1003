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

const PlannerDescription = styled.p`
  color: #333;
`;

const PlannerPrice = styled.p`
  color: #333;
  font-weight: bold;
`;

const PlannerType = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 12px;
  color: #fff;
  font-size: 0.8em;
  background-color: ${({ typeId }) => getPlannerTypeColor(typeId)};
  margin-bottom: 10px;
`;

const getPlannerTypeColor = (typeId) => {
  switch (typeId) {
    case 1:
      return '#6B8E23'; // Olive green
    case 2:
      return '#800020'; // Burgundy
    case 3:
      return '#FF6347'; // Tomato
    case 4:
      return '#4682B4'; // Steel blue
    case 5:
      return '#DAA520'; // Goldenrod
    case 6:
      return '#20B2AA'; // Light sea green
    case 7:
      return '#FF69B4'; // Hot pink
    case 8:
      return '#8A2BE2'; // Blue violet
    case 9:
      return '#5F9EA0'; // Cadet blue
    case 10:
      return '#D2691E'; // Chocolate
    default:
      return '#ccc'; // Default color
  }
};

const PlanerKartica = ({ planner, index }) => (
  <PlannerCard index={index}>
    <PlannerImage src={planner.image} alt={planner.name} />
    <PlannerType typeId={planner.planerType.id}>{planner.planerType.name}</PlannerType>
    <PlannerTitle>{planner.name}</PlannerTitle>
    <PlannerDescription>{planner.description}</PlannerDescription>
    <PlannerPrice>{planner.price} RSD</PlannerPrice>
  </PlannerCard>
);

export default PlanerKartica;

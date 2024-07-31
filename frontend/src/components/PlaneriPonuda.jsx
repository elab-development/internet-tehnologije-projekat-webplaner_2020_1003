import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PlanerKartica from './PlanerKartica';

const PlannersSection = styled.section`
  background-color: #FFAFCC;
  padding: 60px 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PlaneriPonuda = () => {
  const [planners, setPlanners] = useState([]);

  useEffect(() => {
    const fetchPlanners = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/planers');
        setPlanners(response.data.data);
      } catch (error) {
        console.error('Error fetching planners:', error);
      }
    };

    fetchPlanners();
  }, []);

  return (
    <PlannersSection>
      {planners.map((planner, index) => (
        <PlanerKartica key={planner.id} planner={planner} index={index} />
      ))}
    </PlannersSection>
  );
};

export default PlaneriPonuda;

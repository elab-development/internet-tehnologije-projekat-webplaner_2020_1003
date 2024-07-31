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

const FilterSection = styled.div`
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1em;
`;

const PlaneriPonuda = () => {
  const [planners, setPlanners] = useState([]);
  const [filteredPlanners, setFilteredPlanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchPlanners = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/planers');
        setPlanners(response.data.data);
        setFilteredPlanners(response.data.data);
      } catch (error) {
        console.error('Error fetching planners:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/planer-types');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchPlanners();
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === '') {
      setFilteredPlanners(planners);
    } else {
      setFilteredPlanners(planners.filter(planner => planner.planerType.id === parseInt(category)));
    }
  };

  return (
    <div>
      <FilterSection>
        <Select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Sve kategorije</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FilterSection>
      <PlannersSection>
        {filteredPlanners.map((planner, index) => (
          <PlanerKartica key={planner.id} planner={planner} index={index} />
        ))}
      </PlannersSection>
    </div>
  );
};

export default PlaneriPonuda;

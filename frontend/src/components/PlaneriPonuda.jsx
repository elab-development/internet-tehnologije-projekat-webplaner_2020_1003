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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1em;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1em;
  margin-bottom: 10px;
  width: 200px;
`;

const PlaneriPonuda = () => {
  const [planners, setPlanners] = useState([]);
  const [filteredPlanners, setFilteredPlanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  useEffect(() => {
    filterPlanners();
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterPlanners = () => {
    let filtered = planners;

    if (selectedCategory) {
      filtered = filtered.filter(planner => planner.planerType.id === parseInt(selectedCategory));
    }

    if (searchTerm) {
      filtered = filtered.filter(planner =>
        planner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        planner.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPlanners(filtered);
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
        <Input
          type="text"
          placeholder="Pretraga po nazivu ili opisu"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
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

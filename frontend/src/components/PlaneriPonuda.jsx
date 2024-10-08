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

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #4682B4;
  color: white;

  &:hover {
    background-color: #5A9BD3;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 10px 20px;
  margin: 5px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.disabled ? '#A9A9A9' : '#4682B4'};
  color: white;

  &:hover {
    background-color: ${props => props.disabled ? '#A9A9A9' : '#5A9BD3'};
  }
`;

const PlaneriPonuda = () => {
  const [planners, setPlanners] = useState([]);
  const [filteredPlanners, setFilteredPlanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Broj planera po stranici

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
    filterAndSortPlanners();
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    setCurrentPage(1); // Resetovanje na prvu stranicu kad se filteri menjaju
  }, [filteredPlanners]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortPlanners = (order) => {
    const sorted = [...filteredPlanners].sort((a, b) => {
      if (order === 'asc') {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (order === 'desc') {
        return parseFloat(b.price) - parseFloat(a.price);
      }
      return 0;
    });
    setFilteredPlanners(sorted);
  };

  const filterAndSortPlanners = () => {
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

  const indexOfLastPlanner = currentPage * itemsPerPage;
  const indexOfFirstPlanner = indexOfLastPlanner - itemsPerPage;
  const currentPlanners = filteredPlanners.slice(indexOfFirstPlanner, indexOfLastPlanner);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredPlanners.length / itemsPerPage);

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
        <div>
          <Button onClick={() => sortPlanners('asc')}>Cena rastuća</Button>
          <Button onClick={() => sortPlanners('desc')}>Cena opadajuća</Button>
        </div>
      </FilterSection>
      <PlannersSection>
        {currentPlanners.map((planner, index) => (
          <PlanerKartica key={planner.id} planner={planner} index={index} />
        ))}
      </PlannersSection>
      <PaginationContainer>
        <PaginationButton onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Prethodna
        </PaginationButton>
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationButton key={i + 1} onClick={() => paginate(i + 1)} disabled={currentPage === i + 1}>
            {i + 1}
          </PaginationButton>
        ))}
        <PaginationButton onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          Sledeća
        </PaginationButton>
      </PaginationContainer>
    </div>
  );
};

export default PlaneriPonuda;

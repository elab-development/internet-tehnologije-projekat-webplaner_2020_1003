import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import Modal from 'react-modal';

const AdminCategoriesContainer = styled.div`
  padding: 20px;
  background-color: #FFAFCC;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #CDB4DB;
  border-radius: 8px;
  color: white;
  font-weight: bold;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #FF6347;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #FF4500;
  }
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #4682B4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #5A9BD3;
  }
`;

const StyledDataTable = styled(DataTable)`
  /* (CSS styling as before) */
`;

const ModalContainer = styled(Modal)`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;
  position: absolute;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #4682B4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #5A9BD3;
  }
`;

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const token = sessionStorage.getItem('token'); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/planer-types', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/planer-types/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCategoryName('');
  };

  const handleSave = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/planer-types', { name: categoryName }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setModalIsOpen(false);
      const response = await axios.get('http://127.0.0.1:8000/api/planer-types', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '50px'
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <DeleteButton onClick={() => handleDelete(row.id)}>Delete</DeleteButton>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  return (
    <AdminCategoriesContainer>
      <HeaderDiv>
        <span>Total Categories: {categories.length}</span>
        <AddButton onClick={openModal}>Add Category</AddButton>
      </HeaderDiv>
      <StyledDataTable
        columns={columns}
        data={categories}
        pagination
        highlightOnHover
        striped
      />
      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <h2>Add Category</h2>
        <FormGroup>
          <Label>Name</Label>
          <Input name="name" value={categoryName} onChange={handleChange} />
        </FormGroup>
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </ModalContainer>
    </AdminCategoriesContainer>
  );
};

export default AdminCategories;

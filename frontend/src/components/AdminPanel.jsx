import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import Modal from 'react-modal';

const AdminPanelContainer = styled.div`
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

const EditButton = styled.button`
  padding: 5px 10px;
  background-color: #4682B4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #5A9BD3;
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

const Select = styled.select`
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

const AdminPanel = () => {
  const [planners, setPlanners] = useState([]);
  const [planerTypes, setPlanerTypes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPlanner, setCurrentPlanner] = useState(null);
  const [plannerData, setPlannerData] = useState({ name: '', description: '', price: '', planerTypeId: '' });

  const token = sessionStorage.getItem('token'); // Retrieve token from session storage

  useEffect(() => {
    const fetchPlanners = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/planers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPlanners(response.data.data);
      } catch (error) {
        console.error('Error fetching planners:', error);
      }
    };

    const fetchPlanerTypes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/planer-types', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPlanerTypes(response.data.data);
      } catch (error) {
        console.error('Error fetching planer types:', error);
      }
    };

    fetchPlanners();
    fetchPlanerTypes();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/planers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPlanners(planners.filter(planner => planner.id !== id));
    } catch (error) {
      console.error('Error deleting planner:', error);
    }
  };

  const openModal = (planner) => {
    setCurrentPlanner(planner);
    setPlannerData(planner || { name: '', description: '', price: '', planerTypeId: '' });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentPlanner(null);
  };

  const handleSave = async () => {
    try {
      if (currentPlanner) {
        // Update existing planner
        await axios.put(`http://127.0.0.1:8000/api/planers/${currentPlanner.id}`, plannerData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        // Add new planner
        await axios.post('http://127.0.0.1:8000/api/planers', plannerData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      setModalIsOpen(false);
      // Refetch planners
      const response = await axios.get('http://127.0.0.1:8000/api/planers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPlanners(response.data.data);
    } catch (error) {
      console.error('Error saving planner:', error);
    }
  };

  const handleChange = (e) => {
    setPlannerData({ ...plannerData, [e.target.name]: e.target.value });
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
      name: 'Description',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => `${row.price} RSD`,
      sortable: true,
      right: true,
    },
    {
      name: 'Category',
      selector: row => row.planerType.name,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <DeleteButton onClick={() => handleDelete(row.id)}>Delete</DeleteButton>
          <EditButton onClick={() => openModal(row)}>Edit</EditButton>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  return (
    <AdminPanelContainer>
      <HeaderDiv>
        <span>Total Planners: {planners.length}</span>
        <AddButton onClick={() => openModal(null)}>Add Planner</AddButton>
      </HeaderDiv>
      <StyledDataTable
        columns={columns}
        data={planners}
        pagination
        highlightOnHover
        striped
      />
      <ModalContainer
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <h2>{currentPlanner ? 'Edit Planner' : 'Add Planner'}</h2>
        <FormGroup>
          <Label>Name</Label>
          <Input name="name" value={plannerData.name} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Input name="description" value={plannerData.description} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Price</Label>
          <Input name="price" value={plannerData.price} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Category</Label>
          <Select name="planerTypeId" value={plannerData.planerTypeId} onChange={handleChange}>
            <option value="">Select Category</option>
            {planerTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </Select>
        </FormGroup>
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </ModalContainer>
    </AdminPanelContainer>
  );
};

export default AdminPanel;

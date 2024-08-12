import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

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

const StyledDataTable = styled(DataTable)`
  .rdt_Table {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .rdt_TableHead {
    background-color: #CDB4DB;
  }

  .rdt_TableHeadRow {
    color: white;
  }

  .rdt_TableRow {
    &:nth-of-type(odd) {
      background-color: #FDE2E4;
    }

    &:nth-of-type(even) {
      background-color: #FFCAD4;
    }
    
    &:hover {
      background-color: #FFB3C1;
    }
  }

  .rdt_Pagination {
    background-color: #FFAFCC;
    border-top: 1px solid #FFC3C8;
    padding: 10px;
  }

  .rdt_Pagination ul {
    display: flex;
    justify-content: center;
    padding-left: 0;
  }

  .rdt_Pagination li {
    margin: 0 5px;
  }

  .rdt_Pagination button {
    background-color: #4682B4;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    
    &:hover {
      background-color: #5A9BD3;
    }

    &[disabled] {
      background-color: #A9A9A9;
    }
  }
`;

const AdminPanel = () => {
  const [planners, setPlanners] = useState([]);
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

    fetchPlanners();
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
        <DeleteButton onClick={() => handleDelete(row.id)}>Delete</DeleteButton>
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
      </HeaderDiv>
      <StyledDataTable
        columns={columns}
        data={planners}
        pagination
        highlightOnHover
        striped
      />
    </AdminPanelContainer>
  );
};

export default AdminPanel;

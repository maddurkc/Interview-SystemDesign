import { useState } from 'react';
import './App.css'; // Make sure to create a DataTable.css file with the provided CSS
import { initialData } from './constants';

function DataTable() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term state
    setCurrentPage(1); // Reset to first page when search term changes
    if (!term) {
      setData(initialData);
    } else {
      const filteredData = data.filter(
        (item) =>
          item.firstName.toLowerCase().includes(term.toLowerCase()) ||
          item.lastName.toLowerCase().includes(term.toLowerCase()) ||
          item.address.toLowerCase().includes(term.toLowerCase()) ||
          item.city.toLowerCase().includes(term.toLowerCase()) ||
          item.state.toLowerCase().includes(term.toLowerCase())
      );
      setData(filteredData);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const selectedData = data.slice(startIndex, startIndex + rowsPerPage);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((current) => current - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((current) => current + 1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  return (
    <div className='table-container'>
      <input
        className='search-input'
        type='text'
        placeholder='Search by name...'
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <table className='table'>
        <thead>
          <tr>
            <th onClick={() => handleSort('firstName')}>First Name</th>
            <th onClick={() => handleSort('lastName')}>Last Name</th>
            <th onClick={() => handleSort('address')}>Address</th>
            <th onClick={() => handleSort('city')}>City</th>
            <th onClick={() => handleSort('state')}>State</th>
          </tr>
        </thead>
        <tbody>
          {selectedData.map((item, index) => (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.address}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='pagination-controls'>
        <button
          className='pagination-btn'
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className='pagination-info'>
          Page {currentPage} of {totalPages}
        </span>
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          {[5, 10, 15, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <button
          className='pagination-btn'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataTable;

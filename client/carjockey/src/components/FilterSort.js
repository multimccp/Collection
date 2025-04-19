import React, { useState } from 'react';

const FilterSortComponent = ({ cars, onFilterChange }) => {
  // Filter states
  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    year: '',
    color: '',
    diecastBrand: '',
    collection: '',
    condition: '',
    edition: ''
  });
  
  // Sort states
  const [sortField, setSortField] = useState('brand');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Group state
  const [groupBy, setGroupBy] = useState('');
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    
    applyFiltersAndSort(newFilters, sortField, sortDirection, groupBy);
  };
  
  const handleSortChange = (e) => {
    const newSortField = e.target.value;
    setSortField(newSortField);
    
    applyFiltersAndSort(filters, newSortField, sortDirection, groupBy);
  };
  
  const handleSortDirectionToggle = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    
    applyFiltersAndSort(filters, sortField, newDirection, groupBy);
  };
  
  const handleGroupByChange = (e) => {
    const newGroupBy = e.target.value;
    setGroupBy(newGroupBy);
    
    applyFiltersAndSort(filters, sortField, sortDirection, newGroupBy);
  };
  
  const applyFiltersAndSort = (currentFilters, field, direction, group) => {
    // Filter cars
    let filteredCars = [...cars];
    
    Object.entries(currentFilters).forEach(([key, value]) => {
      if (value) {
        filteredCars = filteredCars.filter(car => 
          String(car[key]).toLowerCase().includes(value.toLowerCase())
        );
      }
    });
    
    // Sort cars
    filteredCars.sort((a, b) => {
      const valueA = String(a[field] || '').toLowerCase();
      const valueB = String(b[field] || '').toLowerCase();
      
      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    // Group cars if a grouping is selected
    let groupedCars = filteredCars;
    if (group) {
      const groups = {};
      filteredCars.forEach(car => {
        const groupValue = car[group] || 'Ungrouped';
        if (!groups[groupValue]) {
          groups[groupValue] = [];
        }
        groups[groupValue].push(car);
      });
      groupedCars = { grouped: true, groups };
    } else {
      groupedCars = { grouped: false, cars: filteredCars };
    }
    
    // Pass the filtered, sorted, and grouped cars up to the parent
    onFilterChange(groupedCars);
  };
  
  const resetFilters = () => {
    const emptyFilters = {
      brand: '',
      model: '',
      year: '',
      color: '',
      diecastBrand: '',
      collection: '',
      condition: '',
      edition: ''
    };
    setFilters(emptyFilters);
    setSortField('brand');
    setSortDirection('asc');
    setGroupBy('');
    
    onFilterChange({ grouped: false, cars });
  };
  
  return (
    
    <div className="filter-sort-container">
      <div className="filter-section">
        <h3>Filters</h3>
        <div className="filter-fields">
          <div className="filter-field">
            <label htmlFor="brand-filter">Brand:</label>
            <input
              type="text"
              id="brand-filter"
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              placeholder="Filter by brand"
            />
          </div>
          
          <div className="filter-field">
            <label htmlFor="model-filter">Model:</label>
            <input
              type="text"
              id="model-filter"
              name="model"
              value={filters.model}
              onChange={handleFilterChange}
              placeholder="Filter by model"
            />
          </div>
        </div>
      </div>
      
      <div className="sort-group-section">
        <div className="sort-controls">
          <h3>Sort</h3>
          <div className="sort-field">
            <select
              id="sort-field"
              value={sortField}
              onChange={handleSortChange}
            >
              <option value="brand">Brand</option>
              <option value="model">Model</option>
              <option value="year">Year</option>
              <option value="color">Color</option>
              <option value="diecastBrand">Diecast Brand</option>
              <option value="collection">Collection</option>
              <option value="condition">Condition</option>
              <option value="edition">Edition</option>
            </select>
            
            <button 
              className="sort-direction-btn" 
              onClick={handleSortDirectionToggle}
            >
              {sortDirection === 'asc' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <div className="group-controls">
          <h3>Group</h3>
          <div className="group-field">
            <select
              id="group-by"
              value={groupBy}
              onChange={handleGroupByChange}
            >
              <option value="">No Grouping</option>
              <option value="brand">Brand</option>
              <option value="year">Year</option>
              <option value="diecastBrand">Diecast Brand</option>
              <option value="collection">Collection</option>
              <option value="condition">Condition</option>
            </select>
          </div>
        </div>
      </div>
      
      <button className="reset-filters-btn" onClick={resetFilters}>
        Reset All
      </button>
    </div>
  );
};

export default FilterSortComponent;
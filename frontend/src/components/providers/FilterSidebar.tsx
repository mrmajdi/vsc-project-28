import React, { useState } from 'react';

interface FilterSidebarProps {
  onApplyFilters: (filters: Filters) => void;
  onResetFilters?: () => void;
}

interface Filters {
  category: string | null;
  location: string;
  services: string[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onApplyFilters, onResetFilters }) => {
  const [filters, setFilters] = useState<Filters>({
    category: null,
    location: '',
    services: [],
  });

  const categories = ['All', 'Restaurant', 'Cafe', 'Gym', 'Salon'];
  const servicesList = ['WiFi', 'Parking', 'Outdoor Seating', 'Delivery', 'Takeaway'];

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleReset = () => {
    setFilters({
      category: null,
      location: '',
      services: [],
    });
    if (onResetFilters) onResetFilters();
  };

  return (
    <aside className="filter-sidebar">
      <h3>Filters</h3>
      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={filters.category ?? ''}
          onChange={(e) => setFilters({ ...filters, category: e.target.value || null })}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          placeholder="Enter location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>

      <div className="filter-group">
        <fieldset>
          <legend>Services</legend>
          {servicesList.map((service) => (
            <label key={service} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.services.includes(service)}
                onChange={(e) => {
                  const selected = filters.services;
                  if (e.target.checked) {
                    setFilters({ ...filters, services: [...selected, service] });
                  } else {
                    setFilters({
                      ...filters,
                      services: selected.filter((s) => s !== service),
                    });
                  }
                }}
              />
              {service}
            </label>
          ))}
        </fieldset>
      </div>

      <div className="filter-actions">
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        <button type="button" onClick={handleApply} className="primary">
          Apply Filters
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
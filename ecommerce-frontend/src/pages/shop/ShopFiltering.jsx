import React from 'react';

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
  return (
    <div className='space-y-5 flex-shrink-0'>
      <h3 className='text-xl font-semibold'>Filters</h3>

      {/* Category Filter */}
      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Category</h4>
        <hr />
        {filters.categories.map((category) => (
          <label key={category} className='capitalize cursor-pointer'>
            <input
              type="radio"
              name="category"
              value={category}
              checked={filtersState.category === category}
              onChange={(e) =>
                setFiltersState({ ...filtersState, category: e.target.value })
              }
            />
            <span className='ml-1'>{category}</span>
          </label>
        ))}
      </div>

      {/* Color Filter */}
      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Color</h4>
        <hr />
        {filters.colors.map((color) => (
          <label key={color} className='capitalize cursor-pointer'>
            <input
              type="radio"
              name="color"
              value={color}
              checked={filtersState.color === color}
              onChange={(e) =>
                setFiltersState({ ...filtersState, color: e.target.value })
              }
            />
            <span className='ml-1'>{color}</span>
          </label>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Price Range</h4>
        <hr />
        {filters.priceRanges.map((range) => (
          <label key={range.label} className='capitalize cursor-pointer'>
            <input
              type="radio"
              name="priceRange"
              value={`${range.min}-${range.max}`}
              checked={filtersState.priceRange === `${range.min}-${range.max}`}
              onChange={(e) =>
                setFiltersState({ ...filtersState, priceRange: e.target.value })
              }
            />
            <span className='ml-1'>{range.label}</span>
          </label>
        ))}
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        className='bg-primary py-1 px-4 text-white rounded'
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ShopFiltering;

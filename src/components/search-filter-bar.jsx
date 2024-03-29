import React, { useState } from 'react';
import { Form, useSubmit } from 'react-router-dom';
import { Input } from './Form';

const brands = ['oppo', 'vivo', 'samsung'];

/** @type {Object.<string, React.CSSProperties>} */
const styles = {
  searchFilterSidebar: {
    position: 'sticky',
    top: '2rem',
    height: 'calc(100vh - 4rem)',
    marginLeft: '2rem',
    padding: '2rem 1rem',
    width: 'max(25vw, 250px)',
    flex: 'none',
    backgroundColor: '#f9fcf5',
  },
  sortByWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  priceRangeWrapper: {
    paddingLeft: 12,
    paddingRight: 12,
    gap: 12,
    display: 'flex',
  },
  formControl: {
    margin: 0,
    width: '100%',
    flex: 1,
    fontWeight: 400,
  },
  formCheckBox: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  filterTitle: {
    paddingTop: 16,
    fontWeight: 'bold',
  },
  filterHeading: {
    paddingBottom: 32,
    fontSize: 'clamp(20px, 2.2vw, 24px)',
  },
};

const FilterTitle = (props) => <p style={styles.filterTitle} {...props} />;

const SearchFilterSideBar = ({ style, filters, actions }) => {
  const submit = useSubmit();

  return (
    <div style={styles.searchFilterSidebar}>
      <h2 style={styles.filterHeading}>Personalize Search</h2>

      <Form onChange={(e) => submit(e.currentTarget)}>
        <Input
          as="select"
          labelStyle={styles.sortByWrapper}
          style={styles.formControl}
          name="sortBy"
          label="Sort by:"
          inline
        >
          <option value="0">Most Relevant</option>
          <option value="1">Low - High</option>
          <option value="-1">High - Low</option>
        </Input>

        <FilterTitle>Price Range:</FilterTitle>
        <div style={styles.priceRangeWrapper}>
          <Input
            style={styles.formControl}
            name="price_min"
            type="number"
            placeholder="Min"
            onChange={(ev) => {
              const { value } = ev.target;
              actions.minPrice(value);
            }}
            defaultValue="0"
            min="0"
            inline
          />

          <Input
            style={styles.formControl}
            name="price_max"
            type="number"
            placeholder="Max"
            onChange={(ev) => {
              const { value } = ev.target;
              actions.maxPrice(value);
            }}
            defaultValue="50000"
            max="50000"
            inline
          />
        </div>

        <FilterTitle>Brand:</FilterTitle>
        {brands.map((brand, idx) => (
          <Input
            key={brand}
            label={brand}
            labelStyle={styles.formCheckBox}
            style={{ order: -1 }}
            name={`brand`}
            type="checkbox"
            value={brand}
          />
        ))}

        <FilterTitle>Availability:</FilterTitle>
        <Input
          labelStyle={styles.formCheckBox}
          style={{ order: -1 }}
          label="In-Stock"
          type="checkbox"
          name="isInStock"
        />
        <Input
          labelStyle={styles.formCheckBox}
          style={{ order: -1 }}
          label="Out of Stock"
          type="checkbox"
          name="isInStock"
        />
      </Form>
    </div>
  );
};

export default SearchFilterSideBar;

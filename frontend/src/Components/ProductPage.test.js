// productPage.test.js

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductPage from './ProductPage';
import { BrowserRouter } from 'react-router-dom';

describe('ProductPage', () => {
  it('should filter items based on search query', async () => {
    render(
    <BrowserRouter>
    <ProductPage />
    </BrowserRouter>);

    // Input the search query
    const searchInput = screen.getByPlaceholderText('Search for products');
    fireEvent.change(searchInput, { target: { value: 'search query' } });

    // Ensure the search query is reflected in the input field
    expect(searchInput).toHaveValue('search query');

    // Wait for items to be filtered
    await waitFor(() => {
      expect(screen.queryByText('No items found')).toBeInTheDocument();
    });

    // Ensure the "No items found" message is displayed
    expect(screen.queryAllByTestId('item-card')).toHaveLength(0);
  });

  it('should filter items based on partial search query', async () => {
    render(
      <BrowserRouter>
      <ProductPage />
      </BrowserRouter>);

    // Input a partial search query
    const searchInput = screen.getByPlaceholderText('Search for products');
    fireEvent.change(searchInput, { target: { value: 'partial' } });

    // Ensure the search query is reflected in the input field
    expect(searchInput).toHaveValue('partial');

    // Wait for items to be filtered
    await waitFor(() => {
      expect(screen.queryByText('No items found')).toBeInTheDocument();
    });

    // Ensure the "No items found" message is displayed
    expect(screen.queryAllByTestId('item-card')).toHaveLength(0);
  });

  it('should filter items based on partial search query', async () => {
    render(
      <BrowserRouter>
      <ProductPage />
      </BrowserRouter>);
    
    // Input a partial search query
    const searchInput = screen.getByPlaceholderText('Search for products');
    fireEvent.change(searchInput, { target: { value: 'brush' } });
    
    // Ensure the search query is reflected in the input field
    expect(searchInput).toHaveValue('brush');
    
    // Wait for items to be filtered
    await waitFor(() => {
      // Get all items on the page
      const items = screen.queryAllByTestId('item-card');
      
      // Ensure that no item contains 'TOOTHBRUSH' in its text content
      items.forEach(item => {
        expect(item.textContent).toContain('TOOTHBRUSH');
      });
    });
  });  
});

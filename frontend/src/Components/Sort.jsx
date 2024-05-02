import React, { useEffect, useState } from "react";
import "./sort.css";

import PropTypes from 'prop-types';

export default function Sort({ jsonData, onDataSort }) {
    const [sortBy, setSortBy] = useState('alphabetically');

    useEffect(() => {
        let filterData = [...jsonData];

        // Separate promoted items from the rest of the data
        const promotedItems = filterData.filter(item => item.promoted);
        const nonPromotedItems = filterData.filter(item => !item.promoted);

        // Sort non-promoted items based on the selected sort option
        if (sortBy === "alphabetically") {
            nonPromotedItems.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "ZtoA") {
            nonPromotedItems.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortBy === "priceLowToHigh") {
            nonPromotedItems.sort((a, b) => a.price - b.price);
        } else if (sortBy === "priceHighToLow") {
            nonPromotedItems.sort((a, b) => b.price - a.price);
        }

        // Concatenate promoted items with the sorted non-promoted items
        const sortedData = [...promotedItems, ...nonPromotedItems];

        // Check if sortedData is different from jsonData before calling onDataSort
        if (JSON.stringify(sortedData) !== JSON.stringify(jsonData)) {
            onDataSort(sortedData);
        }
    }, [sortBy, jsonData, onDataSort]);

    return (
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="alphabetically">A to Z</option>
            <option value="ZtoA">Z to A</option>
            <option value="priceLowToHigh">Low to High</option>
            <option value="priceHighToLow">High to Low</option>
        </select>
    );
}

Sort.propTypes = {
    jsonData: PropTypes.func.isRequired,
    onDataSort: PropTypes.func.isRequired,
  };
  
  
import React, { useEffect, useState } from "react";
import "./sort.css";

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
        }

        // Concatenate promoted items with the sorted non-promoted items
        const sortedData = [...promotedItems, ...nonPromotedItems];
        
        // Update the sorted data using onDataSort
        onDataSort(sortedData);
    }, [sortBy, jsonData, onDataSort]);

    return (
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="alphabetically">A to Z</option>
            <option value="ZtoA">Z to A</option>
        </select>
    );
}
import { useEffect, useState } from "react";
import "./sort.css";

export default function Sort({jsonData, onDataSort}) {
    const [sortBy, setSortBy] = useState('alphabetically');

    useEffect(() => {
        let filterData = [...jsonData];

        if (sortBy === "alphabetically") {
            filterData.sort((a, b) => a.title.localeCompare(b.title));
        }
        if (sortBy === "ZtoA") {
            filterData.sort((a, b) => b.title.localeCompare(a.title));
        }

        onDataSort(filterData);
    }, [sortBy]);

    return (
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="alphabetically">A to Z</option>
            <option value="ZtoA">Z to A</option>
        </select>
    );
}
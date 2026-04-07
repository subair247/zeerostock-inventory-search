# ZeeroStock Inventory Search Assignment

## Project Overview
A full-stack inventory search application that allows buyers to find surplus stock across multiple categories and price ranges.

## Features
* [cite_start]**Real-time Search:** Partial match searching for product names[cite: 13].
* [cite_start]**Category Filtering:** Narrow results by specific product types[cite: 14].
* [cite_start]**Price Range:** Filter items based on minimum and maximum price inputs.
* [cite_start]**Responsive UI:** A modern, clean interface with "No results" handling[cite: 27, 28].

## Technical Implementation
* **Backend:** Node.js & Express.
* [cite_start]**Search Logic:** Uses case-insensitive string matching (`.toLowerCase()`) and combined array filtering[cite: 17, 18].
* [cite_start]**Edge Cases:** Handles empty queries by returning all results and validates price ranges[cite: 19, 31].

## Performance Improvement for Large Datasets
[cite_start]For a dataset with millions of records, I would implement **Pagination** and **Database Indexing**[cite: 35]. Instead of fetching all items at once, I would use `limit` and `offset` queries to load data in chunks, significantly reducing memory usage and response time.

## How to Run
1. Navigate to the `backend` folder and run `npm install`.
2. Start the server using `node server.js`.
3. Open `frontend/index.html` in your browser.
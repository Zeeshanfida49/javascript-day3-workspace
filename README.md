# JavaScript Day 3 Workspace

An interactive JavaScript practice project created by **Zeeshan Fida** for the **Tech SG Studio internship**.

The project combines three tasks in a professional, responsive interface built with HTML, CSS, and JavaScript.

## Tasks

### 1. Product Catalog

A catalog containing eight products with the following properties:

- Name
- Price
- Category
- Stock availability

Features:

- Display all products or product names only.
- Filter in-stock products.
- Calculate total inventory value.
- Find the cheapest and most expensive products.
- Sort products by price from highest to lowest without changing the original array.
- Count products by category using `reduce()`.

Inventory value is the sum of all eight listed prices, assuming one unit per product. It includes out-of-stock products because quantities are not provided.

### 2. Student Record Manager

Manage student records containing an ID, name, and marks array.

Functions:

- `addStudent(student)`
- `findStudentById(id)`
- `getAverage(student)`
- `getTopper()`
- `getPassedStudents()`

Features:

- Add students with input validation.
- Prevent duplicate student IDs.
- Search for students by ID.
- Calculate individual and class averages.
- Identify the top performer.
- Filter passed students.
- Display records on the page and through `console.table()`.

**Practice pass rule:** A student must score at least 33 marks in every subject. The assignment does not specify a pass threshold.

Student records are stored temporarily in memory. Added records reset when the page is refreshed.

### 3. Sentence Analyzer

Analyze a sentence to display:

- Total word count
- Longest word
- First-letter capitalization for each word
- Reversed word order
- Case-insensitive word frequency counts

Word counting ignores surrounding punctuation. Reversed output reverses word order, not individual word spelling.

## Interface Features

- Responsive desktop, tablet, and mobile layouts
- Hamburger navigation on mobile
- Interactive forms and results
- Product cards and summary statistics
- Student performance table
- Input validation and feedback messages
- Keyboard-accessible controls
- Separate HTML, CSS, and JavaScript files
- No frameworks or external dependencies

## Technologies

- HTML5
- CSS3
- JavaScript

## Project Structure

```text
javascript-day3-workspace/
├── index.html
├── style.css
├── script.js
└── README.md
```

| File | Purpose |
|------|---------|
| `index.html` | Page structure, navigation, forms, and result sections |
| `style.css` | Styling, responsive layouts, and mobile navigation appearance |
| `script.js` | Task logic, validation, rendering, and navigation behavior |
| `README.md` | Project documentation |

## Run Locally

1. Download or clone the repository.
2. Keep all project files in the same folder.
3. Open `index.html` in a browser.

Alternatively, open the folder in VS Code and launch `index.html` using Live Server.

No installation or build command is required.

## View Console Results

Open browser Developer Tools and select the **Console** tab.

The project logs product calculations, student records, and sentence analysis. The Student Record Manager also includes a **Log records to console** button.

## Example Results

| Feature | Expected Result |
|---------|-----------------|
| Total products | 8 |
| In-stock products | 6 |
| Total inventory value | Rs. 229,000 |
| Cheapest product | USB Flash Drive — Rs. 1,200 |
| Most expensive product | Laptop — Rs. 145,000 |
| Initial students | 4 |
| Initially passed students | 3 |
| Initial class average | 73.2% |
| Initial topper | Sara Ahmed — 93.4% |
| Sentence: `Hello hello world` | 3 words; `hello` appears twice |

## JavaScript Concepts

- Arrays and objects
- Functions and arrow functions
- `map()`, `filter()`, `reduce()`, and `find()`
- `sort()` and `every()`
- Spread syntax and destructuring
- String methods and regular expressions
- DOM manipulation
- Event listeners
- Form validation
- Console tables

## Author

**Zeeshan Fida**

Tech SG Studio — Day 3 JavaScript Practice

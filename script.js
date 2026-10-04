"use strict";

// ==========================================
// Shared helpers
// ==========================================

const select = (id) => document.getElementById(id);

const formatCurrency = (value) =>
  `Rs. ${value.toLocaleString("en-PK", {
    maximumFractionDigits: 2
  })}`;

function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

function showFeedback(id, message, isError = false) {
  const element = select(id);

  element.textContent = message;
  element.classList.toggle("error", isError);
}

// ==========================================
// Responsive hamburger navigation
// ==========================================

const menuToggle = select("menu-toggle");
const navigation = select("main-navigation");

function setMenuOpen(isOpen) {
  navigation.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
}

menuToggle.addEventListener("click", () => {
  const isOpen =
    menuToggle.getAttribute("aria-expanded") === "true";

  setMenuOpen(!isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("click", (event) => {
  if (
    !navigation.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle.getAttribute("aria-expanded") === "true"
  ) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const mobileQuery = window.matchMedia("(max-width: 760px)");

mobileQuery.addEventListener("change", () => {
  setMenuOpen(false);
});

// ==========================================
// Task 1: Product Catalog
// ==========================================

const products = [
  {
    name: "Wireless Mouse",
    price: 1800,
    category: "Accessories",
    inStock: true
  },
  {
    name: "Mechanical Keyboard",
    price: 6500,
    category: "Accessories",
    inStock: true
  },
  {
    name: "Laptop",
    price: 145000,
    category: "Computers",
    inStock: true
  },
  {
    name: "Monitor",
    price: 42000,
    category: "Computers",
    inStock: false
  },
  {
    name: "Headphones",
    price: 8500,
    category: "Audio",
    inStock: true
  },
  {
    name: "Bluetooth Speaker",
    price: 5500,
    category: "Audio",
    inStock: false
  },
  {
    name: "USB Flash Drive",
    price: 1200,
    category: "Storage",
    inStock: true
  },
  {
    name: "External SSD",
    price: 18500,
    category: "Storage",
    inStock: true
  }
];

const categoryIcons = {
  Accessories: "⌨️",
  Computers: "💻",
  Audio: "🎧",
  Storage: "💾"
};

// Extract names using map().
const productNames = products.map(({ name }) => name);

// Extract available products using filter().
const inStockProducts = products.filter(
  ({ inStock }) => inStock
);

// Assume one unit per listed product.
const totalInventoryValue = products.reduce(
  (total, { price }) => total + price,
  0
);

const cheapestProduct = products.reduce(
  (cheapest, product) =>
    product.price < cheapest.price ? product : cheapest
);

const mostExpensiveProduct = products.reduce(
  (expensive, product) =>
    product.price > expensive.price ? product : expensive
);

// Copy the array before sorting to preserve its original order.
const descendingProducts = [...products].sort(
  (first, second) => second.price - first.price
);

// Count products per category using reduce().
const categoryCounts = products.reduce((counts, { category }) => {
  counts[category] = (counts[category] || 0) + 1;
  return counts;
}, {});

function renderProductCatalog() {
  const view = select("product-view").value;
  const list = select("product-list");

  list.replaceChildren();

  if (view === "names") {
    productNames.forEach((name, index) => {
      const card = createElement("article", "product-card");
      const line = createElement("p", "name-only");
      const number = createElement(
        "span",
        "status",
        String(index + 1).padStart(2, "0")
      );

      line.append(number, document.createTextNode(name));
      card.append(line);
      list.append(card);
    });

    select("product-view-count").textContent =
      `${productNames.length} product names`;

    console.log("Product names:", productNames);
    return;
  }

  let visibleProducts = products;

  if (view === "stock") {
    visibleProducts = inStockProducts;
  } else if (view === "descending") {
    visibleProducts = descendingProducts;
  }

  visibleProducts.forEach((product) => {
    const card = createElement("article", "product-card");

    const icon = createElement(
      "div",
      "product-icon",
      categoryIcons[product.category] || "📦"
    );

    icon.setAttribute("aria-hidden", "true");

    const category = createElement(
      "p",
      "product-category",
      product.category
    );

    const name = createElement("h3", "", product.name);

    const price = createElement(
      "p",
      "product-price",
      formatCurrency(product.price)
    );

    const status = createElement(
      "span",
      product.inStock ? "status" : "status fail",
      product.inStock ? "In stock" : "Out of stock"
    );

    card.append(icon, category, name, price, status);
    list.append(card);
  });

  select("product-view-count").textContent =
    `${visibleProducts.length} products displayed`;

  console.table(visibleProducts);
}

function renderProductSummary() {
  select("product-count").textContent = products.length;
  select("stock-count").textContent = inStockProducts.length;

  select("inventory-value").textContent =
    formatCurrency(totalInventoryValue);

  select("cheapest-name").textContent = cheapestProduct.name;

  select("cheapest-price").textContent =
    formatCurrency(cheapestProduct.price);

  select("expensive-name").textContent =
    mostExpensiveProduct.name;

  select("expensive-price").textContent =
    formatCurrency(mostExpensiveProduct.price);

  const container = select("category-counts");
  container.replaceChildren();

  Object.entries(categoryCounts).forEach(([category, count]) => {
    const chip = createElement("span", "count-chip");
    const label = createElement("span", "", category);
    const value = createElement("strong", "", String(count));

    chip.append(label, value);
    container.append(chip);
  });
}

select("product-view").addEventListener(
  "change",
  renderProductCatalog
);

console.group("Task 1: Product Catalog");
console.log("Names:", productNames);
console.table(inStockProducts);
console.log("Total inventory value:", totalInventoryValue);
console.log("Cheapest product:", cheapestProduct);
console.log("Most expensive product:", mostExpensiveProduct);
console.table(descendingProducts);
console.log("Category counts:", categoryCounts);
console.groupEnd();

// ==========================================
// Task 2: Student Record Manager
// ==========================================

// Practice rule: every subject must have at least 33 marks.
const PASS_MARK = 33;

const students = [
  {
    id: 101,
    name: "Zeeshan Fida",
    marks: [82, 76, 91, 85, 88]
  },
  {
    id: 102,
    name: "Ali Khan",
    marks: [65, 72, 68, 70, 74]
  },
  {
    id: 103,
    name: "Sara Ahmed",
    marks: [95, 92, 96, 90, 94]
  },
  {
    id: 104,
    name: "Usman Shah",
    marks: [45, 28, 52, 60, 40]
  }
];

function getAverage(student) {
  if (student.marks.length === 0) {
    return 0;
  }

  const total = student.marks.reduce(
    (sum, mark) => sum + mark,
    0
  );

  return total / student.marks.length;
}

function isPassed(student) {
  return (
    student.marks.length > 0 &&
    student.marks.every((mark) => mark >= PASS_MARK)
  );
}

function addStudent(student) {
  if (!Number.isSafeInteger(student.id) || student.id < 1) {
    throw new Error("Enter a valid positive whole-number ID.");
  }

  if (students.some(({ id }) => id === student.id)) {
    throw new Error("This student ID already exists.");
  }

  if (
    typeof student.name !== "string" ||
    !student.name.trim() ||
    student.name.trim().length > 80
  ) {
    throw new Error("Enter a name between 1 and 80 characters.");
  }

  if (
    !Array.isArray(student.marks) ||
    student.marks.length === 0 ||
    !student.marks.every(
      (mark) =>
        Number.isFinite(mark) &&
        mark >= 0 &&
        mark <= 100
    )
  ) {
    throw new Error("All marks must be numbers between 0 and 100.");
  }

  // Copy marks so external changes do not alter the saved record.
  const newStudent = {
    id: student.id,
    name: student.name.trim(),
    marks: [...student.marks]
  };

  students.push(newStudent);
  return newStudent;
}

function findStudentById(id) {
  return students.find((student) => student.id === id);
}

function getTopper() {
  if (students.length === 0) {
    return null;
  }

  // If averages tie, return the first student with that average.
  return students.reduce((topper, student) =>
    getAverage(student) > getAverage(topper)
      ? student
      : topper
  );
}

function getPassedStudents() {
  return students.filter(isPassed);
}

function logStudentRecords() {
  const records = students.map((student) => ({
    ID: student.id,
    Name: student.name,
    Marks: student.marks.join(", "),
    Average: `${getAverage(student).toFixed(2)}%`,
    Status: isPassed(student) ? "Pass" : "Fail"
  }));

  console.table(records);
}

function renderStudentRecords() {
  const table = select("student-table");
  const passedStudents = getPassedStudents();

  const visibleStudents =
    select("student-view").value === "passed"
      ? passedStudents
      : students;

  table.replaceChildren();

  visibleStudents.forEach((student) => {
    const row = createElement("tr");

    row.append(
      createElement("td", "", String(student.id)),
      createElement("td", "", student.name),
      createElement("td", "", student.marks.join(", ")),
      createElement(
        "td",
        "",
        `${getAverage(student).toFixed(2)}%`
      )
    );

    const statusCell = createElement("td");

    statusCell.append(
      createElement(
        "span",
        isPassed(student) ? "status" : "status fail",
        isPassed(student) ? "Pass" : "Fail"
      )
    );

    row.append(statusCell);
    table.append(row);
  });

  if (visibleStudents.length === 0) {
    const row = createElement("tr");
    const cell = createElement(
      "td",
      "",
      "No students match this view."
    );

    cell.colSpan = 5;
    row.append(cell);
    table.append(row);
  }

  select("student-count").textContent = students.length;
  select("passed-count").textContent = passedStudents.length;

  const classAverage =
    students.length === 0
      ? 0
      : students.reduce(
          (total, student) => total + getAverage(student),
          0
        ) / students.length;

  select("class-average").textContent =
    `${classAverage.toFixed(1)}%`;

  const topper = getTopper();

  select("topper-name").textContent =
    topper ? topper.name : "No students yet";

  select("topper-average").textContent = topper
    ? `ID ${topper.id} · ${getAverage(topper).toFixed(2)}% average`
    : "Add a student to view the top performer.";
}

select("student-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const marksText = select("student-marks").value.trim();
  const marksParts = marksText.split(",");

  // Reject blank entries and values such as "80abc" or "0x50".
  const validMarksFormat = marksParts.every((part) =>
    /^(?:\d+(?:\.\d+)?|\.\d+)$/.test(part.trim())
  );

  if (!validMarksFormat) {
    showFeedback(
      "student-feedback",
      "Enter marks separated by commas, for example: 80, 75, 90.",
      true
    );

    return;
  }

  try {
    const student = addStudent({
      id: Number(select("student-id").value),
      name: select("student-name").value,
      marks: marksParts.map((part) => Number(part.trim()))
    });

    renderStudentRecords();
    logStudentRecords();

    event.target.reset();
    select("student-search-result").textContent = "";

    showFeedback(
      "student-feedback",
      `${student.name} was added successfully.`
    );
  } catch (error) {
    showFeedback("student-feedback", error.message, true);
  }
});

select("student-search-form").addEventListener(
  "submit",
  (event) => {
    event.preventDefault();

    const id = Number(select("search-id").value);
    const student = findStudentById(id);
    const result = select("student-search-result");

    if (!student) {
      result.textContent = `No student found with ID ${id}.`;
      return;
    }

    result.textContent =
      `${student.name} · Marks: ${student.marks.join(", ")} · ` +
      `Average: ${getAverage(student).toFixed(2)}% · ` +
      `${isPassed(student) ? "Pass" : "Fail"}`;

    console.table([
      {
        ID: student.id,
        Name: student.name,
        Average: getAverage(student).toFixed(2),
        Status: isPassed(student) ? "Pass" : "Fail"
      }
    ]);
  }
);

select("student-view").addEventListener(
  "change",
  renderStudentRecords
);

select("log-students").addEventListener("click", () => {
  logStudentRecords();

  showFeedback(
    "console-feedback",
    "Records logged. Open Developer Tools → Console to view the table."
  );
});

// ==========================================
// Task 3: Sentence Analyzer
// ==========================================

function analyzeSentence(sentence) {
  // Match words and numbers while ignoring surrounding punctuation.
  // Apostrophes inside words are preserved.
  const words =
    sentence.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) || [];

  const wordLength = (word) =>
    Array.from(word.replace(/['’]/g, "")).length;

  const longestWord = words.reduce(
    (longest, word) =>
      wordLength(word) > wordLength(longest) ? word : longest,
    ""
  );

  // Capitalize word initials while preserving original punctuation.
  const capitalizedSentence = sentence.replace(
    /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu,
    (word) => {
      const [first, ...rest] = Array.from(word);
      return first.toUpperCase() + rest.join("");
    }
  );

  // Reverse word order using a copy of the words array.
  const reversedWords = [...words].reverse().join(" ");

  // A null-prototype object safely stores arbitrary word keys.
  const wordCounts = words.reduce((counts, word) => {
    const key = word.toLowerCase().replace(/’/g, "'");
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, Object.create(null));

  return {
    wordCount: words.length,
    longestWord,
    longestWordLength: wordLength(longestWord),
    capitalizedSentence,
    reversedWords,
    wordCounts
  };
}

function renderSentenceAnalysis(result) {
  select("word-count").textContent = result.wordCount;

  select("longest-word").textContent =
    result.longestWord || "—";

  select("longest-length").textContent =
    result.longestWord
      ? `${result.longestWordLength} letters or digits`
      : "";

  select("capitalized-sentence").textContent =
    result.capitalizedSentence;

  select("reversed-sentence").textContent =
    result.reversedWords;

  const frequencyContainer = select("word-frequency");
  frequencyContainer.replaceChildren();

  Object.entries(result.wordCounts)
    .sort((first, second) => second[1] - first[1])
    .forEach(([word, count]) => {
      const chip = createElement("span", "count-chip");

      chip.append(
        createElement("span", "", word),
        createElement("strong", "", `×${count}`)
      );

      frequencyContainer.append(chip);
    });
}

function runSentenceAnalysis() {
  const sentence = select("sentence-input").value.trim();
  const result = analyzeSentence(sentence);

  if (result.wordCount === 0) {
    showFeedback(
      "sentence-feedback",
      "Enter a sentence containing at least one word or number.",
      true
    );

    select("sentence-output").hidden = true;
    return;
  }

  select("sentence-output").hidden = false;
  showFeedback("sentence-feedback", "");

  renderSentenceAnalysis(result);

  console.group("Task 3: Sentence Analyzer");
  console.log("Analysis:", result);

  console.table(
    Object.entries(result.wordCounts).map(([word, count]) => ({
      Word: word,
      Count: count
    }))
  );

  console.groupEnd();
}

select("sentence-form").addEventListener("submit", (event) => {
  event.preventDefault();
  runSentenceAnalysis();
});

// ==========================================
// Initial page rendering and console output
// ==========================================

renderProductSummary();
renderProductCatalog();

renderStudentRecords();

console.group("Task 2: Student Record Manager");
logStudentRecords();
console.log("Student with ID 101:", findStudentById(101));
console.log("Topper:", getTopper());
console.table(
  getPassedStudents().map((student) => ({
    ID: student.id,
    Name: student.name,
    Average: getAverage(student).toFixed(2)
  }))
);
console.groupEnd();

runSentenceAnalysis();
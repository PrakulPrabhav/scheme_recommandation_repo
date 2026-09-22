// Mock Database of Government Schemes
const mockSchemes = [
  {
    id: 1,
    title: "Right To Information Fellowship",
    department: "Ministry Of Personnel, Public Grievances And Pensions",
    description: "DOPT proposes to offer four short-term fellowships to researchers from the field of media / Civil Society professionals / RTI Trainers to conduct field-based research on themes relating to RTI.",
    tags: ["Communication", "Internship", "Journalism", "RTI", "Student"],
    category: "central",
    occupation: "student"
  },
  {
    id: 2,
    title: "National Post Doctoral Fellowship (N-PDF)",
    department: "Ministry Of Science And Technology",
    description: "The 'National Post Doctoral Fellowship (N-PDF)' was launched to identify motivated young researchers and provide them support for doing research in frontier areas of science and engineering.",
    tags: ["Fellow", "Fellowship", "National", "Post Doctoral", "Research", "Science"],
    category: "central",
    occupation: "student"
  },
  {
    id: 3,
    title: "Central Sector Scheme of Higher Education Loan Interest Subsidy",
    department: "Ministry Of Education",
    description: "Provides full interest subsidy during the moratorium period on educational loans taken by students belonging to economically weaker sections for pursuing professional/technical courses in India.",
    tags: ["Education Loan", "BTech", "Fees Support", "Subsidy", "Student"],
    category: "central",
    occupation: "student"
  },
  {
    id: 4,
    title: "PM-KISAN Samman Nidhi",
    department: "Ministry of Agriculture and Farmers Welfare",
    description: "Financial assistance of Rs 6000/- per year is provided to landholding farmer families across the country in three equal installments.",
    tags: ["Agriculture", "Farmer", "Financial Support", "Subsidy"],
    category: "central",
    occupation: "farmer"
  },
  {
    id: 5,
    title: "Pradhan Mantri Mudra Yojana (PMMY)",
    department: "Ministry of Finance",
    description: "Provides loans up to 10 lakh to non-corporate, non-farm small/micro enterprises for setting up business and expansion.",
    tags: ["Business Loan", "Entrepreneur", "Micro Finance", "MSME"],
    category: "central",
    occupation: "business"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const mainSearchInput = document.getElementById("mainSearchInput");
  const mainSearchBtn = document.getElementById("mainSearchBtn");
  const schemesList = document.getElementById("schemesList");
  const schemeCount = document.getElementById("schemeCount");
  
  const occupationFilter = document.getElementById("occupationFilter");
  const stateFilter = document.getElementById("stateFilter");
  const ageFilter = document.getElementById("ageFilter");
  const resetFiltersBtn = document.getElementById("resetFilters");

  // Read search term passed from the home page URL parameter (e.g. search.html?query=loan)
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get("query");

  if (initialQuery) {
    mainSearchInput.value = initialQuery;
  }

  // Filter and Render Schemes
  function renderSchemes() {
    const query = mainSearchInput.value.toLowerCase().trim();
    const selectedOcc = occupationFilter.value;

    const filtered = mockSchemes.filter((scheme) => {
      const matchesSearch =
        scheme.title.toLowerCase().includes(query) ||
        scheme.description.toLowerCase().includes(query) ||
        scheme.tags.some((t) => t.toLowerCase().includes(query));

      const matchesOcc = selectedOcc === "all" || scheme.occupation === selectedOcc;

      return matchesSearch && matchesOcc;
    });

    schemeCount.innerHTML = `Total <strong>${filtered.length}</strong> schemes available`;

    if (filtered.length === 0) {
      schemesList.innerHTML = `
        <div class="scheme-card" style="text-align: center; color: #64748b; padding: 40px;">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 32px; margin-bottom: 12px; color: #cbd5e1;"></i>
          <p>No matching schemes found for your current criteria.</p>
        </div>`;
      return;
    }

    schemesList.innerHTML = filtered
      .map(
        (scheme) => `
      <div class="scheme-card">
        <h3>${scheme.title}</h3>
        <div class="scheme-dept">${scheme.department}</div>
        <p class="scheme-desc">${scheme.description}</p>
        <div class="scheme-tags">
          ${scheme.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </div>
    `
      )
      .join("");
  }

  // Event Listeners for Searching and Filtering
  mainSearchBtn.addEventListener("click", renderSchemes);
  mainSearchInput.addEventListener("keyup", renderSchemes);
  occupationFilter.addEventListener("change", renderSchemes);

  resetFiltersBtn.addEventListener("click", () => {
    occupationFilter.value = "all";
    stateFilter.value = "all";
    ageFilter.value = "all";
    mainSearchInput.value = "";
    renderSchemes();
  });

  // Initial render call
  renderSchemes();
});
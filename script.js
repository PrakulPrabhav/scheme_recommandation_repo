document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("schemeSearchInput");
  const searchBtn = document.getElementById("searchBtn");
  const findSchemesBtn = document.getElementById("findSchemesBtn");
  const applyNowBtn = document.getElementById("applyNowBtn");
  const submitProblemBtn = document.getElementById("submitProblemBtn");
  const problemInput = document.getElementById("problemInput");
  const problemSection = document.getElementById("problemSection");
  const themeToggle = document.getElementById("themeToggle");

  // Smooth scroll to problem input section
  findSchemesBtn.addEventListener("click", () => {
    problemSection.scrollIntoView({ behavior: "smooth" });
    problemInput.focus();
  });

  // Top header search action
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      alert(`Searching schemes for: "${query}"`);
    } else {
      alert("Please enter a scheme name to search.");
    }
  });

  // AI Problem submission handler
  submitProblemBtn.addEventListener("click", () => {
    const problemText = problemInput.value.trim();
    if (problemText) {
      alert(`Processing your criteria:\n\n"${problemText}"\n\nRedirecting to matched schemes...`);
    } else {
      alert("Please enter your problem or details first.");
    }
  });

  // Apply button action
  applyNowBtn.addEventListener("click", () => {
    alert("Redirecting to the National Scholarship Portal registration page...");
  });

  // Simple Theme Toggle placeholder
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const icon = themeToggle.querySelector("i");
    if (document.body.classList.contains("dark-mode")) {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    } else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  });
});

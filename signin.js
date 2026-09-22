document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const mainIdentifier = document.getElementById("mainIdentifier");
  const pinInput = document.getElementById("pinInput");
  const pinlessAuth = document.getElementById("pinlessAuth");
  const signinForm = document.getElementById("signinForm");

  // Tab switching configurations
  const tabConfigs = {
    mobile: {
      placeholder: "Mobile*",
      type: "tel"
    },
    username: {
      placeholder: "Username*",
      type: "text"
    },
    other: {
      placeholder: "Aadhaar / PAN / Driving License*",
      type: "text"
    }
  };

  // Handle Tab Switch
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all tabs
      tabButtons.forEach((b) => b.classList.remove("active"));
      
      // Add active class to clicked tab
      btn.classList.add("active");

      // Change input field placeholder based on tab
      const targetType = btn.getAttribute("data-type");
      const config = tabConfigs[targetType];
      
      if (config) {
        mainIdentifier.placeholder = config.placeholder;
        mainIdentifier.type = config.type;
        mainIdentifier.value = ""; // clear field on tab change
      }
    });
  });

  // Toggle PIN field disabled state when "PIN less authentication" is checked
  pinlessAuth.addEventListener("change", (e) => {
    if (e.target.checked) {
      pinInput.disabled = true;
      pinInput.placeholder = "PIN (Not required)";
      pinInput.value = "";
      pinInput.required = false;
    } else {
      pinInput.disabled = false;
      pinInput.placeholder = "PIN*";
      pinInput.required = true;
    }
  });

  // Form Submission Handler
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const identifierValue = mainIdentifier.value.trim();
    const pinValue = pinInput.value.trim();

    if (!identifierValue) {
      alert("Please enter your login details.");
      return;
    }

    if (!pinlessAuth.checked && !pinValue) {
      alert("Please enter your security PIN.");
      return;
    }

    // Submit payload mock
    alert(`Signing in...\nIdentifier: ${identifierValue}\nPIN-less: ${pinlessAuth.checked ? "Yes" : "No"}`);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submitProblemBtn");
  const problemInput = document.getElementById("problemInput");
  const resultsContainer = document.getElementById("resultsContainer");

  if (!submitBtn || !problemInput) {
    console.error("Button or Input element not found!");
    return;
  }

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const userText = problemInput.value.trim();

    if (!userText) {
      alert("Please describe your situation before searching!");
      return;
    }

    // 1. Show loading state on screen
    submitBtn.innerText = "Finding Matching Schemes...";
    submitBtn.disabled = true;
    resultsContainer.innerHTML = `
      <div style="background: #eef7f2; border: 1px solid #2d7a4c; padding: 20px; border-radius: 8px; text-align: center; color: #2d7a4c;">
        ⏳ Connecting to Yojna Mitra AI Advisor...
      </div>
    `;

    try {
      // 2. Fetch recommendations from FastAPI server
      const response = await fetch("http://127.0.0.1:8000/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ problem: userText })
      });

      const data = await response.json();

      // 3. Render output on screen
      if (data.status === "success") {
        // Convert Markdown headers and lists to clean HTML breaks
        let formattedText = data.recommendations
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\n/g, '<br>');

        resultsContainer.innerHTML = `
          <div style="background: #ffffff; border: 2px solid #2d7a4c; padding: 25px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); text-align: left;">
            <h2 style="color: #2d7a4c; margin-top: 0; margin-bottom: 15px;">🎯 Recommended Schemes For You</h2>
            <div style="color: #2c3e50; line-height: 1.8; font-size: 15px;">
              ${formattedText}
            </div>
          </div>
        `;
      } else {
        resultsContainer.innerHTML = `
          <div style="background: #fde8e8; border: 1px solid #e53e3e; padding: 15px; border-radius: 8px; color: #c53030;">
            ⚠️ Error: ${data.detail || "Unable to fetch scheme recommendations."}
          </div>
        `;
      }
    } catch (err) {
      console.error("API Error:", err);
      resultsContainer.innerHTML = `
        <div style="background: #fde8e8; border: 1px solid #e53e3e; padding: 15px; border-radius: 8px; color: #c53030;">
          ❌ Could not connect to backend. Please ensure Uvicorn is running on port 8000!
        </div>
      `;
    } finally {
      // Restore button text
      submitBtn.innerText = "Search Matching Schemes";
      submitBtn.disabled = false;
    }
  });
});
// Initialize standard Google Translate Widget
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    autoDisplay: false
  }, 'google_translate_element');
}

// Function to handle custom language changes via cookie
function changeLanguage(langCode) {
  // Set Google Translate cookie for domain
  document.cookie = `googtrans=/en/${langCode}; path=/;`;
  document.cookie = `googtrans=/en/${langCode}; domain=${window.location.hostname}; path=/;`;
  
  // Reload the page to apply full translation instantly
  window.location.reload();
}

// On page load, set dropdown to match current active language cookie
document.addEventListener("DOMContentLoaded", function() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    if (cookie.trim().startsWith('googtrans=')) {
      const match = cookie.match(/\/en\/([a-z]{2})/);
      if (match && match[1]) {
        const select = document.getElementById('customLangSelect');
        if (select) select.value = match[1];
      }
    }
  }
});
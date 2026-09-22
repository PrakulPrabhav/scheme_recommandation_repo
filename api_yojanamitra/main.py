from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 1. Create the backend app
app = FastAPI()

# 2. Allow your HTML front-end to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Create a test API endpoint (URL)
@app.get("/")
def home():
    return {"message": "Hello! The Yojna Mitra backend is running!"}

# 4. Create an endpoint to handle user needs
@app.post("/api/recommend")
def get_recommendations(data: dict):
    user_problem = data.get("problem", "")
    
    # Right now, returning sample output to test
    return {
        "status": "success",
        "user_input": user_problem,
        "schemes": [
            "Central Sector Scheme of Higher Education Loan",
            "Vidya Lakshmi Education Loan Scheme"
        ]
    }
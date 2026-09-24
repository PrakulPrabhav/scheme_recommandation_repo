import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai

app = FastAPI(title="Yojna Mitra AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserQuery(BaseModel):
    problem: str

@app.get("/")
def home():
    return {"status": "success", "message": "Yojna Mitra API is Live!"}

@app.post("/api/recommend")
def get_recommendations(data: UserQuery):
    load_dotenv(override=True)
    api_key = os.getenv("GEMINI_API_KEY")
    
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY missing in .env file")

    # Configure Gemini with your API Key
    genai.configure(api_key=api_key)

    prompt = f"""
    You are Yojna Mitra, an AI Government Scheme Eligibility Advisor for Indian citizens.
    Analyze the following user situation and recommend the top 3 relevant government schemes (Central/State).

    User Situation: "{data.problem}"

    Respond with clean Markdown:
    1. **Scheme Name**
    2. **Ministry/Department**
    3. **Eligibility Summary**
    4. **Key Benefits**
    """

    try:
        model = genai.GenerativeModel('gemini-3.6-flash')
        response = model.generate_content(prompt)
        return {
            "status": "success",
            "recommendations": response.text
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
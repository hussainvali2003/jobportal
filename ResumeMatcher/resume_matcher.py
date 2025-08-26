from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util
from keybert import KeyBERT
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
import fitz  # PyMuPDF
import re
from datetime import datetime

app = FastAPI()

# Load models once
sbert_model = SentenceTransformer('all-MiniLM-L6-v2')
keybert_model = KeyBERT(model=sbert_model)

# Request schemas
class MatchRequest(BaseModel):
    resume: str
    job: str

class ExperienceRequest(BaseModel):
    resume_text: str

# 1️⃣ Resume Score Matching
@app.post("/match")
def match_score(req: MatchRequest):
    embeddings = sbert_model.encode([req.resume, req.job], convert_to_tensor=True)
    score = util.pytorch_cos_sim(embeddings[0], embeddings[1]).item()

    resume_keywords = set(kw[0].lower() for kw in keybert_model.extract_keywords(req.resume, top_n=15, stop_words=ENGLISH_STOP_WORDS))
    job_keywords = set(kw[0].lower() for kw in keybert_model.extract_keywords(req.job, top_n=15, stop_words=ENGLISH_STOP_WORDS))
    matched_skills = list(resume_keywords & job_keywords)

    return {
        "score": round(score * 100, 2),
        "matched_skills": matched_skills[:5],
        "resume_keywords": list(resume_keywords),
        "job_keywords": list(job_keywords)
    }

# 2️⃣ PDF Resume Text Extraction
@app.post("/extract-resume-text")
async def extract_resume_text(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        return {"error": "Only PDF files supported"}

    content = await file.read()
    with fitz.open(stream=content, filetype="pdf") as doc:
        text = ""
        for page in doc:
            text += page.get_text()

    return {"text": text}

# 3️⃣ Experience Year Extraction
@app.post("/experience")
def extract_experience(req: ExperienceRequest):
    text = req.resume_text.lower()
    experiences = []

    # A. Direct year mentions
    patterns = [
        r'(\d{1,2})\+?\s*years? of experience',
        r'(\d{1,2})\+?\s*years? experience',
        r'(\d{1,2})\+?\s*years?\s*in',
        r'(\d{1,2})\s*years?\s*and\s*(\d{1,2})\s*months?',  # e.g., "4 years and 3 months"
    ]

    for pattern in patterns:
        for match in re.findall(pattern, text):
            if isinstance(match, tuple):
                years, months = map(int, match)
                total_years = years + months / 12
            else:
                total_years = int(match)
            experiences.append(total_years)

    # B. Date ranges like "Jan 2020 to Present" or "July 2018 - May 2022"
    date_patterns = re.findall(
        r'(?i)(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[\s,.-]*(\d{4})\s*(to|-)\s*(present|current|(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[\s,.-]*(\d{4}))',
        text
    )

    for match in date_patterns:
        start_month_str, start_year, _, end_value, *rest = match

        try:
            start_date = datetime.strptime(f"{start_month_str} {start_year}", "%b %Y")
        except:
            continue

        if "present" in end_value.lower() or "current" in end_value.lower():
            end_date = datetime.now()
        else:
            end_month_str, end_year = rest[-2], rest[-1]
            try:
                end_date = datetime.strptime(f"{end_month_str} {end_year}", "%b %Y")
            except:
                continue

        delta_years = (end_date - start_date).days / 365
        if delta_years > 0:
            experiences.append(delta_years)

    # Final max experience
    max_exp = round(max(experiences), 1) if experiences else 0.0

    return {"experience_years": max_exp}

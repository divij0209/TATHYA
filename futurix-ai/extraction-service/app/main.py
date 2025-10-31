import logging
from fastapi import FastAPI, File, UploadFile, HTTPException
from app.schemas.document_schema import ExtractedData
from fastapi.middleware.cors import CORSMiddleware
from app.ai.tesseract_ocr import extract_text_from_file
from app.ai.parser import parse_raw_text
from app.utils.file_utils import save_temp_upload_file, remove_temp_file
import pytesseract

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Futurix-AI: Extraction Service (Free Tesseract)",
    description="An API that uses Tesseract for free OCR and regex parsing."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/extract", response_model=ExtractedData)
async def extract_document_data(file: UploadFile = File(...)):
    """Endpoint to upload an image, run free OCR, parse, and return data."""
    temp_file_path = None
    try:
        temp_file_path = await save_temp_upload_file(file)
        raw_text = await extract_text_from_file(temp_file_path)
        if not raw_text:
            raise HTTPException(status_code=400, detail="OCR failed to extract any text.")
        structured_data = parse_raw_text(raw_text)
        return structured_data
    except pytesseract.TesseractNotFoundError:
        logger.error("CRITICAL: Tesseract executable not found inside container.")
        raise HTTPException(status_code=500, detail="OCR engine (Tesseract) is not installed on the server.")
    except Exception as e:
        logger.error(f"Error processing file {file.filename}: {e}")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
    finally:
        if temp_file_path:
            remove_temp_file(temp_file_path)

@app.get("/", include_in_schema=False)
async def root():
    return {"message": "Futurix-AI Extraction Service is running. POST to /api/extract."}

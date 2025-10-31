import pytesseract
from PIL import Image
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def extract_text_from_file(file_path: str) -> str:
    """
    Uses Tesseract (free, local OCR) on an image file.
    This replaces gcloud_docai.py and aws_textract.py.
    """
    try:
        img = Image.open(file_path)
        # Run Tesseract OCR
        text = pytesseract.image_to_string(img)
        logger.info(f"Successfully extracted text from {file_path} using Tesseract")
        return text
    except pytesseract.TesseractNotFoundError:
        logger.error("TESSERACT_NOT_FOUND: The Tesseract OCR engine is not installed in this container.")
        raise
    except Exception as e:
        logger.error(f"Error during Tesseract extraction from {file_path}: {e}")
        return ""

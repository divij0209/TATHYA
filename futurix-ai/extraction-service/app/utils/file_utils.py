import os
import shutil
import uuid
import logging
from fastapi import UploadFile
from pydantic_settings import BaseSettings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Settings(BaseSettings):
    TEMP_UPLOAD_DIR: str = "temp_uploads"
    class Config:
        env_file = ".env"

settings = Settings()
TEMP_DIR = settings.TEMP_UPLOAD_DIR
os.makedirs(TEMP_DIR, exist_ok=True)

async def save_temp_upload_file(file: UploadFile) -> str:
    """Saves an UploadFile to a unique temporary path. Returns the file path."""
    try:
        unique_filename = f"{uuid.uuid4()}_{file.filename}"
        temp_file_path = os.path.join(TEMP_DIR, unique_filename)
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        logger.info(f"File saved temporarily to {temp_file_path}")
        return temp_file_path
    finally:
        file.file.close()

def remove_temp_file(file_path: str):
    """Removes a file from the temporary directory."""
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
            logger.info(f"Removed temporary file: {file_path}")
        except Exception as e:
            logger.error(f"Error removing temp file {file_path}: {e}")

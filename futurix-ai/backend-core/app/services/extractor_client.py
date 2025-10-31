import httpx
import logging
from fastapi import UploadFile, HTTPException
from ..config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def call_extraction_service(file: UploadFile) -> dict:
    """
    Forwards an UploadFile to the extraction-service and returns
    the extracted JSON data.
    """
    # We must read the file into memory to send it
    file_content = await file.read()
    await file.seek(0) # Reset file pointer in case it's used again
    
    files = {'file': (file.filename, file_content, file.content_type)}
    
    async with httpx.AsyncClient() as client:
        try:
            logger.info(f"Calling extraction service at {settings.EXTRACTION_URL} for file {file.filename}")
            res = await client.post(settings.EXTRACTION_URL, files=files, timeout=45.0)
            res.raise_for_status() # Raise error for bad responses (4xx or 5xx)
            logger.info(f"Extraction successful for file {file.filename}")
            return res.json()
            
        except httpx.RequestError as e:
            logger.error(f"Error calling extraction service: {e}")
            raise HTTPException(status_code=503, detail=f"Failed to connect to extraction service: {e}")
        except httpx.HTTPStatusError as e:
            logger.error(f"Extraction service returned status {e.response.status_code}: {e.response.text}")
            raise HTTPException(status_code=424, detail=f"Extraction service failed (Status {e.response.status_code})")

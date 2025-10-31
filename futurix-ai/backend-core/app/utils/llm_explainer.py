import httpx
import logging
from ..config import settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

SHIVAAY_API_URL = "https://api.futurixai.com/v1/shivaay/completions"

async def generate_llm_explanation(discrepancy_report: dict) -> str:
    """
    Calls the Shivaay LLM to get a natural language explanation
    for a given discrepancy report.
    """
    if not discrepancy_report or not discrepancy_report.get("details"):
        return "No discrepancies found to explain."

    async with httpx.AsyncClient() as client:
        payload = {
            "model": "shivaay-1",
            "messages": [
                {"role": "system", "content": "You are an expert financial auditor. Your task is to explain invoice discrepancies clearly and suggest resolution steps."},
                {"role": "user", "content": f"Explain the following discrepancy report, identify the most likely cause, and suggest a resolution: {discrepancy_report}"}
            ]
        }
        headers = {
            "Authorization": f"Bearer {settings.SHIVAAY_API_KEY}",
            "Content-Type": "application/json"
        }
        
        try:
            res = await client.post(SHIVAAY_API_URL, json=payload, headers=headers, timeout=30.0)
            res.raise_for_status() # Raise an exception for 4xx or 5xx status
            
            data = res.json()
            explanation = data.get("choices", [{}])[0].get("message", {}).get("content", "")
            
            logger.info("Successfully generated LLM explanation.")
            return explanation if explanation else "AI explanation could not be generated."
            
        except httpx.RequestError as e:
            logger.error(f"LLM API request error: {e}")
            return f"AI reasoning unavailable due to network error: {e}"
        except httpx.HTTPStatusError as e:
            logger.error(f"LLM API returned status {e.response.status_code}: {e.response.text}")
            return f"AI reasoning unavailable due to API error (Status {e.response.status_code})."
        except Exception as e:
            logger.error(f"Unexpected LLM API error: {e}")
            return "AI reasoning unavailable due to an unexpected error."

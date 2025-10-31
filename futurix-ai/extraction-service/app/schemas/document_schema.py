from pydantic import BaseModel
from typing import Optional

class ExtractedData(BaseModel):
    """
    Standardized schema for extracted document data.
    This schema is the standard output for all AI providers.
    """
    vendor_name: Optional[str] = None
    invoice_number: Optional[str] = None
    issue_date: Optional[str] = None
    total_amount: Optional[float] = None
    raw_text: str # Always include the full raw text

import re
from app.schemas.document_schema import ExtractedData
from typing import Optional

def find_total(text: str) -> Optional[float]:
    """Finds the largest currency-like number, likely the total."""
    matches = re.findall(r'[\$£€]?\s?(\d{1,3}(?:,\d{3})*(?:\.\d{2})|\d+(?:\.\d{2}))', text)
    amounts = [float(match.replace(',', '')) for match in matches if match]
    return max(amounts) if amounts else None

def find_date(text: str) -> Optional[str]:
    """Finds the first match for common date formats."""
    date_patterns = [r'(\d{4}-\d{2}-\d{2})', r'(\d{2}/\d{2}/\d{4})', r'(\d{2}-[A-Za-z]{3}-\d{4})']
    for pattern in date_patterns:
        match = re.search(pattern, text)
        if match:
            return match.group(1)
    return None

def find_invoice_number(text: str) -> Optional[str]:
    """Finds a likely invoice number."""
    patterns = [r'[Ii]nvoice\s?[Nn]o\.?\s?:?\s?([A-Za-z0-9-]+)', r'[Ii][Nn][Vv]-?(\d+)', r'#\s?(\d+)']
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            return match.group(1)
    return None

def parse_raw_text(text: str) -> ExtractedData:
    """Parses raw OCR text to find key-value pairs using regex."""
    vendor = next((line.strip() for line in text.split('\n') if line.strip()), None)
    return ExtractedData(
        vendor_name=vendor,
        invoice_number=find_invoice_number(text),
        issue_date=find_date(text),
        total_amount=find_total(text),
        raw_text=text
    )

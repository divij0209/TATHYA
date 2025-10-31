from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from typing import List
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession

from .config import settings
from fastapi.middleware.cors import CORSMiddleware
from .database import get_db
from .services.extractor_client import call_extraction_service
from .utils.matching import run_3way_match
from .utils.llm_explainer import generate_llm_explanation

app = FastAPI(
    title="Futurix-AI: Backend Core",
    description="Manages documents, runs matching, and provides AI Reasoning."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    # This is a good place to initialize DB, etc.
    # For now, just print a message
    print("Backend Core is starting up...")
    print(f"Extraction service URL: {settings.EXTRACTION_URL}")

@app.post("/api/v1/documents/upload_set")
async def upload_document_set(
    po_file: UploadFile = File(..., description="Purchase Order file"), 
    invoice_file: UploadFile = File(..., description="Invoice file"), 
    grn_file: UploadFile = File(..., description="Goods Received Note file")
    # db: AsyncSession = Depends(get_db) # Uncomment when DB models are ready
):
    """
    This is the main end-to-end flow:
    1. Upload 3 files (PO, Invoice, GRN).
    2. Send all 3 to extraction-service *in parallel*.
    3. Run 3-way match on the resulting JSONs.
    4. Send any discrepancies to the Shivaay LLM for explanation.
    5. Save everything to DB (stubbed).
    6. Return the full report with the AI explanation.
    """
    try:
        # 2. Call Extraction Service for all 3 files in parallel
        extraction_tasks = [
            call_extraction_service(po_file),
            call_extraction_service(invoice_file),
            call_extraction_service(grn_file)
        ]
        results = await asyncio.gather(*extraction_tasks, return_exceptions=True)
        
        # Check if any task failed
        for result in results:
            if isinstance(result, Exception):
                # If the exception is an HTTPException, re-raise it
                if isinstance(result, HTTPException):
                    raise result
                # Otherwise, wrap it in a generic 500
                raise HTTPException(status_code=500, detail=f"An extraction task failed: {result}")

        po_json, invoice_json, grn_json = results

        # 3. Run 3-Way Match
        discrepancy_report = run_3way_match(po_json, invoice_json, grn_json)

        # 4. Get LLM Explanation for discrepancies
        llm_reason = await generate_llm_explanation(discrepancy_report)
        discrepancy_report["llm_explanation"] = llm_reason
        
        # 5. Save to DB (stubbed)
        # new_doc_set = await crud.create_document_set(
        #     db=db, 
        #     po_data=po_json, 
        #     invoice_data=invoice_json, 
        #     grn_data=grn_json,
        #     report=discrepancy_report
        # )
        # document_set_id = new_doc_set.id
        document_set_id = "ds_12345-mock" # Placeholder
        
        # 6. Return the full result
        return {
            "status": "success",
            "document_set_id": document_set_id,
            "extracted_data": {
                "purchase_order": po_json,
                "invoice": invoice_json,
                "goods_received_note": grn_json
            },
            "analysis_report": {
                "discrepancies": discrepancy_report,
                # "fraud_report": ... (fraud_check.py)
            }
        }
    except HTTPException as he:
        # Re-raise HTTPExceptions directly
        raise he
    except Exception as e:
        # Catch any other unexpected errors
        import logging
        logging.error(f"Unexpected error in upload_document_set: {e}")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

@app.get("/", include_in_schema=False)
async def root():
    return {"message": "Futurix-AI Backend Core is running."}

def run_3way_match(po_json: dict, invoice_json: dict, grn_json: dict) -> dict:
    """
    Placeholder: Runs the 3-way match and returns a discrepancy report.
    """
    discrepancies = []
    
    # Example logic: Compare total amounts
    po_total = po_json.get('total_amount')
    inv_total = invoice_json.get('total_amount')
    
    if po_total is not None and inv_total is not None and po_total != inv_total:
        discrepancies.append({
            "field": "total_amount",
            "po_value": po_total,
            "invoice_value": inv_total,
            "message": f"PO total ({po_total}) does not match Invoice total ({inv_total})."
        })
        
    # Example logic: Check for missing invoice number
    if not invoice_json.get('invoice_number'):
        discrepancies.append({
            "field": "invoice_number",
            "message": "Missing invoice number from extracted invoice data."
        })

    return {
        "total_discrepancies": len(discrepancies),
        "details": discrepancies
    }

// Very simple rule-based intent parser for finance queries
export function parseFinanceQuery(text) {
  const normalized = (text || '').trim()
  if (!normalized) return { intent: 'unknown' }

  // Status of PO-123 pattern
  const poMatch = normalized.match(/po[-\s]?([a-z0-9]+)/i)
  if (/status/i.test(normalized) && poMatch) {
    return { intent: 'po_status', poNumber: `PO-${poMatch[1].toUpperCase()}` }
  }

  // Mismatched invoices from 'Vendor'
  const mismatchedVendor = normalized.match(/mismatch(?:ed)? .*from ['\"]([^'\"]+)['\"]/i)
  if (mismatchedVendor) {
    return { intent: 'mismatches_by_vendor', vendor: mismatchedVendor[1] }
  }

  // Total amount owed to 'Vendor'
  const owedVendor = normalized.match(/total amount owed to ['\"]([^'\"]+)['\"]/i)
  if (owedVendor) {
    return { intent: 'total_owed_to_vendor', vendor: owedVendor[1] }
  }

  return { intent: 'unknown' }
}

// Temporary canned responders; replace with backend calls when available
export async function respondToFinanceQuery(parsed) {
  switch (parsed.intent) {
    case 'po_status':
      // Stubbed response
      return `Status for ${parsed.poNumber}: Approved and awaiting invoice match.`
    case 'mismatches_by_vendor':
      return `Mismatched invoices from '${parsed.vendor}': INV-1023 (qty), INV-1041 (unit_price).`
    case 'total_owed_to_vendor':
      return `Total amount owed to '${parsed.vendor}': ₹ 4,72,360.`
    default:
      return "I can help with PO status, mismatched invoices by vendor, and total owed to a vendor. Try: 'What's the status of PO-456?'"
  }
}



"""
Fetch recent invoice emails from Gmail and download PDF attachments.

Setup:
1) Place your Google OAuth client file as credentials.json next to this script (or pass a path via --creds).
2) Create a virtualenv and install deps:
   pip install --upgrade google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client
3) Run:
   python fetch_invoices.py --max 10 --query "has:attachment filename:pdf subject:invoice"

Notes:
- On first run, a browser window will ask you to authorize. token.json will be created for reuse.
- Downloads PDFs to ./invoices by default (override with --out).
"""

from __future__ import annotations

import argparse
import base64
import os
from pathlib import Path
from typing import List, Dict, Any

from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials


SCOPES = ["https://www.googleapis.com/auth/gmail.readonly", "https://www.googleapis.com/auth/gmail.modify"]


def connect_to_gmail(creds_path: Path, token_path: Path) -> Any:
    creds: Credentials | None = None
    if token_path.exists():
        creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())

    if not creds or not creds.valid:
        flow = InstalledAppFlow.from_client_secrets_file(str(creds_path), SCOPES)
        creds = flow.run_local_server(port=0)
        token_path.write_text(creds.to_json(), encoding="utf-8")

    service = build("gmail", "v1", credentials=creds)
    return service


def fetch_messages(service: Any, query: str, user_id: str = "me", max_results: int = 10) -> List[Dict[str, Any]]:
    res = service.users().messages().list(userId=user_id, q=query, maxResults=max_results).execute()
    return res.get("messages", [])


def ensure_label(service: Any, label_name: str, user_id: str = "me") -> str:
    labels = service.users().labels().list(userId=user_id).execute().get("labels", [])
    for lbl in labels:
        if lbl.get("name") == label_name:
            return lbl.get("id")
    created = (
        service.users()
        .labels()
        .create(userId=user_id, body={"name": label_name, "labelListVisibility": "labelShow", "messageListVisibility": "show"})
        .execute()
    )
    return created.get("id")


def download_attachments(service: Any, messages: List[Dict[str, Any]], out_dir: Path, user_id: str = "me", label_id_to_add: str | None = None) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    for m in messages:
        msg = service.users().messages().get(userId=user_id, id=m["id"]).execute()
        payload = msg.get("payload", {})
        parts = payload.get("parts", [])
        for part in parts:
            filename = part.get("filename")
            body = part.get("body", {})
            if filename and body.get("attachmentId"):
                att = (
                    service.users()
                    .messages()
                    .attachments()
                    .get(userId=user_id, messageId=m["id"], id=body["attachmentId"])  # type: ignore
                    .execute()
                )
                data = att.get("data")
                if not data:
                    continue
                file_bytes = base64.urlsafe_b64decode(data)
                dest = out_dir / filename
                with open(dest, "wb") as f:
                    f.write(file_bytes)
                print(f"✅ Saved: {dest}")

        if label_id_to_add:
            try:
                service.users().messages().modify(
                    userId=user_id, id=m["id"], body={"addLabelIds": [label_id_to_add]}
                ).execute()
            except Exception:
                # Non-fatal if modify scope wasn't granted
                pass


def main() -> None:
    parser = argparse.ArgumentParser(description="Fetch invoice PDFs from Gmail")
    parser.add_argument("--creds", default="credentials.json", help="Path to OAuth client credentials.json")
    parser.add_argument("--token", default="token.json", help="Path to store OAuth token.json")
    parser.add_argument("--out", default="./invoices", help="Download directory for attachments")
    parser.add_argument("--query", default="has:attachment filename:pdf subject:invoice", help="Gmail search query")
    parser.add_argument("--max", type=int, default=10, help="Max results to fetch")
    parser.add_argument("--label", default="Processed", help="Gmail label to add after download (requires modify scope)")
    args = parser.parse_args()

    creds_path = Path(args.creds)
    token_path = Path(args.token)
    out_dir = Path(args.out)

    if not creds_path.exists():
        raise FileNotFoundError(f"credentials.json not found at: {creds_path}")

    service = connect_to_gmail(creds_path, token_path)
    msgs = fetch_messages(service, args.query, max_results=args.max)
    if not msgs:
        print("No matching emails found.")
        return

    print(f"Found {len(msgs)} email(s). Downloading attachments...")
    label_id = None
    try:
        label_id = ensure_label(service, args.label)
    except Exception:
        # Label creation will fail without modify scope; downloads still proceed
        pass
    download_attachments(service, msgs, out_dir, label_id_to_add=label_id)


if __name__ == "__main__":
    main()



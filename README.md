#  Tathya: AI-Powered Document Verification

🏆 **Project for the Futurix AI FinTech Hackathon**

Tathya is an AI-powered system designed to automatically read, verify, and match invoices with their corresponding purchase orders. It streamlines the accounts payable process by flagging discrepancies and reducing manual data entry.

## ✨ Core Features

* **AI-Powered Data Extraction:** Uses OCR (Tesseract) to read and parse data from PDF or image-based invoices and purchase orders.
* **Smart Verification:** Automatically compares key fields (e.g., PO number, line items, quantities, totals) between documents.
* **Discrepancy Reporting:** Provides a clear report highlighting any mismatches or potential issues.
* **Web-Based Dashboard:** A modern React frontend for uploading documents and viewing analysis results.

## 🛠️ Tech Stack

* **Frontend:** React, Vite, Tailwind CSS
* **Backend:** Python (FastAPI)
* **AI / Extraction Service:** Python, Tesseract (OCR)
* **Containerization:** Docker & Docker Compose

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing.

### Prerequisites

* [Docker](https://www.docker.com/get-started)
* [Git](https://git-scm.com/)
* A Google Cloud project with OAuth 2.0 credentials (for the `credentials.json` file)

### 1. Clone the Repository

```sh
git clone [https://github.com/divij0209/TATHYA.git](https://github.com/divij0209/TATHYA.git)
cd TATHYA

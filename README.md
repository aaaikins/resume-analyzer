# AI Resume Analyzer

AI-powered resume analysis app built with React. Upload a resume (PDF/TXT) to get instant insights: overall score, ATS optimization tips, key phrases/entities, skills gaps, and job match indicators. Authentication is handled with Clerk. API calls are mocked by default for local development, with optional AWS API Gateway integration when you provide an endpoint.

## Features

- Secure sign-in with Clerk
- Drag-and-drop resume upload (PDF or TXT)
- Analysis results: overall score, ATS score, job match, skills gap, key phrases, entities, sentiment
- Resume versions view to track improvements over time
- Mocked API responses for fast local development
- Optional AWS API Gateway backend integration

## Prerequisites

- Node.js 18+ and npm (or Yarn). The project follows a typical Create React App layout.
- A Clerk Publishable Key for authentication.
- Optional: An AWS API Gateway endpoint backing the analyze and versions routes. See AWS guide below.

## Quick start

1) Clone and install dependencies

```bash
git clone https://github.com/aaaikins/resume-analyzer.git
cd resume-analyzer
npm install
```

2) Configure environment

Create a .env file in the project root with at least your Clerk key. Leave REACT_APP_API_ENDPOINT empty to use the built-in mock service locally.

```bash
# required
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX

# optional – set to your API Gateway base URL to enable the live backend
# Example: https://abc123.execute-api.us-east-1.amazonaws.com/prod
REACT_APP_API_ENDPOINT=
```

Notes
- If REACT_APP_API_ENDPOINT is empty or set to YOUR_API_GATEWAY_URL, the app will automatically use the mock service.
- When using the AWS API, the app sends Authorization: Bearer <token> using localStorage key cognito_access_token. Ensure your auth flow stores a valid token if your API requires it.

3) Run the app

```bash
npm start
```

Then open http://localhost:3000 and sign in via Clerk. Upload a PDF/TXT and click “Analyze Resume”.

## Configuration

Environment variables
- REACT_APP_CLERK_PUBLISHABLE_KEY: Required for ClerkProvider.
- REACT_APP_API_ENDPOINT: Optional. Base URL of your API Gateway. Example routes used by the app:
	- POST {API_ENDPOINT}/analyze
	- GET {API_ENDPOINT}/versions/{userId}
	- POST {API_ENDPOINT}/versions

File types and limits
- Accepts: PDF (application/pdf) and plain text (text/plain)
- UI guidance mentions a 10MB max; enforce larger limits server-side if needed

## How it works

- Auth: `@clerk/clerk-react` components gate access. Without a publishable key, the UI shows a configuration error.
- Upload/Analyze: `src/components/FileUpload.js` calls `analyzeResume()` in `src/services/awsService.js`.
- Mock vs. Live API: `src/services/awsService.js` uses the mock when `REACT_APP_API_ENDPOINT` is not set (or equals YOUR_API_GATEWAY_URL). On live errors, it also falls back to the mock.
- Results UI: `src/components/AnalysisResults.js` renders ResumeScore, JobMatch, SkillsGap, ATSOptimization plus sentiment, entities, and key phrases.
- Versions: After a successful analysis, a version is saved via `saveResumeVersion()` (mocked by default) and displayed in `src/components/ResumeVersions.js`.

Data shape (returned by mock)
```json
{
	"sentiment": { "sentiment": "POSITIVE", "confidence": 0.85 },
	"entities": [ { "text": "John Doe", "type": "PERSON", "confidence": 0.95 } ],
	"keyPhrases": [ { "text": "software development", "confidence": 0.89 } ],
	"resumeScore": 85,
	"jobMatch": { "overall": 78, "skills": 82, "experience": 75, "education": 80 },
	"skillsGap": { "missing": ["AWS"], "matched": ["React"], "recommendations": [] },
	"atsOptimization": { "score": 72, "issues": [], "suggestions": [] },
	"score": 85,
	"suggestions": ["Add more quantifiable achievements"]
}
```

## AWS backend (optional)

See AWS_DEPLOYMENT_GUIDE.md for an end-to-end setup (API Gateway, Lambda, storage). Once deployed, set REACT_APP_API_ENDPOINT to your API base URL to enable the live backend. Ensure your API returns the same shape as above, or update the UI accordingly.

## Troubleshooting

- “Configuration Error – Missing Clerk publishable key”: Set REACT_APP_CLERK_PUBLISHABLE_KEY in .env and restart the dev server.
- “Using mock service for development” in console: Expected when REACT_APP_API_ENDPOINT isn’t set; set it to enable the live API.
- API errors: The app logs the error and falls back to the mock response so you can keep testing.
- Upload fails: Ensure the file is PDF/TXT and within your size limits.

## Project structure (high level)

- src/App.js – App shell, authentication gate, and layout
- src/components/* – UI components (upload, results, versions, etc.)
- src/services/awsService.js – Switches between live API and mock; handles fetch calls
- src/services/mockService.js – Deterministic mock responses for local dev

## License

This project has no explicit license file. Add one (e.g., MIT) if you plan to open-source contributions.


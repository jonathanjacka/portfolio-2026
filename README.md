# Portfolio 2026

An AI-powered portfolio chatbot that lets visitors learn about your background and experience through natural conversation. Features a React frontend with real-time streaming responses and an Express backend powered by OpenAI's GPT-4o-mini.

## Features

- **Conversational AI** — Chat naturally about skills, experience, and projects
- **Real-time streaming** — Responses stream in as they're generated
- **Dynamic context** — Agent pulls from YAML data files and GitHub repos
- **Contact collection** — Visitors can leave their email via chat (Pushover notifications)
- **Dark/Light mode** — Theme toggle with DaisyUI
- **Responsive design** — Works on desktop and mobile

## Architecture

```
portfolio-2026/
├── client/          # React + Vite + TypeScript frontend
│   └── src/
│       ├── components/   # UI components (ChatWindow, Header, etc.)
│       ├── layouts/      # Page layouts
│       └── pages/        # Route pages
├── api/             # Express + TypeScript backend
│   ├── src/
│   │   ├── agent.ts      # AI agent with tools
│   │   ├── context.ts    # Dynamic context builder
│   │   ├── pushover.ts   # Push notification utility
│   │   └── index.ts      # Express server
│   └── data/             # YAML data files
│       ├── profile.yaml
│       ├── experience.yaml
│       └── skills.yaml
└── .env             # Environment variables
```

## Setup

### Prerequisites

- Node.js 18+
- npm
- OpenAI API key
- (Optional) Pushover account for contact notifications

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jonathanjacka/portfolio-2026.git
   cd portfolio-2026
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your API keys.

3. **Install dependencies**
   ```bash
   # Install API dependencies
   cd api && npm install

   # Install client dependencies
   cd ../client && npm install
   ```

4. **Update your data files**
   
   Edit the YAML files in `api/data/` with your information:
   - `profile.yaml` — Name, bio, links
   - `experience.yaml` — Work history
   - `skills.yaml` — Technical skills

### Running Locally

Start both servers in separate terminals:

```bash
# Terminal 1: API server (port 3001)
cd api && npm run dev

# Terminal 2: Client (port 5173)
cd client && npm run dev
```

Open http://localhost:5173 to view the app.

## Environment Variables

See `.env.example` for all available options:

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key for GPT-4o-mini |
| `GITHUB_TOKEN` | No | GitHub token for higher API rate limits |
| `PUSHOVER_USER` | No | Pushover user key for contact notifications |
| `PUSHOVER_TOKEN` | No | Pushover app token for contact notifications |
| `CLIENT_URL` | No | Frontend URL(s) for CORS, comma-separated |
| `PORT` | No | API server port (default: 3001) |
| `VITE_API_URL` | No | API URL for client (set during Netlify build) |

## Deployment

### Railway (API)

1. Connect your GitHub repo to Railway
2. Set root directory to `api`
3. Add environment variables:
   - `OPENAI_API_KEY` (required)
   - `CLIENT_URL` = your Netlify URL
   - `PUSHOVER_USER`, `PUSHOVER_TOKEN` (optional)
   - `GITHUB_TOKEN` (optional)
4. Railway auto-detects Node.js and runs `npm run build` then `npm start`

### Netlify (Client)

1. Connect your GitHub repo to Netlify
2. Set base directory to `client`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable:
   - `VITE_API_URL` = your Railway API URL

## Customization

### Updating the AI persona

Edit the system prompt in `api/src/agent.ts` to change:
- Personality and tone
- Response guidelines
- What topics to avoid

### Adding your data

1. **Profile** (`api/data/profile.yaml`): Basic info and bio
2. **Experience** (`api/data/experience.yaml`): Work history with highlights
3. **Skills** (`api/data/skills.yaml`): Technical skills by category
4. **Education** (`api/data/education.yaml`): Degrees and institutions

The agent automatically pulls your recent GitHub repos for context.

## Tech Stack

**Frontend:**
- React 19
- Vite
- TypeScript
- Tailwind CSS 4 + DaisyUI 5
- react-markdown

**Backend:**
- Express
- Vercel AI SDK
- OpenAI GPT-4o-mini
- TypeScript

## License

MIT
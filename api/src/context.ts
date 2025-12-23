import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');

// Types for YAML data
interface Profile {
  name: string;
  title: string;
  location: string;
  email?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  bio: string;
  interests?: string[];
}

interface Project {
  name: string;
  highlights: string[];
  technologies: string[];
}

interface Position {
  company: string;
  role: string;
  location: string;
  start_date: string;
  end_date: string;
  summary?: string;
  highlights?: string[];
  technologies?: string[];
  projects?: Project[];
}

interface Experience {
  positions: Position[];
}

interface Skill {
  name: string;
  level: string;
  years: number;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface Skills {
  categories: SkillCategory[];
}

interface Degree {
  degree: string;
  field: string;
  institution: string;
  location: string;
  start_date: string;
  end_date: string;
}

interface Education {
  degrees: Degree[];
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
}

// Load YAML file
function loadYaml<T>(filename: string): T | null {
  try {
    const filepath = path.join(DATA_DIR, filename);
    const content = fs.readFileSync(filepath, 'utf8');
    return yaml.load(content) as T;
  } catch (error) {
    console.warn(`Warning: Could not load ${filename}:`, error);
    return null;
  }
}

// Fetch GitHub repos
async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Agent',
    };

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
      { headers }
    );

    if (!response.ok) {
      console.warn(`GitHub API error: ${response.status}`);
      return [];
    }

    const repos = await response.json() as GitHubRepo[];
    return repos.filter(repo => !repo.name.includes('.github'));
  } catch (error) {
    console.warn('Failed to fetch GitHub repos:', error);
    return [];
  }
}

// Build context string from all sources
export async function buildAgentContext(): Promise<string> {
  const profile = loadYaml<Profile>('profile.yaml');
  const experience = loadYaml<Experience>('experience.yaml');
  const skills = loadYaml<Skills>('skills.yaml');
  const education = loadYaml<Education>('education.yaml');

  // Get GitHub username from profile
  const githubUsername = profile?.github?.split('/').pop() || 'jonathanjacka';
  const repos = await fetchGitHubRepos(githubUsername);

  let context = '## YOUR PROFESSIONAL INFORMATION\n\n';

  // Profile section
  if (profile) {
    context += '### About Me\n';
    context += `Name: ${profile.name}\n`;
    context += `Title: ${profile.title}\n`;
    context += `Location: ${profile.location}\n`;
    if (profile.linkedin) context += `LinkedIn: ${profile.linkedin}\n`;
    if (profile.github) context += `GitHub: ${profile.github}\n`;
    context += `\nBio: ${profile.bio}\n`;
    if (profile.interests?.length) {
      context += `\nInterests: ${profile.interests.join(', ')}\n`;
    }
    context += '\n';
  }

  // Education section
  if (education?.degrees?.length) {
    context += '### Education\n';
    for (const deg of education.degrees) {
      context += `\n**${deg.degree}: ${deg.field}**\n`;
      context += `${deg.institution}, ${deg.location}\n`;
      context += `${deg.start_date} - ${deg.end_date}\n`;
    }
    context += '\n';
  }

  // Experience section
  if (experience?.positions?.length) {
    context += '### Work Experience\n';
    for (const pos of experience.positions) {
      context += `\n**${pos.role}** at ${pos.company} (${pos.start_date} - ${pos.end_date})\n`;
      context += `Location: ${pos.location}\n`;
      if (pos.summary) {
        context += `${pos.summary}\n`;
      }

      // Handle positions with projects (new format)
      if (pos.projects?.length) {
        for (const project of pos.projects) {
          context += `\n  **${project.name}**\n`;
          context += '  Key achievements:\n';
          for (const highlight of project.highlights) {
            context += `  - ${highlight}\n`;
          }
          context += `  Technologies: ${project.technologies.join(', ')}\n`;
        }
      }

      // Handle positions with direct highlights (legacy format)
      if (pos.highlights?.length) {
        context += 'Key achievements:\n';
        for (const highlight of pos.highlights) {
          context += `- ${highlight}\n`;
        }
      }
      if (pos.technologies?.length) {
        context += `Technologies: ${pos.technologies.join(', ')}\n`;
      }
    }
    context += '\n';
  }

  // Skills section
  if (skills?.categories?.length) {
    context += '### Technical Skills\n';
    for (const category of skills.categories) {
      context += `\n**${category.name}:**\n`;
      for (const skill of category.skills) {
        context += `- ${skill.name} (${skill.level}, ${skill.years} years)\n`;
      }
    }
    context += '\n';
  }

  // GitHub projects section
  if (repos.length) {
    context += '### Recent GitHub Projects\n';
    for (const repo of repos) {
      context += `\n**${repo.name}**`;
      if (repo.language) context += ` [${repo.language}]`;
      if (repo.stargazers_count > 0) context += ` ⭐${repo.stargazers_count}`;
      context += '\n';
      if (repo.description) context += `${repo.description}\n`;
      context += `URL: ${repo.html_url}\n`;
      if (repo.topics?.length) {
        context += `Topics: ${repo.topics.join(', ')}\n`;
      }
    }
  }

  return context;
}

// Cache for context (refresh every 5 minutes)
let cachedContext: string | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function getAgentContext(): Promise<string> {
  const now = Date.now();
  if (!cachedContext || now - cacheTimestamp > CACHE_TTL) {
    cachedContext = await buildAgentContext();
    cacheTimestamp = now;
  }
  return cachedContext;
}

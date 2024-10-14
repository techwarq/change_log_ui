import axios from 'axios';

const API_BASE_URL = 'https://change-log-app.vercel.app/api/public';

export interface Repository {
  owner: string;
  name: string;
}

export interface Project {
  name: string;
  owner: string;
  repo: string;
  lastUpdate?: string;
  timeAgo?: string;
}

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/repos`);
    return response.data.map((repo: Repository) => ({
      name: repo.name,
      owner: repo.owner,
      repo: `${repo.owner}/${repo.name}`,
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
};

export const fetchChangelog = async (owner: string, name: string): Promise<string> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/repos/${owner}/${name}/changelogs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching changelog:', error);
    throw new Error('Failed to fetch changelog');
  }
};
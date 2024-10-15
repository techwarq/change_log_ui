import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const API_URL = 'https://change-log-app.vercel.app';

interface Repo {
  id: number;
  name: string;
  full_name: string;
  default_branch: string;
}

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

export default function Dashboard() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [summary, setSummary] = useState<string | null>(null);

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    try {
      const response = await axios.get<Repo[]>(`${API_URL}/dashboard`);
      setRepos(response.data);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

  const handleRepoSelect = async (repoFullName: string) => {
    setSelectedRepo(repoFullName);
    try {
      const commitsResponse = await axios.get<Commit[]>(`${API_URL}/api/dashboard/commits/${repoFullName}`);
      setCommits(commitsResponse.data);

      const summaryResponse = await axios.get<string>(`${API_URL}/api/dashboard/summarize/${repoFullName}`);
      setSummary(summaryResponse.data);
    } catch (error) {
      console.error('Error fetching commit data:', error);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Developer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <Card key={repo.id} className="cursor-pointer" onClick={() => handleRepoSelect(repo.full_name)}>
            <CardHeader>
              <CardTitle>{repo.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Default branch: {repo.default_branch}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedRepo && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Commits for {selectedRepo}</h2>
          <ul className="space-y-2">
            {commits.map((commit) => (
              <li key={commit.sha} className="border-b pb-2">
                <p className="font-medium">{commit.commit.message}</p>
                <p className="text-sm text-gray-500">
                  {commit.commit.author.name} - {new Date(commit.commit.author.date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
          {summary && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Summary</h3>
              <p>{summary}</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
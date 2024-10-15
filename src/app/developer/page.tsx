import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

interface AuthInfo {
  userId: string;
  accessToken: string;
}

const DeveloperPage = () => {
  const [authInfo, setAuthInfo] = useState<AuthInfo | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://change-log-app.vercel.app';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const accessToken = params.get('accessToken');

    if (userId && accessToken) {
      setAuthInfo({ userId, accessToken });
      fetchRepos(userId, accessToken);
    }
  }, []);

  const fetchRepos = async (userId: string, token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Repo[]>(`${API_URL}/dashboard`, {
        params: { userId },
        headers: { Authorization: `Bearer ${token}` }
      });
      setRepos(response.data);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      setError('Failed to fetch repositories. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRepoSelect = async (repoFullName: string) => {
    if (!authInfo) return;
    
    setSelectedRepo(repoFullName);
    setIsLoading(true);
    setError(null);
    try {
      const [commitsResponse, summaryResponse] = await Promise.all([
        axios.get<Commit[]>(`${API_URL}/api/dashboard/commits/${repoFullName}`, {
          params: { userId: authInfo.userId },
          headers: { Authorization: `Bearer ${authInfo.accessToken}` }
        }),
        axios.get<string>(`${API_URL}/api/dashboard/summarize/${repoFullName}`, {
          params: { userId: authInfo.userId },
          headers: { Authorization: `Bearer ${authInfo.accessToken}` }
        })
      ]);
      setCommits(commitsResponse.data);
      setSummary(summaryResponse.data);
    } catch (error) {
      console.error('Error fetching commit data:', error);
      setError('Failed to fetch commit data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = () => {
    window.location.href = `${API_URL}/auth?redirect_uri=${encodeURIComponent(window.location.href)}`;
  };

  if (!authInfo) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Developer Dashboard</h1>
        <button
          onClick={handleAuth}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Authenticate with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Developer Dashboard</h1>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default DeveloperPage;
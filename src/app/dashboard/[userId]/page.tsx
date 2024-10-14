"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

interface Repo {
  id: number;
  name: string;
  full_name: string;
  default_branch: string;
}

const DeveloperPage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://change-log-app.vercel.app';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userIdParam = params.get('userId');
    if (userIdParam) {
      setUserId(userIdParam);
      fetchRepos(userIdParam);
    }
  }, []);

  const fetchRepos = async (userId: string) => {
    try {
      const response = await axios.get<Repo[]>(`${API_URL}/dashboard?userId=${userId}`);
      setRepos(response.data);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      // Handle specific error messages based on the response
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error || 'Failed to fetch repositories. Please try again later.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Developer Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      {repos.length === 0 && !error ? (
        <p className="text-gray-500">No repositories found for this user.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <Card key={repo.id} className="cursor-pointer">
              <CardHeader>
                <CardTitle>{repo.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Default branch: {repo.default_branch}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeveloperPage;

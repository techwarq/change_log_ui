"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const API_URL = 'https://change-log-app.vercel.app'; // Update this to your actual backend URL

interface Repo {
  id: number;
  name: string;
  full_name: string;
  default_branch: string;
}



export default function Dashboard() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userIdParam = params.get('userId');
    if (userIdParam) {
      setUserId(userIdParam);
      fetchRepos(userIdParam);
    } else {
      setError('No userId found in URL.');
    }
  }, []);

  const fetchRepos = async (userId: string) => {
    try {
      const response = await axios.get<Repo[]>(`${API_URL}/dashboard`, {
        params: { userId },
        withCredentials: true
      });
      setRepos(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      setError('Failed to fetch repositories. Please try again later.');
      setRepos([]);
    }
  };

  const handleRepoSelect = (repoFullName: string) => {
    if (!userId) {
      setError('No userId available. Please refresh the page or re-authenticate.');
      return;
    }
    // Navigate to the new route with selected repo
    router.push(`/dashboard/devlogs?repo=${encodeURIComponent(repoFullName)}&userId=${encodeURIComponent(userId)}`);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl text-white font-bold mb-4">Developer Dashboard</h1>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {repos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {repos.map((repo) => (
            <Card key={repo.id} className="cursor-pointer bg-gray-700 border-gray-700" onClick={() => handleRepoSelect(repo.full_name)}>
              <CardHeader>
                <CardTitle className='text-white'>{repo.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Default branch: {repo.default_branch}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No repositories found. Please check your connection and try again.</p>
      )}
    </main>
  );
}

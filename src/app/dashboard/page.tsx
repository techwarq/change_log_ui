"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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

interface AuthInfo {
  userId: string;
  accessToken: string;
}

export default function DashboardPage() {
  const [authInfo, setAuthInfo] = useState<AuthInfo | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://change-log-app.vercel.app';

  useEffect(() => {
    const error = searchParams.get('error');
    const userId = searchParams.get('userId');
    const accessToken = searchParams.get('accessToken');

    if (error) {
      setError(decodeURIComponent(error));
    } else if (userId && accessToken) {
      setAuthInfo({ userId, accessToken });
      fetchRepos(userId, accessToken);
    }
  }, [searchParams]);

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

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!authInfo) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Authentication required. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <Card key={repo.id}>
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
}
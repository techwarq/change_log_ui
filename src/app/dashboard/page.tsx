"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '../components/ui/badge';

const API_URL = 'https://change-log-app.vercel.app'; // Update this to your actual backend URL

interface Repo {
  id: number;
  name: string;
  full_name: string;
  default_branch: string;
}

interface SummaryItem {
  name: string;
  description: string;
  tags: string[];
}

export default function Dashboard() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [summaryItems, setSummaryItems] = useState<SummaryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

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

  const handleRepoSelect = async (repoFullName: string) => {
    setSelectedRepo(repoFullName);
    if (!userId) {
      setError('No userId available. Please refresh the page or re-authenticate.');
      return;
    }
    try {
      const summaryResponse = await axios.get<SummaryItem[]>(`${API_URL}/api/dashboard/summarize/${repoFullName}`, {
        params: { userId },
        withCredentials: true
      });
      setSummaryItems(summaryResponse.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching summary data:', error);
      setError('Failed to fetch summary data. Please try again later.');
      setSummaryItems([]);
    }
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
            <Card key={repo.id} className="cursor-pointer bg-gray-800" onClick={() => handleRepoSelect(repo.full_name)}>
              <CardHeader>
                <CardTitle>{repo.name}</CardTitle>
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
      {selectedRepo && summaryItems.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Summary for {selectedRepo}</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summaryItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    {item.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="mr-1 mb-1">
                        {tag}
                      </Badge>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  );
}
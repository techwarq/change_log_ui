'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { cn } from "@/lib/utils";

const API_BASE_URL = 'https://change-log-app.vercel.app'; // Ensure this is correct

interface CommitSummary {
  name: string;
  description: string;
  tags: string[];
}

const badgeColors = [
  'bg-purple-700',
  'bg-green-700',
  'bg-yellow-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
];

function DevlogsContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const repo = searchParams.get('repo');
  
  const [commitSummaries, setCommitSummaries] = useState<CommitSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSummarizeCommits = async () => {
      if (!userId || !repo) {
        setError('Missing userId or repo');
        setLoading(false);
        return;
      }

      console.log(`Attempting to fetch commits for repo: ${repo}, userId: ${userId}`);
      console.log(`Full commit URL: ${API_BASE_URL}/api/dashboard/commits/${repo}?userId=${userId}`);
      console.log(`Full summarize URL: ${API_BASE_URL}/api/dashboard/summarize/${repo}?userId=${userId}`);

      try {
        setLoading(true);
        
        // Step 1: Fetch and save raw commits
        console.log('Fetching and saving commits...');
        const commitResponse = await axios.get(`${API_BASE_URL}/api/dashboard/commits/${repo}`, {
          params: { userId }
        });
        console.log('Commit response:', commitResponse.data);
        
        // Step 2: Fetch summarized commits
        console.log('Fetching summarized commits...');
        const summaryResponse = await axios.get(`${API_BASE_URL}/api/dashboard/summarize/${repo}`, {
          params: { userId }
        });
        console.log('Summary response:', summaryResponse.data);
        
        setCommitSummaries(summaryResponse.data);
        setError(null);
      } catch (error) {
        console.error('Error in fetch and summarize process:', error);
        if (axios.isAxiosError(error)) {
          console.error('Axios error details:', error.response?.data);
          setError(`Failed to fetch and summarize commits: ${error.response?.data?.error || error.message}`);
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAndSummarizeCommits();
  }, [userId, repo]);

  if (loading) {
    return <div className="text-white text-center mt-8">Fetching and summarizing commits...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-8">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>{error}</p>
        <p className="mt-4">
          Please check the console for more details and ensure your backend is running correctly.
        </p>
      </div>
    );
  }

  return (
    <main className="text-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-mono font-bold text-white mb-4">
          Commit Summaries for <span className='text-blue-500'>{repo}</span>
        </h1>
        <p className="mb-4">User ID: {userId}</p>
        {commitSummaries.length === 0 ? (
          <p className="text-yellow-500">No commit summaries found. This could be due to an empty repository or an issue with the summarization process.</p>
        ) : (
          commitSummaries.map((summary, index) => (
            <Card key={index} className="flex items-start justify-start pt-3 mb-4 bg-gray-800 border-gray-700 text-white border-gray-700 rounded-lg shadow-lg overflow-hidden">
              <div className="flex grow flex-col justify-between">
                <div className="flex items-start p-3 py-0">
                  <div className="flex grow flex-wrap items-center gap-x-2 pb-1">
                    <CardTitle className="text-xl font-bold text-foreground text-white">
                      {summary.name}
                    </CardTitle>
                  </div>
                </div>
                <CardContent className="p-3 pt-0">
                  <p className="mb-2 text-md text-cyan-600">{summary.description}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {summary.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        className={cn(
                          "text-xs font-semibold px-2 py-1 rounded-full",
                          badgeColors[tagIndex % badgeColors.length],
                          "text-white"
                        )}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}

export default function Devlogs() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-8">Loading...</div>}>
      <DevlogsContent />
    </Suspense>
  );
}
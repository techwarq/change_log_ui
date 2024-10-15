'use client'

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

import { cn } from "../lib/utils";

const API_BASE_URL = 'https://change-log-app.vercel.app/api/public';

interface Changelog {
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

const ChangelogPage: React.FC = () => {
  const searchParams = useSearchParams();
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');
  
  const [changelogs, setChangelogs] = useState<Changelog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (owner && repo) {
      const fetchChangelogs = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/repos/${owner}/${repo}/changelogs`);
          setChangelogs(response.data);
          setError(null);
        } catch (error) {
          console.error('Error fetching changelogs:', error);
          setError('Failed to load changelogs. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      
      fetchChangelogs();
    }
  }, [owner, repo]);

  if (loading) {
    return <div className="text-white text-center mt-8">Loading changelogs...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  return (
    <main className=" min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-mono font-bold text-white mb-4">Changelogs of <span className='text-blue-500'>{repo}</span></h1>
        {changelogs.map((changelog, index) => (
          <Card key={index} className="flex items-start justify-start pt-3 mb-4 bg-gray-700 text-white border-gray-700 rounded-lg shadow-lg overflow-hidden">
            <div className="ml-3 flex flex-col items-center justify-center text-muted-foreground">
              
            </div>
            <div className="flex grow flex-col justify-between">
              <div className="flex items-start p-3 py-0">
                <div className="flex grow flex-wrap items-center gap-x-2 pb-1">
                  <CardTitle className="text-xl font-bold text-foreground">
                    {changelog.name}
                  </CardTitle>
                </div>
              </div>
              <CardContent className="p-3 pt-0">
                <p className="mb-2 text-md text-cyan-800">{changelog.description}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {changelog.tags.map((tag, tagIndex) => (
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
        ))}
      </div>
    </main>
  );
};

export default function SuspenseWrapper() {
    return (
      <Suspense fallback={<div className="text-white text-center mt-8">Loading page...</div>}>
        <ChangelogPage />
      </Suspense>
    );
  }
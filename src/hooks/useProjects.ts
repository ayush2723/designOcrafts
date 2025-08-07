import { useState, useEffect } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  year: string;
  technologies?: string[];
  fullDescription?: string;
  gallery?: string[];
  challenge?: string;
  solution?: string;
  outcome?: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/src/data/projects.json');
        if (!response.ok) {
          throw new Error('Failed to load projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return { projects, loading, error };
}
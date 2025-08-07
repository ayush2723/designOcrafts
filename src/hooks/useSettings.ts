import { useState, useEffect } from 'react';

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  contactEmail: string;
  socialMedia: {
    instagram?: string;
    linkedin?: string;
  };
}

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/src/data/settings.json');
        if (!response.ok) {
          throw new Error('Failed to load settings');
        }
        const data = await response.json();
        setSettings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load settings');
        console.error('Error loading settings:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  return { settings, loading, error };
}
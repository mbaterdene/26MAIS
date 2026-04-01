import { useState, useEffect } from 'react';
import seedData from '../data/seedData.json';

export interface Article {
  id: string;
  title: string;
  category: string;
  status: 'Published' | 'Draft';
  date: string;
  description: string;
  content: string;
}

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check local storage on initial mount
    const stored = localStorage.getItem('stanford_ohs_articles');
    if (stored) {
      try {
        setArticles(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse articles from localStorage:", e);
      }
    } else {
      // If empty, initialize with seed data
      const initialData = seedData as Article[];
      setArticles(initialData);
      localStorage.setItem('stanford_ohs_articles', JSON.stringify(initialData));
    }
    setIsLoaded(true);
  }, []);

  // Update both state and localStorage
  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem('stanford_ohs_articles', JSON.stringify(newArticles));
  };

  const addArticle = (article: Omit<Article, 'id' | 'date'>) => {
    const newArticle: Article = {
      ...article,
      id: Date.now().toString(), // Generate a unique ID
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    saveArticles([newArticle, ...articles]);
  };

  const updateArticle = (id: string, updatedFields: Partial<Article>) => {
    const newArticles = articles.map(art => 
      art.id === id ? { ...art, ...updatedFields } : art
    );
    saveArticles(newArticles);
  };

  const deleteArticle = (id: string) => {
    const newArticles = articles.filter(art => art.id !== id);
    saveArticles(newArticles);
  };

  return { articles, isLoaded, addArticle, updateArticle, deleteArticle };
}

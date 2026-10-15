import axios from 'axios';
import type { BlogPost, Category, Comment, UserProfile, DashboardStats } from '../types/blog';
import { StorageService } from './storage';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const USE_MOCK_FALLBACK = true; // Automatically falls back to high-fidelity storage service if backend is offline

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for attaching auth token (JWT)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('nexus_auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('API Request failed, utilizing local fallback engine:', error?.message);
    return Promise.reject(error);
  }
);

// Unified Blog API Service
export const BlogAPI = {
  // Posts
  async getPosts(params?: { category?: string; search?: string; status?: string }): Promise<BlogPost[]> {
    try {
      const res = await apiClient.get('/posts', { params });
      return res.data;
    } catch {
      if (USE_MOCK_FALLBACK) {
        let list = StorageService.getPosts();
        if (params?.category && params.category !== 'All') {
          list = list.filter((p) => p.category.toLowerCase() === params.category?.toLowerCase());
        }
        if (params?.search) {
          const q = params.search.toLowerCase();
          list = list.filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.excerpt.toLowerCase().includes(q) ||
              p.tags.some((t) => t.toLowerCase().includes(q))
          );
        }
        if (params?.status && params.status !== 'All') {
          list = list.filter((p) => p.status === params.status);
        }
        return list;
      }
      throw new Error('Could not fetch posts');
    }
  },

  async getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    try {
      const res = await apiClient.get(`/posts/${slug}`);
      return res.data;
    } catch {
      if (USE_MOCK_FALLBACK) {
        const posts = StorageService.getPosts();
        return posts.find((p) => p.slug === slug || p.id === slug);
      }
      throw new Error('Post not found');
    }
  },

  async createPost(postData: Partial<BlogPost>): Promise<BlogPost> {
    try {
      const res = await apiClient.post('/posts', postData);
      return res.data;
    } catch {
      if (USE_MOCK_FALLBACK) {
        const posts = StorageService.getPosts();
        const newPost: BlogPost = {
          id: `post-${Date.now()}`,
          slug: (postData.title || 'untitled-post')
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-'),
          title: postData.title || 'Untitled Post',
          excerpt: postData.excerpt || 'No description provided.',
          content: postData.content || '',
          coverImage:
            postData.coverImage ||
            'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
          category: postData.category || 'Neural UI & UX',
          tags: postData.tags || ['General'],
          status: postData.status || 'Published',
          views: 1,
          likes: 0,
          readTime: `${Math.max(2, Math.ceil((postData.content?.length || 500) / 400))} min read`,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          author: {
            id: 'user-1',
            name: 'Mark Johnson',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            role: 'Lead Editor',
          },
          featured: Boolean(postData.featured),
        };
        const updated = [newPost, ...posts];
        StorageService.savePosts(updated);
        return newPost;
      }
      throw new Error('Create post failed');
    }
  },

  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    try {
      const res = await apiClient.put(`/posts/${id}`, updates);
      return res.data;
    } catch {
      if (USE_MOCK_FALLBACK) {
        const posts = StorageService.getPosts();
        const index = posts.findIndex((p) => p.id === id);
        if (index === -1) throw new Error('Post not found');
        const updatedPost = {
          ...posts[index],
          ...updates,
          updatedAt: new Date().toISOString().split('T')[0],
        };
        posts[index] = updatedPost;
        StorageService.savePosts(posts);
        return updatedPost;
      }
      throw new Error('Update post failed');
    }
  },

  async deletePost(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`/posts/${id}`);
      return true;
    } catch {
      if (USE_MOCK_FALLBACK) {
        const posts = StorageService.getPosts();
        const filtered = posts.filter((p) => p.id !== id);
        StorageService.savePosts(filtered);
        return true;
      }
      return false;
    }
  },

  async likePost(id: string): Promise<number> {
    try {
      const res = await apiClient.post(`/posts/${id}/like`);
      return res.data.likes;
    } catch {
      if (USE_MOCK_FALLBACK) {
        const posts = StorageService.getPosts();
        const p = posts.find((item) => item.id === id);
        if (p) {
          p.likes += 1;
          StorageService.savePosts(posts);
          return p.likes;
        }
      }
      return 0;
    }
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      const res = await apiClient.get('/categories');
      return res.data;
    } catch {
      return StorageService.getCategories();
    }
  },

  async createCategory(cat: Omit<Category, 'id' | 'postCount'>): Promise<Category> {
    try {
      const res = await apiClient.post('/categories', cat);
      return res.data;
    } catch {
      const categories = StorageService.getCategories();
      const newCat: Category = {
        ...cat,
        id: `cat-${Date.now()}`,
        postCount: 0,
      };
      const updated = [...categories, newCat];
      StorageService.saveCategories(updated);
      return newCat;
    }
  },

  async deleteCategory(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`/categories/${id}`);
      return true;
    } catch {
      const categories = StorageService.getCategories();
      const filtered = categories.filter((c) => c.id !== id);
      StorageService.saveCategories(filtered);
      return true;
    }
  },

  // Comments
  async getComments(): Promise<Comment[]> {
    try {
      const res = await apiClient.get('/comments');
      return res.data;
    } catch {
      return StorageService.getComments();
    }
  },

  async addComment(comment: Omit<Comment, 'id' | 'createdAt' | 'status' | 'likes'>): Promise<Comment> {
    try {
      const res = await apiClient.post('/comments', comment);
      return res.data;
    } catch {
      const comments = StorageService.getComments();
      const newComment: Comment = {
        ...comment,
        id: `comm-${Date.now()}`,
        createdAt: 'Just now',
        status: 'Approved',
        likes: 0,
      };
      const updated = [newComment, ...comments];
      StorageService.saveComments(updated);
      return newComment;
    }
  },

  async updateCommentStatus(id: string, status: 'Approved' | 'Pending' | 'Spam'): Promise<boolean> {
    try {
      await apiClient.patch(`/comments/${id}/status`, { status });
      return true;
    } catch {
      const comments = StorageService.getComments();
      const comm = comments.find((c) => c.id === id);
      if (comm) {
        comm.status = status;
        StorageService.saveComments(comments);
        return true;
      }
      return false;
    }
  },

  async deleteComment(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`/comments/${id}`);
      return true;
    } catch {
      const comments = StorageService.getComments();
      const filtered = comments.filter((c) => c.id !== id);
      StorageService.saveComments(filtered);
      return true;
    }
  },

  // Users & Analytics
  async getUsers(): Promise<UserProfile[]> {
    try {
      const res = await apiClient.get('/users');
      return res.data;
    } catch {
      return StorageService.getUsers();
    }
  },

  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const res = await apiClient.get('/analytics/dashboard');
      return res.data;
    } catch {
      const posts = StorageService.getPosts();
      const comments = StorageService.getComments();
      return StorageService.getDashboardStats(posts, comments);
    }
  },
};

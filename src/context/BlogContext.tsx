import React, { createContext, useContext, useState, useEffect } from 'react';
import type { BlogPost, Category, Comment, UserProfile, DashboardStats, NotificationItem } from '../types/blog';
import { BlogAPI } from '../services/api';
import { StorageService } from '../services/storage';

export type ActiveTabType =
  | 'dashboard'
  | 'posts'
  | 'editor'
  | 'categories'
  | 'comments'
  | 'analytics'
  | 'users'
  | 'settings';

interface BlogContextType {
  mode: 'admin' | 'public';
  setMode: (mode: 'admin' | 'public') => void;
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
  posts: BlogPost[];
  categories: Category[];
  comments: Comment[];
  users: UserProfile[];
  stats: DashboardStats;
  bookmarks: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  editingPost: BlogPost | null;
  setEditingPost: (post: BlogPost | null) => void;
  readingPost: BlogPost | null;
  setReadingPost: (post: BlogPost | null) => void;
  notifications: NotificationItem[];
  notify: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeNotification: (id: string) => void;
  
  // Actions
  createPost: (data: Partial<BlogPost>) => Promise<BlogPost>;
  updatePost: (id: string, updates: Partial<BlogPost>) => Promise<BlogPost>;
  deletePost: (id: string) => Promise<boolean>;
  likePost: (id: string) => Promise<void>;
  toggleBookmark: (id: string) => void;
  addComment: (postId: string, content: string, name: string, email: string) => Promise<void>;
  updateCommentStatus: (id: string, status: 'Approved' | 'Pending' | 'Spam') => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
  createCategory: (cat: Omit<Category, 'id' | 'postCount'>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'admin' | 'public'>('admin');
  const [activeTab, setActiveTab] = useState<ActiveTabType>('dashboard');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [stats, setStats] = useState<DashboardStats>(() => StorageService.getDashboardStats([], []));
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const notify = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    const item: NotificationItem = {
      id,
      type,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setNotifications((prev) => [...prev, item]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const refreshData = async () => {
    try {
      const [fetchedPosts, fetchedCategories, fetchedComments, fetchedUsers, fetchedStats] = await Promise.all([
        BlogAPI.getPosts(),
        BlogAPI.getCategories(),
        BlogAPI.getComments(),
        BlogAPI.getUsers(),
        BlogAPI.getDashboardStats(),
      ]);
      setPosts(fetchedPosts);
      setCategories(fetchedCategories);
      setComments(fetchedComments);
      setUsers(fetchedUsers);
      setStats(fetchedStats);
      setBookmarks(StorageService.getBookmarks());
    } catch (err) {
      console.error('Failed to load blog data', err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const createPost = async (data: Partial<BlogPost>): Promise<BlogPost> => {
    const newPost = await BlogAPI.createPost(data);
    setPosts((prev) => [newPost, ...prev]);
    // update category postCount
    setCategories((prev) =>
      prev.map((c) => (c.name === newPost.category ? { ...c, postCount: c.postCount + 1 } : c))
    );
    notify(`Story "${newPost.title.slice(0, 30)}..." published successfully!`);
    return newPost;
  };

  const updatePost = async (id: string, updates: Partial<BlogPost>): Promise<BlogPost> => {
    const updated = await BlogAPI.updatePost(id, updates);
    setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    notify(`Story "${updated.title.slice(0, 30)}..." updated successfully!`);
    return updated;
  };

  const deletePost = async (id: string): Promise<boolean> => {
    const success = await BlogAPI.deletePost(id);
    if (success) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      notify('Story deleted successfully', 'info');
    }
    return success;
  };

  const likePost = async (id: string) => {
    const newCount = await BlogAPI.likePost(id);
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likes: newCount } : p)));
    if (readingPost && readingPost.id === id) {
      setReadingPost({ ...readingPost, likes: newCount });
    }
    notify('Thanks for your appreciation! ❤️', 'info');
  };

  const toggleBookmark = (id: string) => {
    const exists = bookmarks.includes(id);
    const updated = exists ? bookmarks.filter((b) => b !== id) : [...bookmarks, id];
    setBookmarks(updated);
    StorageService.saveBookmarks(updated);
    notify(exists ? 'Removed from saved reading list' : 'Saved to your personal reading list');
  };

  const addComment = async (postId: string, content: string, name: string, email: string) => {
    const post = posts.find((p) => p.id === postId);
    const newComment = await BlogAPI.addComment({
      postId,
      postTitle: post?.title,
      content,
      authorName: name,
      authorEmail: email,
      authorAvatar: `https://images.unsplash.com/photo-${1530000000000 + Math.floor(Math.random() * 100000)}?w=100&auto=format&fit=crop&q=80`,
    });
    setComments((prev) => [newComment, ...prev]);
    notify('Your comment has been submitted and published!');
  };

  const updateCommentStatus = async (id: string, status: 'Approved' | 'Pending' | 'Spam') => {
    await BlogAPI.updateCommentStatus(id, status);
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    notify(`Comment marked as ${status}`);
  };

  const deleteComment = async (id: string) => {
    await BlogAPI.deleteComment(id);
    setComments((prev) => prev.filter((c) => c.id !== id));
    notify('Comment deleted', 'info');
  };

  const createCategory = async (cat: Omit<Category, 'id' | 'postCount'>) => {
    const newCat = await BlogAPI.createCategory(cat);
    setCategories((prev) => [...prev, newCat]);
    notify(`Category "${newCat.name}" created!`);
  };

  const deleteCategory = async (id: string) => {
    await BlogAPI.deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    notify('Category removed', 'info');
  };

  return (
    <BlogContext.Provider
      value={{
        mode,
        setMode,
        activeTab,
        setActiveTab,
        posts,
        categories,
        comments,
        users,
        stats,
        bookmarks,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        editingPost,
        setEditingPost,
        readingPost,
        setReadingPost,
        notifications,
        notify,
        removeNotification,
        createPost,
        updatePost,
        deletePost,
        likePost,
        toggleBookmark,
        addComment,
        updateCommentStatus,
        deleteComment,
        createCategory,
        deleteCategory,
        refreshData,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

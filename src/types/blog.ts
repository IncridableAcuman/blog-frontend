export type PostStatus = 'Published' | 'Draft' | 'Under Review' | 'Archived';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  status: PostStatus;
  views: number;
  likes: number;
  readTime: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    bio?: string;
  };
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  iconName: string;
  postCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  postTitle?: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  status: 'Approved' | 'Pending' | 'Spam';
  likes: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Author';
  avatar: string;
  bio: string;
  articlesCount: number;
  joinedDate: string;
}

export interface DashboardStats {
  totalViews: number;
  viewsChange: string;
  totalPosts: number;
  postsChange: string;
  totalComments: number;
  commentsChange: string;
  satisfactionRate: number;
  satisfactionChange: string;
  weeklyViews: { day: string; views: number; visitors: number }[];
  categoryDistribution: { name: string; percentage: number; color: string }[];
}

export interface NotificationItem {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  channelName: string;
  channelAvatar: string;
  subscribers: string;
  views: string;
  publishedAt: string;
  duration: string;
  category: string;
  likes: string;
  dislikes: string;
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  likes: number;
  publishedAt: string;
  isLikedByUser?: boolean;
}

import React from "react";
import { Video } from "../types";
import { Play, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface VideoCardProps {
  key?: React.Key;
  video: Video;
  onSelect: (video: Video) => void;
  progress?: number;
  isAdmin?: boolean;
}

export default function VideoCard({ video, onSelect, progress, isAdmin = false }: VideoCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col gap-3 group cursor-pointer bg-transparent hover:bg-[#181818]/50 p-2 rounded-2xl border border-transparent hover:border-[#222222] hover:scale-[1.025] hover:-translate-y-0.5 active:scale-[0.985] transition-all duration-300"
      onClick={(e) => {
        if (e.button === 0) {
          onSelect(video);
        } else {
          e.preventDefault();
        }
      }}
      onMouseDown={(e) => {
        if (e.button === 1) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onMouseUp={(e) => {
        if (e.button === 1) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onAuxClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black group shadow-lg">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain transform group-hover:scale-103 transition-transform duration-500 ease-out"
        />
        
        {/* Play Icon Hover Overlay */}
        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <div className="p-3 bg-red-600 rounded-full text-white transform scale-90 group-hover:scale-100 transition-all duration-300 ease-out shadow-xl">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Duration Badge */}
        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/85 text-white text-[10px] font-bold rounded font-mono tracking-wider">
          {video.duration}
        </span>

        {/* Persistent Watch Progress Indicator */}
        {progress !== undefined && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#272727]/80 z-20 overflow-hidden rounded-b-xl">
            <div 
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}
      </div>

      {/* Video Details */}
      {isAdmin && (
        <div className="flex gap-3 px-1">
          {/* Text Details */}
          <div className="flex flex-col min-w-0 flex-1">
            <h4 className="text-[#F1F1F1] text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#3EA6FF] transition-colors duration-200">
              {video.title}
            </h4>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function VideoCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-2 rounded-2xl border border-transparent bg-transparent select-none">
      {/* Thumbnail Skeleton */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#1a1a1a] animate-pulse">
        {/* Glow Shimmer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#262626]/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
        
        {/* Duration Badge Skeleton */}
        <div className="absolute bottom-2 right-2 w-10 h-4 bg-[#262626] rounded" />
      </div>

      {/* Video Details Skeleton */}
      <div className="flex gap-3 px-1 animate-pulse">
        <div className="flex flex-col min-w-0 flex-1 gap-2 mt-1">
          {/* Title line 1 */}
          <div className="h-4 bg-[#222222] rounded-md w-[85%]" />
          {/* Title line 2 */}
          <div className="h-4 bg-[#222222] rounded-md w-[55%]" />
        </div>
      </div>
    </div>
  );
}

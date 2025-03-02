import React from 'react';

interface LikeHeaderProps {
  likes: number;
  lastLiker: string;
}

export default function LikeHeader({ likes, lastLiker }: LikeHeaderProps) {
  return (
    <div className="text-sm font-semibold my-4 line-clamp-1 w-1/2 text-center px-1">
      <span className="text-white text-right">{likes} ❤️ - <span className="text-base">{lastLiker}</span></span>
    </div>
  );
};

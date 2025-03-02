import React from 'react';

interface LikeHeaderProps {
  likes: number;
  lastLiker: string;
}

export default function LikeHeader({ likes, lastLiker }: LikeHeaderProps) {
  return (
    <div className="text-sm font-semibold my-4 w-1/2 text-center px-1 flex flex-col justify-center items-center">
      <span className="text-white text-right">{likes} ❤️</span>
      <span className="text-base line-clamp-2">{lastLiker}</span>
    </div>
  );
};

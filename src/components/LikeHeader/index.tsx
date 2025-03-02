import React from 'react';

interface LikeHeaderProps {
  likes: number;
  lastLiker: string;
}

export default function LikeHeader({ likes, lastLiker }: LikeHeaderProps) {
  return (
    <div className="text-md font-semibold my-4 line-clamp-1">
      Likes: {likes} ❤️ - Último like: {lastLiker}
    </div>
  );
};

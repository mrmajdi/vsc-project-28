import React, { useState } from 'react';

/**
 * StarRating - A reusable star rating component for display and input.
 *
 * Props:
 *   rating: number - The current rating value (0 to starCount).
 *   onChange?: (rating: number) => void - Callback when rating changes.
 *   readOnly?: boolean - If true, the component is readonly.
 *   starCount?: number - Number of stars to display (default 5).
 *   starSize?: number - Size of each star in pixels (default 24).
 *   color?: string - Color of filled stars (default '#ffc107').
 */
interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  starCount?: number;
  starSize?: number;
  color?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating: initialRating = 0,
  onChange,
  readOnly = false,
  starCount = 5,
  starSize = 24,
  color = '#ffc107',
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [activeRating, setActiveRating] = useState<number>(initialRating);

  const getEffectiveRating = () => (hoverRating !== null ? hoverRating : activeRating);

  const handleMouseEnter = (rating: number) => {
    if (!readOnly) setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    if (!readOnly) setHoverRating(null);
  };

  const handleClick = (rating: number) => {
    if (readOnly) return;
    setActiveRating(rating);
    if (onChange) onChange(rating);
  };

  const stars = [];
  for (let i = 1; i <= starCount; i++) {
    const isFilled = getEffectiveRating() >= i;
    stars.push(
      <span
        key={i}
        role="img"
        aria-label={isFilled ? 'full star' : 'empty star'}
        tabIndex={readOnly ? -1 : 0}
        onKeyDown={!readOnly ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(i);
          }
        } : undefined}
        onMouseEnter={!readOnly ? () => handleMouseEnter(i) : undefined}
        onMouseLeave={!readOnly ? handleMouseLeave : undefined}
        onClick={!readOnly ? () => handleClick(i) : undefined}
        style={{
          display: 'inline-block',
          fontSize: `${starSize}px`,
          lineHeight: 1,
          cursor: readOnly ? 'default' : 'pointer',
          color: isFilled ? color : '#ccc',
          margin: '0 2px',
          userSelect: 'none',
        }}
      >
        {isFilled ? '★' : '☆'}
      </span>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Star rating"
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      {stars}
    </div>
  );
};

export default StarRating;
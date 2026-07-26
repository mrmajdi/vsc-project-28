import React from 'react';

interface BlogCardProps {
  cover: string;
  : string;
  date: string | Date;
}

const BlogCard: React.FC<BlogCardProps> = ({ cover, title, date }) => {
  const formattedDate = typeof date === 'string' ? new Date: string | Date;
  title: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ cover, title, date }) => {
  const formattedDate = typeof date === 'string' ? new Date(date) : date;
  const dateString = formattedDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="blog-card">
      <img src={cover} alt={title} className="blog-card__cover" />
      <div className="blog-card__content">
        <h3 className="blog-card__title">{title}</h3>
        <p className="blog-card__date">{dateString}</p>
      </div>
    </div>
  );
};

export default BlogCard;
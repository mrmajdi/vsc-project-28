'use client';

import { useEffect, useState } from 'react';

type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  replies?: Array<{
    id: string;
    userName: string;
    comment: string;
    createdAt: string;
  }>;
};

export default async function BusinessReviewsPage({ params }: { params: { businessId: string } }) {
  const { businessId } = params;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [businessId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/business/${businessId}/reviews`);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data: Review[] = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent, reviewId: string) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    try {
      const res = await fetch(`/api/business/${businessId}/reviews/${reviewId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: replyText }),
      });
      if (!res.ok)
import Link from 'next/link';

const plans = [
  {
    name: 'Basic',
    price: '$9',
    period: '/mo',
    features: [
      'Up to 1,000 ad impressions',
      'Basic analytics',
      'Email support',
      'Ad templates',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    features: [
      'Up to 10,000 ad impressions',
      'Advanced analytics',
      'Priority email support',
      'Ad templates',
      'A/B testing',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/mo',
    features: [
      'Unlimited ad impressions',
      'Full suite analytics',
      'Dedicated account manager',
      'Ad templates',
      'A/B testing',
      'API access',
    ],
    popular: false,
  },
];

const featuresList = [
  'Ad Impressions',
  'Analytics',
  'Support',
  'Templates',
  'A/B Testing',
  'API Access',
];

export default function AdsPage() {
  return (
    <section className="
import React from 'react';

interface ProviderCardProps {
  logo: string; // URL or path to the logo image
  rating: number; // rating value between 0 and 5
  isOpen: boolean; // open status
  title?: string; // optional provider name
}

const ProviderCard: React.FC<ProviderCardProps> = ({
  logo,
  rating,
  isOpen,
  title = 'Provider',
}) => {
  const starStyle = {
    display: 'inline-block',
    fontSize: '1.2rem',
    marginRight: '2px',
    color: '#ccc',
  };
  const filledStarStyle = { ...starStyle, color: '#ffc107' };
  const containerStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '260px',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };
  const logoStyle = {
    width: '80px',
    height: '80px',
    objectFit: 'contain',
    marginBottom: '12px',
  };
  const titleStyle = {
    margin: '0 0 8px 0',
    fontSize: '1.25rem',
    color: '#333',
  };
  const ratingNumberStyle = {
    marginLeft: '6px',
    fontSize: '0.9rem',
    color: '#666',
  };
  const statusStyle = {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.85rem',
    fontWeight: 600,
    textTransform: 'capitalize',
  };
  const openStatusStyle = { ...statusStyle, backgroundColor: '#d4edda', color: '#155724' };
  const closedStatusStyle = { ...statusStyle, backgroundColor: '#f8d7da', color: '#721c24' };

  const stars = Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
    <span
      key={star}
      style={star <= rating ? filledStarStyle : starStyle}
      role="img"
      aria-label={star <= rating ? 'star' : 'star empty'}
    >
      ★
    </span>
  ));

  return (
    <div style={containerStyle}>
      containerStyle
      src={logo}
      alt={`${title} logo`}
      style={logoStyle
      <h3 style={titleStyle}>{title}</h3>
      <div style={{ marginBottom: '8px' }}>{stars}<span style={ratingNumberStyle}> ({rating.toFixed(1)})</span></div>
      <div>
        <span style={isOpen ? openStatusStyle : closedStatusStyle}>
          {isOpen ? 'Open' : 'Closed'}
        </span>
      </div>
    </div>
  );
};

export default ProviderCard;
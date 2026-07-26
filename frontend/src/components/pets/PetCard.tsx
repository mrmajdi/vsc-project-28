import React from 'react';
import { QRCodeSVG } from 'react-qr-svg';

interface PetCardProps {
  id: string;
  name: string;
  photoUrl: string;
}

const PetCard: React.FC<PetCardProps> = ({ id, name, photoUrl }) => {
  return (
    <div className="pet-card">
      <img src={photoUrl} alt={`${name} photo`} className="pet-photo" />
      <div className="pet-info">
        <h3 className="pet-name">{name}</h3>
        <div className="pet-qr">
          <QRCodeSVG
            value={id}
            size={120}
            level="Q"
            includeMargin={false}
            svgStyles={{ fill: '#000' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PetCard;
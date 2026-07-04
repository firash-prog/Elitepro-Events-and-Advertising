import React from 'react';

const WhatsAppCTA: React.FC = () => {
  const phone = '+966XXXXXXXXX'; // TODO: replace with actual number
  const message = encodeURIComponent('Hello, I would like to discuss a new event project.');
  const link = `https://wa.me/${phone.replace(/\D/g, '')}?text=${message}`;
  return (
    <a href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'linear-gradient(135deg, hsl(var(--brand-green)), hsl(var(--primary)))',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '30px',
        fontWeight: 600,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        textDecoration: 'none'
      }}
    >
      Chat on WhatsApp
    </a>
  );
};

export default WhatsAppCTA;

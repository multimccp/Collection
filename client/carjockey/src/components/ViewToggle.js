import React from 'react';

const ViewToggle = ({ currentView, setCurrentView }) => {
  const viewOptions = [
    { id: 'view-list', label: 'Lista', icon: 'list' },
    { id: 'view-list-two', label: '2 Colunas', icon: 'columns' },
    { id: 'view-cards-small', label: 'Cards P', icon: 'grid-small' },
    { id: 'view-cards-medium', label: 'Cards M', icon: 'grid-medium' },
    { id: 'view-cards-large', label: 'Cards G', icon: 'grid-large' }
  ];

  // Renderiza o ícone apropriado baseado no tipo
  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'list':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        );
      case 'columns':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="18"></rect>
            <rect x="14" y="3" width="7" height="18"></rect>
          </svg>
        );
      case 'grid-small':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="4" height="4"></rect>
            <rect x="10" y="3" width="4" height="4"></rect>
            <rect x="17" y="3" width="4" height="4"></rect>
            <rect x="3" y="10" width="4" height="4"></rect>
            <rect x="10" y="10" width="4" height="4"></rect>
            <rect x="17" y="10" width="4" height="4"></rect>
            <rect x="3" y="17" width="4" height="4"></rect>
            <rect x="10" y="17" width="4" height="4"></rect>
            <rect x="17" y="17" width="4" height="4"></rect>
          </svg>
        );
      case 'grid-medium':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
          </svg>
        );
      case 'grid-large':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="7"></rect>
            <rect x="3" y="14" width="18" height="7"></rect>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="view-toggles">
      {viewOptions.map(option => (
        <button
          key={option.id}
          className={`view-toggle-btn ${currentView === option.id ? 'active' : ''}`}
          onClick={() => setCurrentView(option.id)}
        >
          {renderIcon(option.icon)}
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;
import React, { useState, useEffect } from 'react';
import "../css/homepage.css";
import Add from '../components/add';
import Cars from '../components/cars';
import ThemeToggle from '../components/ThemeToggle';
import ViewToggle from '../components/ViewToggle';

const Homepage = () => {
    // Estado para controlar o modo de visualização atual
    const [currentView, setCurrentView] = useState(() => {
        // Recuperar a preferência do localStorage ou usar o padrão
        return localStorage.getItem('viewMode') || 'view-cards-medium';
    });

    // Salvar a preferência de visualização quando ela mudar
    useEffect(() => {
        localStorage.setItem('viewMode', currentView);
    }, [currentView]);

    return (
        <div className='app'>
            <div className="controls-container">
                <ViewToggle 
                    currentView={currentView} 
                    setCurrentView={setCurrentView} 
                />
                <ThemeToggle />
            </div>
            <div className="search-section">
                <Add />
                <Cars viewMode={currentView} />
            </div>
        </div>
    );
};

export default Homepage;
"use client";

import Navbar from '@/app/components/NavBar';
import { useState, useEffect } from 'react';

const Settings: React.FC = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    // Effect to apply the theme on mount and change
    useEffect(() => {
        document.body.classList.toggle('dark', isDarkTheme);
    }, [isDarkTheme]);

    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => !prevTheme);
    };

    return (
        <>
        <Navbar />
        <div className="flex flex-col my-20 items-center p-4">
            <h1 className="text-2xl mb-4">Settings</h1>
            <div className="flex items-center">
                <span className="mr-2">{isDarkTheme ? 'Dark Theme' : 'Light Theme'}</span>
                <button 
                    onClick={toggleTheme} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                    Toggle Theme
                </button>
            </div>
        </div>
        </>
    );
}

export default Settings;

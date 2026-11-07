import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		// Check saved theme in localStorage
		const saved = localStorage.getItem('sayan-portfolio-theme');
		if (saved) return saved;
		// Default to 'daylight' since user specifically requested "Daylight feature. Should be there."
		return 'daylight';
	});

	useEffect(() => {
		const root = document.documentElement;
		if (theme === 'dark' || theme === 'night') {
			root.classList.add('dark');
			root.classList.remove('daylight');
		} else {
			root.classList.remove('dark');
			root.classList.add('daylight');
		}
		localStorage.setItem('sayan-portfolio-theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'daylight' ? 'night' : 'daylight'));
	};

	const isDaylight = theme === 'daylight';

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, isDaylight, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

(function(global){
  const ThemeContext = React.createContext({ theme: 'sleeper', setTheme: () => {} });
  function ThemeProvider({ children }) {
    const [theme, setTheme] = React.useState('sleeper');
    React.useEffect(() => {
      const awakened = localStorage.getItem('hasAwakened');
      if (awakened === 'true') setTheme('aegis');
    }, []);
    React.useEffect(() => {
      localStorage.setItem('hasAwakened', theme === 'aegis');
    }, [theme]);
    const value = React.useMemo(() => ({ theme, setTheme }), [theme]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
  }
  global.ThemeContext = ThemeContext;
  global.ThemeProvider = ThemeProvider;
})(window);

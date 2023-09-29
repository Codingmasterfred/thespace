import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from './scenes/homePage/homepage';
import LoginPage from './scenes/loginPage/loginPage';
import ProfilePage from './scenes/profilePage';
import { useMemo, useState } from 'react';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import { themeSettings } from './scenes/theme';



function App() {
  const mode = useSelector((state)=> state.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme = {theme}>
        <CssBaseline/>
       <Routes>
        <Route path = "/" element={<LoginPage />} />
        <Route path = "/home" element={isAuth ? <HomePage /> : <Navigate to="/"/> } />
        <Route path = "/profile/:userid" element={<ProfilePage />} />
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
      
    </div>
  );
}

export default App;

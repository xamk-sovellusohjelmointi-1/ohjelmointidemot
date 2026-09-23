import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router';
import Aloitus from './components/Aloitus';
import Info from './components/Info';
import Valikko from './components/Valikko';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Valikko />
      <Routes>
        <Route path="/" element={<Aloitus />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </>
  );
};

export default App;

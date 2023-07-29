import { useEffect, useState } from 'react'; // this is React Hook
import Header from './Header';
import { Container, CssBaseline, Paper, ThemeProvider, createTheme} from '@mui/material';
import { Outlet } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { getCookie } from '../util/util';
import { useAppDishpatch } from '../store/configureStore';
import {setBasket} from '../../features/basket/basketSlice';

export default function App() { // Function Components
  const dispatch = useAppDishpatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId'); // lấy Cookies buyerId
    if (buyerId) {
      agent.Basket.get()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
    } 
    else {
      setLoading(false); // lỗi thì ko hiện icon quay quay setLoading nữa
    }
  }, [dispatch])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({ // this is CreateTheme MUI
     palette: {
      mode: paletteType, // mode: dùng để điều chỉnh đế độ dark hay là light
      background: {
        default: paletteType === "light" ? "F6F4EB" : "#121212"
      }
     }
  });

const handleThemeChange = () => {
  setDarkMode(!darkMode) // darkMode = true (dark)
};

if (loading) return <LoadingComponent message="Initialising app..."/>

  // phần xử lý UI
  return (
    <div className='app'> {/* dấu <> </> là parents dùng để nhúng html bên trong */}
      <ThemeProvider theme={theme}>
        <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
        <CssBaseline/> {/*cho phần Header sát đầu web, cho ko còn khoảng trống trên đầu */}
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/> {/* đây gọi là handleThemeChange của compo Header = với handle.. của App.tsx */}
            <Container>
              <Outlet />
            </Container>
      </ThemeProvider> 
    </div> 
  );
}

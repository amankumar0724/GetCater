import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import NoPage from './pages/noPage/NoPage';
import ProductInfo from './pages/productInfo/ProductInfo';
import ScrollTop from './components/scrollTop/ScrollTop';
import CartPage from './pages/cart/CartPage';
import AllProduct from './pages/allProduct/AllProduct';
import Signup from './pages/registration/Signup';
import Login from './pages/registration/Login';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProductPage from './pages/admin/AddProductPage';
import UpdateProductPage from './pages/admin/UpdateProductPage';
import MyState from './context/myState';
import { Toaster } from 'react-hot-toast';
import { ProtectedRouteForUser } from './protectedRoute/ProtectedRouteForUser';
import { ProtectedRouteForAdmin } from './protectedRoute/ProtectedRouteForAdmin';
import CategoryPage from './pages/category/CategoryPage';
import NavigateTo from './components/NavigateTo';

import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const steps = [
  {
    id: '0',
    message: 'Hey sir/madam!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Please write your username',
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    message: "Hi {previousValue}, how can I help you?",
    trigger: '4',
  },
  {
    id: '4',
    options: [
      { value: 1, label: 'Order Food', trigger: 'orderFood' },
      { value: 2, label: 'Room Booking', trigger: 'roomBooking' },
      { value: 3, label: 'Hall Booking', trigger: 'hallBooking' },
      { value: 4, label: 'Table Booking', trigger: 'tableBooking' },
    ],
  },
  {
    id: 'orderFood',
    component: <NavigateTo to="/allproduct" triggerNextStep={true} />,
    trigger: '5',
  },
  {
    id: 'roomBooking',
    component: <NavigateTo to="/category/Room" triggerNextStep={true} />,
    trigger: '5',
  },
  {
    id: 'hallBooking',
    component: <NavigateTo to="/category/Hall" triggerNextStep={true} />,
    trigger: '5',
  },
  {
    id: 'tableBooking',
    component: <NavigateTo to="/category/Table" triggerNextStep={true} />,
    trigger: '5',
  },
  {
    id: '5',
    message: "Is there any other booking?",
    trigger: '6',
  },
  {
    id: '6',
    options: [
      { value: 1, label: 'YES', trigger: '4' },
      { value: 2, label: 'NO', trigger: '7' },
    ],
  },
  {
    id: '7',
    message: "Thank you, do not hesitate to ask for help regarding booking issues.",
    end: true,
  },
];

const theme = {
  background: '#C9FF8F',
  headerBgColor: '#FFA509',
  headerFontSize: '20px',
  botBubbleColor: '#0F3789',
  headerFontColor: 'white',
  botFontColor: 'white',
  userBubbleColor: '#FF5733',
  userFontColor: 'white',
};

const config = {
  botAvatar: '/images/chat.png',  // Make sure this path is correct
  floating: true,
};

const App = () => {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />
          <Route path="/user-dashboard" element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          } />
          <Route path="/admin-dashboard" element={
            // <ProtectedRouteForAdmin>
              <AdminDashboard />
            // </ProtectedRouteForAdmin>
          } />
          <Route path="/addproduct" element={
            <ProtectedRouteForAdmin>
              <AddProductPage />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/updateproduct/:id" element={
            <ProtectedRouteForAdmin>
              <UpdateProductPage />
            </ProtectedRouteForAdmin>
          } />
        </Routes>
        <Toaster />
        <ThemeProvider theme={theme}>
          <ChatBot
            headerTitle="RMS bot"
            steps={steps}
            {...config}
          />
        </ThemeProvider>
      </Router>
    </MyState>
  );
}

export default App;



 
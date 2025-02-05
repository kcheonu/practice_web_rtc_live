import './index.css'
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./components/layout/Layout";
// import MainPage from "./pages/MainPage";
// import CartPage from "./pages/CartPage";
// import PaymentPage from "./pages/PaymentPage";
// import OrderHistoryPage from './pages/OrderHistoryPage';
// import OrderDetailPage from './pages/OrderDetailPage';
// import ReviewWritePage from './pages/ReviewWritePage';
// import LikedPage from './pages/LikedPage';
// import LoginSelectPage from './pages/LoginSelectPage';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
import StreamingViewPage from './pages/StreamingViewPage';
import MenuDetailPage from './pages/MenuDetailPage';
import RestoDetailPage from './pages/RestoDetailPage';
import RestoReviewPage from './pages/RestoReviewPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/login-select" element={<LoginSelectPage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/signup" element={<SignupPage />} /> */}
          
          {/* <Route path="/" element={<Layout />}> */}
            {/* <Route index element={<MainPage />} /> */}
            {/* <Route path="cart" element={<CartPage />} /> */}
            {/* <Route path="payment" element={<PaymentPage />} /> */}
            {/* <Route path="orders" element={<OrderHistoryPage />} /> */}
            {/* <Route path="order/:id" element={<OrderDetailPage />} /> */}
            {/* <Route path="review/write/:orderId" element={<ReviewWritePage />} /> */}
            {/* <Route path="liked" element={<LikedPage />} /> */}
          {/* </Route> */}
          <Route path="/streaming-view" element={<StreamingViewPage />} />
          <Route path="/menu-detail" element={<MenuDetailPage />} />
          <Route path="/resto-detail" element={<RestoDetailPage />} />
          <Route path="/resto-review" element={<RestoReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

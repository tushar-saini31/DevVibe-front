import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import appStore from './utils/appStore.js';

import Body from './componenets/Body.jsx';
import Home from './componenets/home.jsx';
import Login from './componenets/Login.jsx';
import Feed from './componenets/Feed.jsx';
import Profile from './componenets/Profile.jsx';
import Connections from './componenets/Connections.jsx';
import Requests from './componenets/Requests.jsx';
import Shimmer from './componenets/Shimmer.jsx';
import Chat from './componenets/chat.jsx';
import PrivacyAndPolicy from './componenets/PrivacyAndPolicy.jsx';
import TermAndConditions from './componenets/TermsAndConditions.jsx';
import CancellationAndRefund from './componenets/CancellationAndRefundPolicy.jsx';
import ShippingDelivery from './componenets/ShippingDelivery.jsx';
import ContactUs from './componenets/ContactUs.jsx';
import Premium from './componenets/Premium.jsx';

function AppRoutes() {
  const user = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={<Body />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="/shimmer-preview" element={<Shimmer />} />
        <Route path="/PrivacyPolicy" element={<PrivacyAndPolicy />} />
        <Route path="/TermsAndConditions" element={<TermAndConditions />} />
        <Route path="/CancellationAndRefund" element={<CancellationAndRefund />} />
        <Route path="/ShippingAndDelivery" element={<ShippingDelivery />} />
        <Route path="/ContactUs" element={<ContactUs />} />

        {/* Login Route */}
        <Route path="/login" element={user ? <Navigate to="/feed" replace /> : <Login />} />

        {/* Protected Routes */}
        <Route path="/feed" element={user ? <Feed /> : <Navigate to="/login" replace />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="/connections" element={user ? <Connections /> : <Navigate to="/login" replace />} />
        <Route path="/requests" element={user ? <Requests /> : <Navigate to="/login" replace />} />
        <Route path="/chat/:targetUserId" element={user ? <Chat /> : <Navigate to="/login" replace />} />
        <Route path="/Premium" element={user ? <Premium /> : <Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

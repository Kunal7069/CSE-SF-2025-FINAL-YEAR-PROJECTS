import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import VerifyOtp from './pages/VerifyOtp';
import Navbar from './components/Navbar';
import CreateBlog from './pages/CreateBlog';
import CreateTopic from './pages/CreateTopic';
import PublisherDashboard from './pages/PublisherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EditBlog from './pages/EditBlog';
import BlogsByTopic from './pages/GetBlogs';
import ChatButton from './components/ChatButton';
import ViewDailyChallenge from "./pages/ViewDailyChallenge"
import ChatPage from './pages/Chat';
import '@fortawesome/fontawesome-free/css/all.min.css';


import { useSelector } from 'react-redux';
import Footer from './components/Footer';
import AdminViewBlog from './pages/AdminViewBlog';
import BlogPage from "./pages/ViewBlog";
import { useState } from 'react';
import { FaComments } from 'react-icons/fa';

function App() {
  const { user } = useSelector(state => state.profile);
  const { token } = useSelector(state => state.auth);
  const [isChatOpen, setIsChatOpen] = useState(false); // <-- New state

  const toggleChat = () => {
    if (!token) {
      alert('Please log in to use the chat feature.');
      return;
    }
    setIsChatOpen(prev => !prev);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={token ? <Navigate to="/" /> : <SignUp />} />
            <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
            <Route path="/verify-email" element={<VerifyOtp />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/publisher/edit-blog/:title/:blogId" element={<EditBlog />} />
            <Route path="/create-topic" element={<CreateTopic />} />
            <Route path="/topic/:topicName" element={<BlogsByTopic />} />
            <Route path="/admin/view-blog/:title/:blogId" element={<AdminViewBlog />} />
            <Route path="/view-blog/:title/:blogId" element={<BlogPage />} />

            <Route
              path="/dashboard"
              element={
                user?.role === 'Admin' ? (
                  <AdminDashboard />
                ) : (
                  <PublisherDashboard />
                )
              }
            />
            {/* <Route path="/chat" element={<ChatPage />} /> */}
            <Route path="/daily-challenge" element={<ViewDailyChallenge />} />
          </Routes>
          {isChatOpen && (
            <div
              className={`fixed top-[65px] bottom-0 right-0 z-50 w-full sm:w-[90%] md:w-[45%] lg:w-[35%] xl:w-[30%] bg-gray-300  shadow-lg transform transition-transform duration-300 ease-in-out ${isChatOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
              {/* Close button */}
              <div className="flex justify-end p-2  border-gray-700  pt-4 shadow-lg  shadow-gray-800">
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-red-600 text-4xl font-bold hover:text-red-500 transition"
                  aria-label="Close chat"
                >
                  &times;
                </button>
              </div>
              <ChatPage />
            </div>
          )}


          {/* Chat Button triggers toggle */}
         { !isChatOpen && <button
            onClick={toggleChat}
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
          >
           <FaComments size={24} />
          </button>}

        </div>
        {/* <ChatButton />  */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

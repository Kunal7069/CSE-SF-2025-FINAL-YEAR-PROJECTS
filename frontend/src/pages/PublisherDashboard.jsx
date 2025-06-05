// pages/PublisherDashboard.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PublishedBlogs from './PublishedBlogs';
import PendingBlogs from './PendingBlogs';
import CreateBlog from './CreateBlog';
import Navbar from "../components/Navbar"
import Profile from "../pages/Profile"

function PublisherDashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile' :
        return <Profile/>;
      case 'published':
        return <PublishedBlogs />;
      case 'pending':
        return <PendingBlogs />;
      case 'create-blog':
        return <CreateBlog />;
      default:
        return <Profile/>;
    }
  };

  return (
    <div className="flex mt-16">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        {renderContent()}
      </div>
    </div>
  );
}

export default PublisherDashboard;

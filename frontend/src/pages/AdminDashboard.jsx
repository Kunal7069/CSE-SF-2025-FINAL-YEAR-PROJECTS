// // pages/PublisherDashboard.js
// import React, { useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import PublishedBlogs from './PublishedBlogs';
// import PendingBlogs from './PendingBlogs';
// import CreateBlog from './CreateBlog';
// import Navbar from "../components/Navbar"
// import AdminProfile from './AdminProfile';
// import CreateTopic from './CreateTopic';

// function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState('profile');

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'profile' :
//         return <AdminProfile/>;
//       case 'published':
//         return <PublishedBlogs />;
//       case 'pending':
//         return <PendingBlogs />;
//       case 'create-blog':
//         return <CreateBlog />;
//         case 'create-topic':
//         return <CreateTopic />;
//       default:
//         return <AdminProfile/>;
//     }
//   };

//   return (
//     <div className="flex mt-16 ">
//       <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
//       <div className="flex-1 p-6 bg-gray-100 min-h-screen">
//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

// pages/PublisherDashboard.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PublishedBlogs from './PublishedBlogs';
import PendingBlogs from './PendingBlogs';
import CreateBlog from './CreateBlog';
import Navbar from "../components/Navbar"
import AdminProfile from './AdminProfile';
import CreateTopic from './CreateTopic';
import CreateChallenge from './CreateChallenge';
import AdminGetChallenge from './AdminGetChallenge';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <AdminProfile />;
      case 'published':
        return <PublishedBlogs />;
      case 'pending':
        return <PendingBlogs />;
      case 'create-blog':
        return <CreateBlog />;
      case 'create-topic':
        return <CreateTopic />;
      case 'create-challenge':
        return <CreateChallenge />;
      case 'view-challenge':
        return <AdminGetChallenge />;
      default:
        return <AdminProfile />;
    }
  };

  return (
    <div className="flex mt-16 ">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminDashboard;

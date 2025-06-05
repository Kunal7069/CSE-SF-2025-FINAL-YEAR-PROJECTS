// // components/Sidebar.js
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// function Sidebar({ activeTab, setActiveTab }) {
//   const navigate = useNavigate();

//   const { user } = useSelector((state) => state.profile);
  
//   const tabs = [
//     { name: 'profile', label: 'Profile' },
//     { name: 'published', label: 'Published Blogs' },
//     { name: 'pending', label: 'Pending Blogs' },
//     { name: 'create-blog', label: 'Create Blog' },
//   ];

//   if (user?.role === 'Admin') {
//     tabs.push({ name: 'create-topic', label: 'Create Topic' });
//   }

//   return (
//     <div className="w-48 min-h-screen bg-gray-200 text-black">
//       <ul className="flex flex-col space-y-2 p-4">
//         {tabs.map(tab => (
//           <li
//             key={tab.name}
//             onClick={() => setActiveTab(tab.name)}
//             className={`p-2 rounded cursor-pointer text-gray-600 ${
//               activeTab === tab.name ? 'bg-gray-700 text-white' : 'hover:bg-gray-700  hover:text-white duration-300'
//             }`}
//           >
//             {tab.label}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;

// components/Sidebar.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  
  const tabs = [
    { name: 'profile', label: 'Profile' },
    { name: 'published', label: 'Published Blogs' },
    { name: 'pending', label: 'Pending Blogs' },
    { name: 'create-blog', label: 'Create Blog' },
  ];

  if (user?.role === 'Admin') {
    tabs.push({ name: 'create-topic', label: 'Create Topic' });
    tabs.push({ name: 'create-challenge', label: 'Create Challenge' });
    tabs.push({ name: 'view-challenge', label: 'View Challenges' });
  }

  return (
    <div className="w-48 min-h-screen bg-gray-200 text-black">
      <ul className="flex flex-col space-y-2 p-4">
        {tabs.map(tab => (
          <li
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`p-2 rounded cursor-pointer text-gray-600 ${
              activeTab === tab.name ? 'bg-gray-700 text-white' : 'hover:bg-gray-700  hover:text-white duration-300'
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
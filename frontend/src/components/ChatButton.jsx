

// ChatButton.jsx
import React from 'react';
import { FaComments } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ChatButton = () => {
  const {token} = useSelector(state=>state.auth)  
  const handleClick = () => {
    if (!token ) {
      alert('Please log in to use the chat feature.');
      return;
    }
    window.open('/chat', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
    >
      <FaComments size={24} />
    </button>
  );
};

export default ChatButton;


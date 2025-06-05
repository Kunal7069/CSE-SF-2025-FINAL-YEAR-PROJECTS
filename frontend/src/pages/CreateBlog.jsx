import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import { createBlog } from "../operations/blogapi";
import { fetchTopics } from "../operations/topicApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PreviewBlog from "./PreviewBlog"; 

const CreateBlog = () => {
  const toolbarOptions = [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'],
    [{ 'script': 'sub'}, { 'script': 'super' }], 
    [{ 'color': [] }, { 'background': [] }],     
    [{ 'align': [] }],
    ['code-block'], 
    ['clean']                                   
  ];
  const modules = {
    toolbar: toolbarOptions
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topicId, setTopicId] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [previewMode, setPreviewMode] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { topics, loading } = useSelector((state) => state.topics);
  const { user } = useSelector((state) => state.profile);
  const {token} = useSelector((state)=>state.auth)

  // const token = localStorage.getItem('token')
 

  useEffect(() => {
    dispatch(fetchTopics(token,navigate));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !topicId || !difficulty) {
      toast.error("All fields are required!");
      return;
    }
    if(!token){
      toast.error("Session expired, login again")
      navigate("/login")
      return
    }
    // console.log("Token in createblog", token)
    
    dispatch(createBlog(title, content, user._id, topicId, difficulty, navigate,token));
  };

  const handlePreview = () => {
    if (!title || !content || !topicId || !difficulty) {
      toast.error("All fields are required to preview!");
      return;
    }
    setPreviewMode(true);
  };

  const handleEdit = () => {
    setPreviewMode(false);
  };

  if (previewMode) {
    const selectedTopic = topics.find((topic) => topic._id === topicId)?.name || "Unknown Topic";
    return (
      <PreviewBlog
        title={title}
        content={content}
        topic={selectedTopic}
        difficulty={difficulty}
        onEdit={handleEdit}
      />
    );
  }

  return (
    <div className="pt-10 max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-8 bg-[#63b175] w-full px-4 py-2 rounded text-white font-sans shadow-lg animate-pulse-glow text-center">
              Create a new blog
            </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="topic" className="block text-gray-700 font-medium mb-2">
              Topic
            </label>
            <select
              id="topic"
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Topic</option>
              {topics.map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2">
            <label htmlFor="difficulty" className="block text-gray-700 font-medium mb-2">
              Difficulty
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Write your blog content here..."
            className="h-80 mb-4"
            modules={modules}
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 text-white font-semibold rounded-lg mt-8 mr-2 ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {loading ? "Creating..." : "Save as Draft"}
          </button>

          <button
            type="button"
            onClick={handlePreview}
            className="w-full p-3 text-white font-semibold rounded-lg mt-8 ml-2 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Preview
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;

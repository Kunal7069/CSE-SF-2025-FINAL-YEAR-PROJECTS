import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { fetchBlogDetails, editBlog } from "../operations/blogapi";
import toast from "react-hot-toast";
import { fetchTopics } from "../operations/topicApi";

const EditBlog = () => {
    const { blogId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token } = useSelector((state) => state.auth);
    const { blogEdit, loading, error } = useSelector((state) => state.blog);
    const { topics } = useSelector((state) => state.topics);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [topicId, setTopicId] = useState("");
    const [difficulty, setDifficulty] = useState("");


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

    useEffect(() => {
        // console.log("Fetching blog details...");
        if (blogId && token) {
            dispatch(fetchBlogDetails(blogId, token));
            dispatch(fetchTopics)
        }
    }, [dispatch, blogId, token]);

    useEffect(() => {
        // console.log("Blog data updated:", blogEdit);
        if (blogEdit) {
            setTitle(blogEdit.title || "");
            setContent(blogEdit.content || "");
            setTopicId(blogEdit.topic);
            setDifficulty(blogEdit.difficulty || "");
        }
    }, [blogEdit]);

    const handleSave = (e) => {
        e.preventDefault();
        if (!title || !content || !topicId || !difficulty) {
            toast.error("All fields are required!");
            return;
        }

        const updatedBlog = {
            title,
            content,
            topicId,
            difficulty,
        };

        dispatch(editBlog(blogId, updatedBlog, token))

    };



    return (
        <div className="max-w-5xl mx-auto mt-28 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-8 bg-[#63b175] w-fit px-2 py-1 rounded text-white font-sans shadow-lg animate-pulse-glow">
                Blog Editor
            </h2>
            <form onSubmit={handleSave}>
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

                <div className="mb-4">
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

                <div className="mb-4">
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

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-3 mt-8 text-white font-semibold rounded-lg ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default EditBlog;

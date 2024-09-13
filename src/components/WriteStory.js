import React, { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { generateRandomPrompt } from './PromptGenerator'; // Import the function

const WriteStory = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [prompt, setPrompt] = useState(''); // State to hold the generated prompt
  const [wordCount, setWordCount] = useState(0); // State to hold the word count
  const auth = getAuth();
  const user = auth.currentUser;

  // Function to calculate word count
  const calculateWordCount = (text) => {
    return text.trim().split(/\s+/).length;
  };

  const handleGeneratePrompt = () => {
    const generatedPrompt = generateRandomPrompt(); // Use the utility function
    setPrompt(generatedPrompt); // Set the prompt in state
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    setWordCount(calculateWordCount(newText)); // Update word count on text change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addDoc(collection(db, 'stories'), {
        title,
        text,
        prompt, // Include prompt when saving the story
        wordCount, // Include word count when saving the story
        userId: user.uid,
        createdAt: new Date(),
      });
      setTitle(''); // Clear title input after submission
      setText('');  // Clear text input after submission
      setPrompt(''); // Clear prompt after submission
      setWordCount(0); // Reset word count after submission
      alert('Story saved successfully!');
    } catch (error) {
      console.error('Error adding story: ', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Write a New Story</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter the title of your story"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={handleGeneratePrompt}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Generate Prompt
          </button>
          {prompt && (
            <p className="text-gray-700 mt-2">
              <strong>Prompt:</strong> {prompt}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="storyText" className="block text-lg font-medium text-gray-700 mb-2">Story</label>
          <textarea
            id="storyText"
            placeholder="Write your story here..."
            value={text}
            onChange={handleTextChange} // Use the updated function
            required
            className="w-full h-60 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <p className="text-gray-700 mt-2">
            <strong>Word Count:</strong> {wordCount}
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Save Story
        </button>
      </form>
    </div>
  );
};

export default WriteStory;

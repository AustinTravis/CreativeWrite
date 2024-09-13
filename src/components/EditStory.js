import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const EditStory = () => {
  const { id } = useParams(); // Get story ID from route parameters
  const [story, setStory] = useState(null);
  const [title, setTitle] = useState('');
  const [editedStory, setEditedStory] = useState('');
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const storyRef = doc(db, 'stories', id);
        const storyDoc = await getDoc(storyRef);
        if (storyDoc.exists()) {
          const data = storyDoc.data();
          setStory(data);
          setTitle(data.title || '');
          setEditedStory(data.text || '');
          setPrompt(data.prompt || ''); // Fetch prompt data
        } else {
          console.error('No such story!');
        }
      } catch (error) {
        console.error('Error fetching story: ', error);
      }
    };

    fetchStory();
  }, [id]);

  const handleSave = async () => {
    if (editedStory.trim() === '') {
      alert('Story content cannot be empty.');
      return;
    }

    try {
      const storyDocRef = doc(db, 'stories', id);
      await updateDoc(storyDocRef, { title, text: editedStory, prompt });
      alert('Story updated successfully!');
      navigate('/library'); // Navigate back to the story library
    } catch (error) {
      console.error('Error updating story: ', error);
      alert('Error updating story. Please try again.');
    }
  };

  const handleClose = () => {
    navigate('/library');
  };

  if (!story) return <p>Loading...</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full max-h-full flex flex-col overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Story</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Title"
        />
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Prompt</h3>
          <p className="p-2 border border-gray-300 rounded bg-gray-100">{prompt}</p>
        </div>
        <textarea
          value={editedStory}
          onChange={(e) => setEditedStory(e.target.value)}
          rows="10"
          className="w-full p-2 border border-gray-300 rounded mb-4 flex-grow"
          placeholder="Edit your story"
        ></textarea>
        <div className="flex space-x-2 mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStory;

// src/ViewStory.js
import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

const ViewStory = () => {
  const { id } = useParams(); // Get story ID from route parameters
  const [story, setStory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const storyRef = doc(db, 'stories', id);
        const storyDoc = await getDoc(storyRef);
        if (storyDoc.exists()) {
          setStory(storyDoc.data());
        } else {
          console.error('No such story!');
        }
      } catch (error) {
        console.error('Error fetching story: ', error);
      }
    };

    fetchStory();
  }, [id]);

  if (!story) return <p>Loading...</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4">{story.title || 'Untitled'}</h2>
        <p className="text-lg mb-4"><strong className="font-semibold">Prompt:</strong> {story.prompt}</p>
        <p className="text-base whitespace-pre-line">{story.text}</p>
        <button
          onClick={() => navigate('/library')} // Navigate back to the library
          className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewStory;

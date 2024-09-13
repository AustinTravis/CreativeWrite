import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth

const StoryLibrary = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate(); // Add useNavigate hook
  const auth = getAuth(); // Initialize Firebase Auth
  const user = auth.currentUser; // Get the current user

  useEffect(() => {
    if (user) {
      const fetchStories = async () => {
        try {
          // Create a query to get only the stories of the current user
          const q = query(collection(db, 'stories'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const storiesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setStories(storiesData);
        } catch (error) {
          console.error('Error fetching stories: ', error);
        }
      };

      fetchStories();
    }
  }, [user]); // Fetch stories when the user is available

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'stories', id));
      setStories(stories.filter((story) => story.id !== id));
    } catch (error) {
      console.error('Error deleting story: ', error);
    }
  };

  const handleEdit = (story) => {
    navigate(`/edit/${story.id}`);
  };

  const handleView = (story) => {
    navigate(`/view/${story.id}`); // Navigate to the view route with story ID
  };

  const handleSave = async () => {
    if (selectedStory) {
      try {
        const storyRef = doc(db, 'stories', selectedStory.id);
        await updateDoc(storyRef, {
          title: selectedStory.title,
          text: selectedStory.text,
          prompt: selectedStory.prompt
        });
        setStories(stories.map((story) =>
          story.id === selectedStory.id ? selectedStory : story
        ));
        setSelectedStory(null);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating story: ', error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Story Library</h2>
      {stories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
              <p className="text-gray-700 mb-2"><strong>Prompt:</strong> {story.prompt}</p>
              <p className="text-gray-700 mb-4"><strong>Word Count:</strong> {story.wordCount}</p>
              <div className="flex justify-between">
                <button onClick={() => handleView(story)} className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" aria-label="View story">View</button>
                <button onClick={() => handleEdit(story)} className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Edit story">Edit</button>
                <button onClick={() => handleDelete(story.id)} className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" aria-label="Delete story">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No stories available.</p>
      )}
    </div>
  );
};

export default StoryLibrary;

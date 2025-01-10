import React, { useState } from 'react';
import { useDropdown } from '../../contexts/DropdownContext';
import { useUser } from '../../contexts/UserProvider';

const Profile = () => {
  const [name, setName] = useState('John Doe'); // Placeholder values
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [address, setAddress] = useState('123 Main St, City, Country');
  const [profileImage, setProfileImage] = useState(null); // For storing the uploaded image
  const { user } = useUser(); // Get the user data from the context
  //test dropdown data 
  const { dropdownData } = useDropdown();
  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file); // Convert the image to base64
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send the updated profile data to the backend via an API
    console.log('Profile updated:', { name, email, phone, address, profileImage });
  };

  return (
    <div className="profile-container max-w-full h-full  mx-auto p-16 bg-white shadow-lg rounded-lg">
  
{console.log(dropdownData)}
      {/* Profile Picture */}
      <div className="profile-image-container mb-6 flex flex-col gap-2 py-5 items-center justify-center">
        <img
         src={user?.profileImage || profileImage || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <h1 className="text-2xl font-bold mb-2">{user?.name || 'Guest'}</h1> 
        <label
          htmlFor="profileImageInput"
          className="flex items-center gap-2 mt-2 px-4 py-2  text-primary text-sm rounded-md cursor-pointer "
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M12 3.99985H6C4.89543 3.99985 4 4.89528 4 5.99985V17.9998C4 19.1044 4.89543 19.9998 6 19.9998H18C19.1046 19.9998 20 19.1044 20 17.9998V11.9998M18.4142 8.41405L19.5 7.32829C20.281 6.54724 20.281 5.28092 19.5 4.49988C18.7189 3.71883 17.4526 3.71883 16.6715 4.49989L15.5858 5.58563M18.4142 8.41405L12.3779 14.4504C12.0987 14.7296 11.7431 14.9199 11.356 14.9974L8.41422 15.5857L9.00257 12.644C9.08001 12.2568 9.27032 11.9012 9.54951 11.622L15.5858 5.58563M18.4142 8.41405L15.5858 5.58563" stroke="#333333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          Edit Image
        </label>
        <input
          type="file"
          id="profileImageInput"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Personal Information */}
      <div className="personal-info mb-6">
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <p className="text-gray-700">Your all information's are showing here</p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-sm font-thin placeholder-primary"
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-sm font-thin placeholder-primary"
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-sm font-thin placeholder-primary"
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md text-sm font-thin placeholder-primary"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded-md"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;

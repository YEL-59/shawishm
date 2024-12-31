import React, { useState } from 'react';

const Profile = () => {
  const [name, setName] = useState('John Doe'); // Placeholder values
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [address, setAddress] = useState('123 Main St, City, Country');
  const [profileImage, setProfileImage] = useState(null); // For storing the uploaded image

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
    <div className="profile-container max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {/* Profile Picture */}
      <div className="profile-image-container mb-6 flex justify-center">
        <img
          src={profileImage || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="ml-4 cursor-pointer"
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
            className="w-full px-4 py-2 border rounded-md"
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
            className="w-full px-4 py-2 border rounded-md"
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
            className="w-full px-4 py-2 border rounded-md"
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
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;

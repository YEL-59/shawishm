import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserProvider";
import axiosInstance from "../../utils/axiosInstance";
import Personicon from "../../assets/avatar.png";
const Profile = () => {
  const { user, loading } = useUser();
  const [profile, setProfile] = useState({
    username: "",
    fullname: "",
    gender: "",
    address: "",
    phone: "",
    role: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const response = await axiosInstance.get("users/user/");
          if (response.data.success) {
            const data = response.data.data;
            setProfile({
              username: data.username,
              fullname: data.U_fullname,
              gender: data.U_sex,
              address: data.U_address,
              phone: data.U_phone,
              role: data.U_Role,
            });
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfile();
  }, [user]);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await axiosInstance.post("users/update/", {
        U_ID: user?.U_ID,
        username: profile.username,
        U_fullname: profile.fullname,
        U_sex: profile.gender,
        U_address: profile.address,
        U_phone: profile.phone,
        U_Role: profile.role,
      });

      if (response.data.success) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container max-w-full h-auto mx-auto p-16 bg-white shadow-lg rounded-lg">
      {/* Profile Picture */}
      <div className="profile-image-container mb-6 flex flex-col gap-2 py-5 items-center justify-center">
        <img
          src={profileImage || Personicon}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-2"
        />
        <h1 className="text-lg font-bold mb-2">
          <span className="text-sm font-bold">User Name :</span>
          {profile.username || "Guest"}
        </h1>
        <label
          htmlFor="profileImageInput"
          className="flex items-center gap-2 mt-2 px-4 py-2 text-primary text-sm rounded-md cursor-pointer hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="..."
              stroke="#333333"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
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

      {/* Profile Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="fullname" className="block text-sm font-bold mb-1">
            Full Name :
          </label>
          <input
            type="text"
            id="fullname"
            value={profile.fullname}
            onChange={(e) =>
              setProfile({ ...profile, fullname: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md text-sm font-thin placeholder-primary"
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="gender" className="block text-sm font-bold mb-1">
            Gender :
          </label>
          <div className="flex gap-2">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={profile.gender === "Male"}
                onChange={(e) =>
                  setProfile({ ...profile, gender: e.target.value })
                }
                className="mr-2"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={profile.gender === "Female"}
                onChange={(e) =>
                  setProfile({ ...profile, gender: e.target.value })
                }
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>

        {/* <div className="form-group mb-4">
          <label htmlFor="address" className="block text-sm font-bold mb-1">
            Address :
          </label>
          <input
            type="text"
            id="address"
            value={profile.address}
            onChange={(e) =>
              setProfile({ ...profile, address: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md text-sm font-thin placeholder-primary"
            required
          />
        </div> */}

        <div className="form-group mb-4">
          <label htmlFor="address" className="block text-sm font-bold mb-1">
            Address :
          </label>
          <textarea
            id="address"
            value={profile.address}
            onChange={(e) =>
              setProfile({ ...profile, address: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md text-sm font-thin placeholder-primary"
            placeholder="Enter your address"
            rows="2" 
            required
          ></textarea>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="phone" className="block text-sm font-bold mb-1">
            Phone Number :
          </label>
          <input
            type="tel"
            id="phone"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full px-4 py-2 border rounded-md text-sm font-thin placeholder-primary"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded-md"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;

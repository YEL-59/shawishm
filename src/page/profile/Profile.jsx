import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserProvider";
import axiosInstance from "../../utils/axiosInstance";
import Personicon from "../../assets/avatar.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
          toast.error("Error fetching profile:", error);
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

  // Handle profile update
  const handleProfileUpdate = async (e) => {
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
        toast.success(response.data.success|| "Profile updated successfully!");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      if (error.response) {
        console.error("API Error:", error.response.data);
        toast.error(
          error.response.data.message || "Failed to update Profile."
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from the server. Please try again.");
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle password update

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (password.newPassword !== password.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsSubmitting(true); // Start loading

    try {
      const response = await axiosInstance.post("users/changePassword/", {
        old_password: password.oldPassword,
        new_password: password.newPassword,
        confirm_password: password.confirmPassword,
      });

      if (response.data.success) {
        toast.success(
          response.data.message || "Password updated successfully!"
        );
        setPassword({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(response.data.message || "Failed to update password.");
      }
    } catch (error) {
      if (error.response) {
        console.error("API Error:", error.response.data);
        toast.error(
          error.response.data.message || "Failed to update password."
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from the server. Please try again.");
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container max-w-full h-auto mx-auto p-16 bg-white shadow-lg rounded-lg">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Profile Picture */}
      <div className="profile-image-container mb-6 flex flex-col gap-2 py-5 items-center justify-center">
        <img
          src={profileImage || Personicon}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-2"
        />
        <h1 className="text-lg font-bold mb-2">
          <span className="text-sm font-bold">User Name : </span>
          {profile.username || "Guest"}
        </h1>
        <input
          type="file"
          id="profileImageInput"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <div className="grid gap-4 grid-cols-2">
        {/* Profile Form */}
        <form
          onSubmit={handleProfileUpdate}
          className="flex flex-col justify-between border rounded-md p-6 shadow-md"
        >
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
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md text-sm font-thin placeholder-primary"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-secondary text-white py-2 rounded-md flex items-center justify-center ${
              isUpdating
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-secondary-dark transition-all duration-200"
            }`}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                <span>Updating...</span>
              </div>
            ) : (
              "Update Profile"
            )}
          </button>
        </form>

        {/* Password Form */}

        <form
          onSubmit={handlePasswordUpdate}
          className="flex flex-col justify-between border rounded-md p-6 shadow-md"
        >
          <div className="form-group mb-4">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-bold mb-1"
            >
              Old Password:
            </label>
            <input
              type="password"
              id="oldPassword"
              value={password.oldPassword}
              onChange={(e) =>
                setPassword({ ...password, oldPassword: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md text-sm font-thin placeholder-primary"
              placeholder="Enter your old password"
              required
            />
          </div>

          <div className="form-group mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-bold mb-1"
            >
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              value={password.newPassword}
              onChange={(e) =>
                setPassword({ ...password, newPassword: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md text-sm font-thin placeholder-primary"
              placeholder="Enter a new password"
              required
            />
          </div>

          <div className="form-group mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-bold mb-1"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={password.confirmPassword}
              onChange={(e) =>
                setPassword({ ...password, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md text-sm font-thin placeholder-primary"
              placeholder="Confirm your new password"
              required
            />
            {password.newPassword !== password.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-secondary text-white py-2 rounded-md flex items-center justify-center ${
              isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-secondary-dark transition-all duration-200"
            }`}
            disabled={
              !password.oldPassword ||
              !password.newPassword ||
              password.newPassword !== password.confirmPassword ||
              isSubmitting
            }
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                <span>Updating...</span>
              </div>
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

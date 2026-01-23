import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Camera } from "lucide-react";

import { uploadUserAvatar } from "@/api/userApi";
import { useUserStore } from "@/store/userStore";

export default function AccountPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { users, editUser, loadUsers, loading, currentUser } = useUserStore();

  const userId = id || currentUser?._id;
  const selectedUser = users.find((u) => u._id === userId);

  // Account page: allow editing only your own profile
  const canEdit = Boolean(currentUser?._id && userId && currentUser._id === userId);

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    userName: "",
    userLast: "",
    email: "",
    phoneNumber: "",
    address: "",
    avatarUrl: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!users.length) {
      loadUsers();
    }
  }, []);

  useEffect(() => {
    const user = users.find((u) => u._id === userId);
    if (!user) return;

    setFormData({
      userName: user.userName || "",
      userLast: user.userLast || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
      avatarUrl: user.avatarUrl || user.img || "",
    });
  }, [users, userId]);

  if (!currentUser && !id) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white p-6 rounded-lg shadow-md text-center">
        <div className="text-(--color-brown)">Please sign in to view your account.</div>
        <Link
          to="/signin"
          className="mt-4 inline-block bg-(--color-brown) text-white px-6 py-2 rounded-3xl"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const avatarSrc = (
    formData.avatarUrl ||
    selectedUser?.img ||
    currentUser?.avatarUrl ||
    currentUser?.img ||
    ""
  ).trim() || null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError(null);
    setSuccess(false);
  };

  const resetForm = () => {
    const user = users.find((u) => u._id === userId);
    if (!user) return;

    setFormData({
      userName: user.userName || "",
      userLast: user.userLast || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
      avatarUrl: user.avatarUrl || user.img || "",
    });

    setError(null);
    setSuccess(false);
  };

  const handlePickAvatar = () => {
    if (!canEdit || isUploading || isSaving) return;
    fileInputRef.current?.click();
  };

  const handleAvatarSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(false);
    setIsUploading(true);

    try {
      const uploaded = await uploadUserAvatar(file);
      setFormData((prev) => ({
        ...prev,
        avatarUrl: uploaded?.url || "",
      }));
    } catch (err) {
      setError(err?.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!canEdit) {
      setError("You can only edit your own profile");
      return;
    }

    if (!userId) {
      setError("No user selected");
      return;
    }

    if (!formData.userName.trim() || !formData.userLast.trim()) {
      setError("First name and last name are required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await editUser(userId, {
        userName: formData.userName,
        userLast: formData.userLast,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        avatarUrl: formData.avatarUrl,
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    } catch (err) {
      setError(err?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white p-6 rounded-lg shadow-md text-center">
        <div>Loading...</div>
      </div>
    );
  }

  const inputClass =
    "w-full bg-[#F5EDE2] rounded-full px-6 py-3 text-(--color-brown) shadow-sm outline-none focus:ring-2 focus:ring-(--color-matcha) disabled:opacity-60";

  const labelClass = "block text-lg font-semibold text-(--color-brown) mb-2";

  return (
    <div className="min-h-[calc(100vh-120px)] bg-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-(--color-brown) hover:text-(--color-matcha)"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <form onSubmit={handleSave} className="mt-8">
          <div className="flex justify-center">
            <div className="relative">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt="Profile"
                  className="h-36 w-36 rounded-full object-cover border-4 border-(--color-matcha)"
                />
              ) : (
                <div
                  className="h-36 w-36 rounded-full bg-gray-200 border-4 border-(--color-matcha)"
                  aria-label="Profile"
                />
              )}

              {canEdit && (
                <button
                  type="button"
                  onClick={handlePickAvatar}
                  disabled={isUploading || isSaving}
                  className="absolute bottom-2 right-2 h-9 w-9 rounded-full bg-(--color-brown) text-white flex items-center justify-center shadow disabled:opacity-50"
                  aria-label="Change profile image"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarSelected}
              />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2">
            <div>
              <label className={labelClass}>First Name :</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                className={inputClass}
                disabled={!canEdit}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Last Name :</label>
              <input
                type="text"
                name="userLast"
                value={formData.userLast}
                onChange={handleInputChange}
                placeholder="Enter last name"
                className={inputClass}
                disabled={!canEdit}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Email :</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className={inputClass}
                disabled={!canEdit}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Mobile Number :</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
                className={inputClass}
                disabled={!canEdit}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Address :</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                className={inputClass}
                disabled={!canEdit}
              />
            </div>
          </div>

          <div className="mt-10">
            {error && (
              <div className="mx-auto max-w-2xl p-4 bg-red-100 text-red-700 rounded-md text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="mx-auto max-w-2xl p-4 bg-green-100 text-green-700 rounded-md text-center">
                Profile updated successfully!
              </div>
            )}

            {isUploading && (
              <div className="mx-auto max-w-2xl p-3 bg-blue-50 text-blue-700 rounded-md text-center">
                Uploading image...
              </div>
            )}
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="submit"
              disabled={!canEdit || isSaving || isUploading}
              className="min-w-40 rounded-full bg-(--color-brown) px-10 py-3 text-white shadow hover:bg-(--color-matcha) disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              disabled={isSaving || isUploading}
              className="min-w-40 rounded-full bg-gray-300 px-10 py-3 text-black shadow hover:bg-gray-400 disabled:opacity-50"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

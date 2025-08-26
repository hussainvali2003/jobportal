import React, { useState, useEffect } from "react";
import {
  User,
  Upload,
  MapPin,
  Mail,
  Phone,
  Edit3,
  Save,
  CheckCircle,
  UserCircle,
  Loader2
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "../Styles/ProfileUpdate.css";
import { useUpdateCompletion } from "../hooks";
import { useProfileCompletion } from "../Context/ProfileCompletionContext";
import CircularProfileCompletion from "./ProfileCompletion";
function Profile() {
  // 1. All hooks must be declared at the top level
  const profileCompletionContext = useProfileCompletion();
  const { completion } = profileCompletionContext || {};
  // State declarations
  const [userData, setUserData] = useState({
    name: "",
    phoneno: "",
    email: "",
    location: "",
    userrole: "",
    role: "",
    experience: "",
  });
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [showEmailOtpField, setShowEmailOtpField] = useState(false);
  const [showPhoneOtpField, setShowPhoneOtpField] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [isLoading, setIsLoading] = useState({
    email: false,
    phone: false,
    save: false,
    general: false
  });
  const [emailResendCooldown, setEmailResendCooldown] = useState(0);
  const [phoneResendCooldown, setPhoneResendCooldown] = useState(0);
  // Profile completion hook
  useUpdateCompletion({
    sectionName: 'profileDetails',
    checkFn: () => {
      const requiredFields = [
        userData.name,
        userData.phoneno,
        userData.email,
        userData.location,
        userData.userrole
      ];
      const hasAllRequiredFields = requiredFields.every(
        field => field && field.trim() !== ''
      );
      return hasAllRequiredFields && (emailVerified || phoneVerified) && !!image;
    },
    dependencies: [userData, emailVerified, phoneVerified, image]
  });
  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(prev => ({ ...prev, general: true }));
        const storedEmail = localStorage.getItem("registeredEmail");
        if (storedEmail) {
          const response = await axios.get(
            `http://localhost:8080/api/auth/user?email=${storedEmail}`
          );
          const {
            name,
            phoneno,
            email,
            location,
            userrole,
            role,
            experience,
            profilePic,
            emailVerified,
            phoneVerified
          } = response.data;
          setUserData({ name, phoneno, email, location, userrole, role, experience });
          setEmailVerified(emailVerified);
          setPhoneVerified(phoneVerified || false);
          if (profilePic) {
            setImage(`data:image/jpeg;base64,${profilePic}`);
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        toast.error("Failed to load profile data", { position: "top-right" });
      } finally {
        setIsLoading(prev => ({ ...prev, general: false }));
      }
    };
    fetchUserData();
  }, []);
  // Cooldown timers
  useEffect(() => {
    if (emailResendCooldown > 0) {
      const timer = setInterval(() => {
        setEmailResendCooldown(prev => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [emailResendCooldown]);
  useEffect(() => {
    if (phoneResendCooldown > 0) {
      const timer = setInterval(() => {
        setPhoneResendCooldown(prev => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [phoneResendCooldown]);
  // Handler functions
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("name", userData.name);
    formData.append("phoneno", userData.phoneno);
    formData.append("location", userData.location);
    formData.append("userrole", userData.userrole);
    formData.append("role", userData.role);
    formData.append("experience", userData.experience);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    try {
      setIsLoading(prev => ({ ...prev, save: true }));
      await axios.put("http://localhost:8080/api/auth/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated successfully!", { position: "top-right" });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile", { position: "top-right" });
    } finally {
      setIsLoading(prev => ({ ...prev, save: false }));
    }
  };
  const sendOtp = async (type) => {
    try {
      setIsLoading(prev => ({ ...prev, [type]: true }));
      const endpoint = type === "email"
        ? "send-email-otp"
        : "send-phone-otp";
      const params = type === "email"
        ? { email: userData.email }
        : { phone: userData.phoneno };
      await axios.post(
        `http://localhost:8080/api/auth/${endpoint}`,
        null,
        { params }
      );
      if (type === "email") {
        setShowEmailOtpField(true);
        setEmailResendCooldown(60);
        toast.success("OTP sent to your email", { position: "top-right" });
      } else {
        setShowPhoneOtpField(true);
        setPhoneResendCooldown(60);
        toast.success("OTP sent to your phone", { position: "top-right" });
      }
    } catch (error) {
      const message = error.response?.data?.message || `Error sending ${type} OTP`;
      toast.error(message, { position: "top-right" });
    } finally {
      setIsLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  const verifyEmailOtp = async () => {
    if (!emailOtp || emailOtp.length !== 6) {
      toast.error("Please enter a valid 6‑digit OTP", {
        position: "top-right",
      });
      return;
    }
    try {
      setIsLoading((prev) => ({ ...prev, email: true }));
      const response = await axios.post(
        "http://localhost:8080/api/auth/verify-email-otp",
        null,
        {
          params: {
            email: userData.email,
            otp: emailOtp,
          },
        }
      );
      if (response.data.verified) {
        setEmailVerified(true);
        setShowEmailOtpField(false);
        setEmailOtp("");
        toast.success("Email verified successfully! :white_check_mark:", {
          position: "top-right",
        });
      } else {
        toast.error("Invalid OTP. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      const message = error.response?.data?.message || "Verification failed.";
      toast.error(message, { position: "top-right" });
    } finally {
      setIsLoading((prev) => ({ ...prev, email: false }));
    }
  };
  const verifyPhoneOtp = async () => {
    if (!phoneOtp || phoneOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP", { position: "top-right" });
      return;
    }
    try {
      setIsLoading(prev => ({ ...prev, phone: true }));
      const response = await axios.post(
        `http://localhost:8080/api/auth/verify-phone-otp`,
        null,
        { params: { phone: userData.phoneno, otp: phoneOtp } }
      );
      if (response.data.verified) {
        setPhoneVerified(true);
        setShowPhoneOtpField(false);
        setPhoneOtp("");
        toast.success("Phone verified successfully!", { position: "top-right" });
        await axios.post(
          `http://localhost:8080/api/auth/update-verification`,
          { email: userData.email, phoneVerified: true }
        );
      } else {
        toast.error(response.data.message || "Invalid OTP", { position: "top-right" });
      }
    } catch (error) {
      const message = error.response?.data?.message || "Verification failed";
      toast.error(message, { position: "top-right" });
    } finally {
      setIsLoading(prev => ({ ...prev, phone: false }));
    }
  };
  const resendEmailOtp = () => {
    if (emailResendCooldown === 0) sendOtp("email");
  };
  const resendPhoneOtp = () => {
    if (phoneResendCooldown === 0) sendOtp("phone");
  };
  // Loading state check (must come after all hooks)
  if (isLoading.general) {
    return (
      <div className="page-wrapper">
        <div className="loading-spinner">
          <Loader2 className="animate-spin" size={48} />
        </div>
      </div>
    );
  }
  return (
    <div className="page-wrapper">
      <div className="profile-card">
        <div className="completion-wrapper">
          <CircularProfileCompletion />
        </div>
        <div className={`profile-content ${isEditing ? "editing-mode" : ""}`}>
          <div className="profile-header">
            <div className="profile-pic-container">
              <div className="profile-pic">
                {image ? (
                  <img src={image} alt="Profile" className="profile-image" />
                ) : (
                  <UserCircle className="default-icon" size={120} />
                )}
                {isEditing && (
                  <>
                    <label htmlFor="upload-input" className="upload-btn">
                      <Upload size={25} />
                      <span></span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      id="upload-input"
                      onChange={handleImageUpload}
                      hidden
                    />
                  </>
                )}
              </div>
            </div>
            <div className="profile-info">
              <div className="name-section">
                {isEditing ? (
                  <input
                    className="name-input"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    placeholder="Full Name"
                  />
                ) : (
                  <h2 className="profile-name">{userData.name}</h2>
                )}
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">
                    <User size={16} />
                    <span>Job Title</span>
                  </div>
                  {isEditing ? (
                    <input
                      className="info-input"
                      value={userData.userrole}
                      onChange={(e) =>
                        setUserData({ ...userData, userrole: e.target.value })
                      }
                      placeholder="Job Title"
                    />
                  ) : (
                    <span className="info-value">{userData.userrole}</span>
                  )}
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <MapPin size={16} />
                    <span>Location</span>
                  </div>
                  {isEditing ? (
                    <input
                      className="info-input"
                      value={userData.location}
                      onChange={(e) =>
                        setUserData({ ...userData, location: e.target.value })
                      }
                      placeholder="Location"
                    />
                  ) : (
                    <span className="info-value">{userData.location}</span>
                  )}
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <MapPin size={16} />
                    <span>Experience</span>
                  </div>
                  {isEditing ? (
                    <input
                      className="info-input"
                      value={userData.experience}
                      onChange={(e) =>
                        setUserData({ ...userData, experience: e.target.value })
                      }
                      placeholder="Experience"
                    />
                  ) : (
                    <span className="info-value">{userData.experience}</span>
                  )}
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <Mail size={16} />
                    <span>Email</span>
                  </div>
                  <div className="contact-field">
                    <span className="info-value">{userData.email}</span>
                    {emailVerified ? (
                      <CheckCircle className="verified-icon" size={16} color="green" />
                    ) : !showEmailOtpField ? (
                      <button
                        className="verify-btn"
                        onClick={() => sendOtp("email")}
                        disabled={isLoading.email}
                      >
                        {isLoading.email ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          "Verify"
                        )}
                      </button>
                    ) : null}
                  </div>
                  {!emailVerified && showEmailOtpField && (
                    <div className="otp-field-group">
                      <div className="otp-field">
                        <input
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={emailOtp}
                          onChange={(e) =>
                            setEmailOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                          }
                          className="otp-input"
                        />
                        <button
                          className="otp-btn"
                          onClick={verifyEmailOtp}
                          disabled={isLoading.email || emailOtp.length !== 6}
                        >
                          {isLoading.email ? (
                            <Loader2 className="animate-spin" size={16} />
                          ) : (
                            "Submit OTP"
                          )}
                        </button>
                      </div>
                      <div className="otp-actions">
                        {emailResendCooldown > 0 ? (
                          <span className="cooldown">Resend in {emailResendCooldown}s</span>
                        ) : (
                          <button
                            className="resend-btn"
                            onClick={resendEmailOtp}
                            disabled={isLoading.email}
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="info-item">
                  <div className="info-label">
                    <Phone size={16} />
                    <span>Phone</span>
                  </div>
                  <div className="contact-field">
                    <span className="info-value">{userData.phoneno}</span>
                    {phoneVerified ? (
                      <CheckCircle className="verified-icon" size={16} color="green" />
                    ) : !showPhoneOtpField ? (
                      <button
                        className="verify-btn"
                        onClick={() => sendOtp("phone")}
                        disabled={isLoading.phone}
                      >
                        {isLoading.phone ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          "Verify"
                        )}
                      </button>
                    ) : null}
                  </div>
                  {!phoneVerified && showPhoneOtpField && (
                    <div className="otp-field-group">
                      <div className="otp-field">
                        <input
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={phoneOtp}
                          onChange={(e) =>
                            setPhoneOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                          }
                          className="otp-input"
                        />
                        <button
                          className="otp-btn"
                          onClick={verifyPhoneOtp}
                          disabled={isLoading.phone || phoneOtp.length !== 6}
                        >
                          {isLoading.phone ? (
                            <Loader2 className="animate-spin" size={16} />
                          ) : (
                            "Submit OTP"
                          )}
                        </button>
                      </div>
                      <div className="otp-actions">
                        {phoneResendCooldown > 0 ? (
                          <span className="cooldown">Resend in {phoneResendCooldown}s</span>
                        ) : (
                          <button
                            className="resend-btn"
                            onClick={resendPhoneOtp}
                            disabled={isLoading.phone}
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="profile-actions">
              <button
                className={`action-btn ${isEditing ? "save-btn" : "edit-btn"}`}
                onClick={() => {
                  if (isEditing) handleSave();
                  else setIsEditing(true);
                }}
                disabled={isLoading.save}
              >
                {isLoading.save ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : isEditing ? (
                  <>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </>
                ) : (
                  <>
                    <Edit3 size={20} />
                    <span className="Edit">Edit Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;







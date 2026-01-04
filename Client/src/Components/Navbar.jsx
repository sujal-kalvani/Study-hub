import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleState } from "../redux/toggleSlice";
import { logout } from "../redux/AuthSlice";
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import SummaryApi from "../apis";
import { jwtDecode } from "jwt-decode";

export default function Navbar({ variant = "full", onMenuClick, open }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { isAuthenticated, token } = useSelector((state) => state.auth);

  const [profile, setProfile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [refreshProfile, setRefreshProfile] = useState(false);

  const [educator, Seteducator] = useState(null)

  const avatarUrl = profile?.profileImage
    ? `http://localhost:8000${profile.profileImage}`
    : null;

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleIconClick = () => fileInputRef.current.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await fetch(SummaryApi.profile.url, {
        method: SummaryApi.profile.method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Upload failed");
        return;
      }

      toast.success("Profile updated");
      setRefreshProfile((prev) => !prev);
    } catch {
      toast.error("Upload error");
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      const response = await fetch(SummaryApi.getProfile.url, {
        method: SummaryApi.getProfile.method,
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      // console.log(data.user.role);
      Seteducator(data.user.role)

      if (data.success) setProfile(data.user);
    };

    fetchProfile();
  }, [token, refreshProfile]);

  const Logout = () => {
    dispatch(logout());
    toast.success("Logged out");
    navigate("/signin");
  };

  const become_educator = async () => {

    const response = await fetch(SummaryApi.becomeEducator.url, {
      method: SummaryApi.becomeEducator.method,
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (data.success) {
      toast.success("Become Educator successfully")
      get_role();
      window.location.reload();
    }
    else
      toast.error("You are already Educator")
  }

  const educatorDashboard = () => {
    navigate("educator-dashboard")
  }

  return (
    <nav className="bg-white shadow-md fixed w-full z-40 top-0">
      <div className={`${variant === "dashboard" ? "max-w-full" : "max-w-7xl"} mx-auto px-4 sm:px-6 lg:px-8 `}>
        <div className="flex justify-between items-center h-16">
          {variant === "dashboard" && (
            <button className="lg:hidden mr-3 text-xl" onClick={onMenuClick}>

              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                /> : <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />}
              </svg>
            </button>
          )}
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="170" height="40" viewBox="0 0 180 40" fill="none"> <g transform="translate(0,3)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17 34C26.3888 34 34 26.3888 34 17C34 7.61116 26.3888 0 17 0C7.61114 0 0 7.61116 0 17C0 26.3888 7.61114 34 17 34ZM22.3034 7.91931C22.5616 7.00234 21.6717 6.46011 20.859 7.0391L9.51415 15.1211C8.63278 15.749 8.77142 17 9.7224 17H12.7098V16.9768H18.5321L13.788 18.6508L11.6966 26.0807C11.4385 26.9977 12.3282 27.5399 13.141 26.9609L24.4859 18.8789C25.3672 18.251 25.2285 17 24.2776 17H19.7473L22.3034 7.91931Z" fill="#0260FF" /> </g> <text x="45" y="30" font-family="Inter, Arial, sans-serif" font-size="25" font-weight="700" fill="#0260FF" > Study-Hub </text> </svg>
          </Link>

          {/* Desktop Menu */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-6">
              <Link to="/signin" className="text-blue-600 hover:underline" onClick={() => dispatch(toggleState())}>
                Login
              </Link>
              <Link
                to="/signup" onClick={() => dispatch(toggleState())}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg"
              >
                Create Account
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <>

              <div className="hidden md:flex items-center gap-6">
                <Link to="enrolled-courses">Enrolled Courses</Link>
                 <span>|</span>
                {
                  educator === "educator" ? (
                    variant === "dashboard" ? null : (
                      <button className="cursor-pointer" onClick={educatorDashboard}>
                        Educator Dashboard
                      </button>
                    )
                  ) : (
                    <button className="cursor-pointer" onClick={become_educator}>
                      Become Educator
                    </button>
                  )
                }
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={handleIconClick}
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="profile"
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <CgProfile className="w-10 h-10" />
                  )}
                  <span className="font-medium">{profile?.name}</span>
                </div>

                <button
                  onClick={Logout}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600"
                >
                  Logout <IoLogOutOutline />
                </button>
              </div>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden shadow-md px-4 pb-4 space-y-4 flex flex-col">
          {!isAuthenticated ? (
            <>
              <Link to="/signin" className="block py-2">Login</Link>
              <Link
                to="/signup"
                className="block py-2 text-center bg-blue-600 text-white rounded-md"
              >
                Create Account
              </Link>

            </>
          ) : (
            <>
              {
                educator === "educator" ? (
                  variant === "dashboard" ? null : (
                    <button className="cursor-pointer" onClick={educatorDashboard}>
                      Educator Dashboard
                    </button>
                  )
                ) : (
                  <>
                    {/* <div className="flex flex-col justify-start"> */}
                      <button className="cursor-pointer text-left mt-3 ml-3" onClick={become_educator}>
                        Become Educator
                      </button>

                    {/* </div> */}
                  </>
                )
              }
              <>
            <Link to="enrolled-courses" className="ml-3">Enrolled Courses</Link>
              </>

              <div
                className="flex items-center gap-2 py-2 cursor-pointer ml-2"
                onClick={handleIconClick}
              >

                {avatarUrl ? (
                  <img src={avatarUrl} className="w-10 h-10 rounded-full" />
                ) : (
                  <CgProfile className="w-10 h-10" />
                )}
                <span>{profile?.name}</span>
              </div>

              <button
                onClick={Logout}
                className="w-full flex items-center justify-center gap-2 py-2 text-red-500"
              >
                Logout <IoLogOutOutline />
              </button>
            </>
          )}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </nav>
  );
}

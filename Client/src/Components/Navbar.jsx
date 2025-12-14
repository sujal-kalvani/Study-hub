import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleState } from "../redux/toggleSlice";
import { useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../redux/AuthSlice";
import { CgProfile } from "react-icons/cg";
import SummaryApi from '../apis';
import { useEffect } from "react";

export default function Navbar() {

  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState(null)

  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch();
  const { isAuthenticated} = useSelector((state) => state.auth);
const [refreshProfile, setRefreshProfile] = useState(false);
  // console.log(user);
    // console.log(profile?.name);
    
  const avatarUrl = profile?.profileImage
  ? `http://localhost:8000${profile.profileImage}`
  : null;

  const navigate = useNavigate();

  const fileInputRef = useRef(null)

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData()
    formData.append("profileImage", file)

    try {
      const response = await fetch(SummaryApi.profile.url, {
        method: SummaryApi.profile.method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json()
      

      if (!response.ok) {
        toast.error(responseData.message || "Profile upload failed!");
        return;
      }
      toast.success("Profile Upload successful!");
      setRefreshProfile(prev => !prev);
    } catch (error) {
      // console.error(error);
      toast.error(error);
    }

  };

  useEffect(()=>{
 const fetchProfile=async()=>{

    const response=await fetch(SummaryApi.getProfile.url,{
      method:SummaryApi.getProfile.method,
       headers: { Authorization: `Bearer ${token}`,},
    })

    const data=await response.json();

    if (data.success) {
    setProfile(data.user);  
  }
    
  }
  fetchProfile()
  },[refreshProfile])
 


  const Logout = () => {
    dispatch(logout())
    toast.success("Logged out");
    navigate("/signin");
  };


  return (
    <nav className="bg-white shadow-md fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="170" height="40" viewBox="0 0 180 40" fill="none">
              <g transform="translate(0,3)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M17 34C26.3888 34 34 26.3888 34 17C34 7.61116 26.3888 0 17 0C7.61114 0 0 7.61116 0 17C0 26.3888 7.61114 34 17 34ZM22.3034 7.91931C22.5616 7.00234 21.6717 6.46011 20.859 7.0391L9.51415 15.1211C8.63278 15.749 8.77142 17 9.7224 17H12.7098V16.9768H18.5321L13.788 18.6508L11.6966 26.0807C11.4385 26.9977 12.3282 27.5399 13.141 26.9609L24.4859 18.8789C25.3672 18.251 25.2285 17 24.2776 17H19.7473L22.3034 7.91931Z"
                  fill="#0260FF" />
              </g>

              <text x="45" y="30"
                font-family="Inter, Arial, sans-serif"
                font-size="25"
                font-weight="700"
                fill="#0260FF"
              >
                Study-Hub
              </text>
            </svg>

          </div>

          {!isAuthenticated && (<div className="hidden md:flex space-x-8 items-center">
            <Link to="/signin" className=" w-30 h-10 text-blue-600 flex justify-center items-center hover:underline" onClick={() => dispatch(toggleState())}>Login</Link>
            <Link to="/signup" className="rounded-xl backgroundcolor w-36 h-10 text-white border-r-8 flex justify-center items-center" onClick={() => dispatch(toggleState())}>Create Account</Link>
          </div>)
          }

          {
            isAuthenticated && (
              <div className="flex justify-center items-center w-56 gap-10">
                {avatarUrl? (
                  <>
                  <div className="flex justify-center items-center gap-2 w-full">
                  <img
                    src={avatarUrl}
                    alt="profile"
                    className="w-12 h-12 rounded-full cursor-pointer"
                    onClick={handleIconClick}
                  />
                  <p>{profile?.name}</p>
                  </div>
                  </>
                ) : (
                  <>
                  <CgProfile
                    className="w-12 h-12 cursor-pointer"
                    onClick={handleIconClick}
                  />
                  <p>Guest</p>
                  </>
                )}
                <input type="file" name="file" id="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
                <div className="flex justify-center items-center cursor-pointer" onClick={Logout}>
                  <Link className="w-14 h-10 flex justify-center items-center">Logout</Link>
                  <IoLogOutOutline className="w-6 h-6" />
                </div>
              </div>
            )
          }

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              {!isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link to="/" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">Home</Link>
          <Link to="/about" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">About</Link>
          <Link to="/signup" className="backgroundcolor w-30 h-10 text-white border-r-8 flex justify-center items-center rounded-xl" onClick={() => dispatch(toggleState())}>Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
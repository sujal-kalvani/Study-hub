import React from "react";

export default function Footer() {
    return (
        <footer className=" text-white pt-10 pb-7 pl-14 max-md:pl-5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 border-b pb-10 border-white/30 max-md:mr-5">
                <div>
                    <div className="flex items-center gap-2 mb-4">
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
                    <p className="text-white/80">
                        Your one-stop Learning Management System.
                        Learn anytime, anywhere, with high-quality study resources.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-white/80">
                        <li><a href="#" className="hover:text-white">Home</a></li>
                        <li><a href="#" className="hover:text-white">Courses</a></li>
                        <li><a href="#" className="hover:text-white">Study Materials</a></li>
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                    <p className="text-white/80">Email: support@studyhub.com</p>
                    <p className="text-white/80 mt-2">Phone: +91 98765 43210</p>

                    <div className="flex gap-4 mt-4">
                        <a href="#" className="hover:opacity-80">
                            <i className="fa-brands fa-facebook text-2xl"></i>
                        </a>
                        <a href="#" className="hover:opacity-80">
                            <i className="fa-brands fa-instagram text-2xl"></i>
                        </a>
                        <a href="#" className="hover:opacity-80">
                            <i className="fa-brands fa-linkedin text-2xl"></i>
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom Line */}
            <div className="text-center text-white/70 mt-10  border-white/20 pt-5">
                © {new Date().getFullYear()} Study Hub — All Rights Reserved.
            </div>
        </footer>
    );
}

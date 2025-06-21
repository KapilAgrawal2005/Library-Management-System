import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../layout/Sidebar";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Catalog from "../components/Catalog";
import Users from "../components/Users";
import MyBorrowedBooks from "../components/MyBorrowedBooks";
import logo_with_title from "../assets/logo-with-title.png";

const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Show public landing page for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
        {/* Navigation Header */}
        <nav className="flex justify-between items-center p-6 lg:px-12">
          <div className="flex items-center">
            <img
              src={logo_with_title}
              alt="BookWorm Library"
              className="h-12 w-auto"
            />
          </div>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="px-6 py-2 text-white border border-white rounded-lg hover:bg-white hover:text-black transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
          <div className="max-w-4xl mx-auto ">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent overflow-y-hidden">
              Welcome to BookWorm
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Your Premier Digital Library for borrowing books. Discover,
              borrow, and manage your reading journey with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-black text-lg font-semibold rounded-lg hover:bg-gray-200 transition duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-black transition duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 overflow-y-hidden">
              Why Choose BookWorm?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-black">📚</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Vast Collection</h3>
                <p className="text-gray-300">
                  Access thousands of books across various genres and
                  categories.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-black">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Easy Management</h3>
                <p className="text-gray-300">
                  Simple and intuitive interface to manage your borrowed books.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-black">🔒</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Secure & Reliable
                </h3>
                <p className="text-gray-300">
                  Your data is safe with our secure and reliable platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative md:pl-64 flex min-h-screen bg-gray-100">
        <div className="md:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white">
          <GiHamburgerMenu
            className="text-2xl"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          />
        </div>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setSelectedComponent={setSelectedComponent}
        />

        {(() => {
          switch (selectedComponent) {
            case "Dashboard":
              return user?.role === "User" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );
              break;
            case "Book":
              return <BookManagement />;
              break;
            case "Catalog":
              if (user?.role === "Admin") {
                return <Catalog />;
              }
              break;
            case "Users":
              if (user?.role === "Admin") {
                return <Users />;
              }
              break;
            case "My Borrowed Books":
              return <MyBorrowedBooks />;
              break;
            default:
              return user?.role === "User" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );
              break;
          }
        })()}
      </div>
    </>
  );
};

export default Home;

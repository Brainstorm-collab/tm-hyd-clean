// // src/pages/DashboardPage.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function DashboardPage() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     navigate("/");
//     return null;
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white shadow-lg p-8 rounded-2xl w-96 text-center">
//         <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
//         <img
//           src={user.picture}
//           alt="Profile"
//           className="w-24 h-24 rounded-full mx-auto mb-4"
//         />
//         <h3 className="text-xl font-medium">{user.name}</h3>
//         <p className="text-gray-500">{user.email}</p>
//         <p className="mt-2 text-sm text-gray-400">
//           Logged in via <span className="font-semibold">{user.provider}</span>
//         </p>
//         <button
//           onClick={handleLogout}
//           className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

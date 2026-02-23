// // App.jsx
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Add Navigate
// import { useEffect } from 'react';
// import Login from './pages/Login.jsx';
// import ChatPage from './pages/ChatPage.jsx';
// import Register from './pages/Register.jsx';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Add this line to redirect root to login */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
        
//         <Route path='/login' element={<Login />} />
//         <Route path='/chat' element={<ChatPage />} />
//         <Route path='/register' element={<Register />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import ChatPage from './pages/ChatPage.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Your actual routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/register" element={<Register />} />
        
        {/* Catch all other routes - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


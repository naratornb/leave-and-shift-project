import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ShiftForm from "./components/ShiftForm";
import ShiftList from "./components/ShiftList";
import {AuthProvider} from "./context/AuthContext";
import {ShiftProvider} from "./context/ShiftContext";

function App() {
  return (
    <AuthProvider>
      <ShiftProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            {/* Navigation and other layout components */}
            <Navbar />

            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/>
                {/* Other routes */}
                <Route path="/shifts" element={<ShiftList/>}/>
                <Route path="/shifts/new" element={<ShiftForm/>}/>
                <Route path="/shifts/:id/edit" element={<ShiftForm/>}/>
              </Routes>
            </main>
          </div>
        </Router>
      </ShiftProvider>
    </AuthProvider>
  );
}

export default App;

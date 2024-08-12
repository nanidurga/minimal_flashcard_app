import React from 'react';
import FlashcardContainer from './components/FlashcardContainer';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// index.js or App.js
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FlashcardContainer />} />
                <Route path="/admin" element={<AdminDashboard/>} />
            </Routes>
        </Router>
    );
}

export default App;

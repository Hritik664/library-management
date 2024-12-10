import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AdminHomePage from './components/AdminHomePage';
import UserHomePage from './components/UserHomePage';
import CancelTransaction from './components/CancelTransaction';
import BookAvailability from './components/BookAvailability';
import IssueBook from './components/IssueBook';
import ReturnBook from './components/ReturnBook';
import PayFine from './components/PayFine';
import Reports from './components/Reports';
import MasterListBooks from './components/MasterListBooks';
import MasterListMovies from './components/MasterListMovies';
import MasterListMemberships from './components/MasterListMemberships';
import ActiveIssues from './components/ActiveIssues';
import OverdueReturns from './components/OverdueReturns';
import IssueRequests from './components/IssueRequests';
import AddMembership from './components/AddMembership';
import UpdateMembership from './components/UpdateMembership';
import AddBookMovie from './components/AddBookMovie';
import UpdateBookMovie from './components/UpdateBookMovie';
import UserManagement from './components/UserManagement';
import Confirmation from './components/Confirmation';
import Logout from './components/Logout';

function App() {

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Common Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/admin-home" element={<AdminHomePage />} />
          <Route path="/user-home" element={<UserHomePage />} />
          <Route path="/logout" element={<Logout />} />

          {/* Transactions */}
          <Route path="/cancel-transaction" element={<CancelTransaction />} />
          <Route path="/book-availability" element={<BookAvailability />} />
          <Route path="/issue-book" element={<IssueBook />} />
          <Route path="/return-book" element={<ReturnBook />} />
          <Route path="/pay-fine" element={<PayFine />} />

          {/* search */}
          <Route path="/search-books" element={<SearchBooks />} />

          {/* Reports */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/master-books" element={<MasterListBooks />} />
          <Route path="/reports/master-movies" element={<MasterListMovies />} />
          <Route path="/reports/master-memberships" element={<MasterListMemberships />} />
          <Route path="/reports/active-issues" element={<ActiveIssues />} />
          <Route path="/reports/overdue-returns" element={<OverdueReturns />} />
          <Route path="/reports/issue-requests" element={<IssueRequests />} />

          {/* Maintenance */}
          <Route path="/membership/add" element={<AddMembership />} />
          <Route path="/membership/update" element={<UpdateMembership />} />
          <Route path="/books-movies/add" element={<AddBookMovie />} />
          <Route path="/books-movies/update" element={<UpdateBookMovie />} />
          <Route path="/user-management" element={<UserManagement />} />

          {/* Confirmation */}
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

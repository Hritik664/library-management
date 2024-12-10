import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reports = () => {
    const [books, setBooks] = useState([]);
    const [movies, setMovies] = useState([]);
    const [memberships, setMemberships] = useState([]);
    const [activeIssues, setActiveIssues] = useState([]);
    const [overdueReturns, setOverdueReturns] = useState([]);
    const [issueRequests, setIssueRequests] = useState([]);

    // Fetch the reports data when the component mounts
    useEffect(() => {
        const fetchReportsData = async () => {
            try {
                const [booksData, moviesData, membershipsData, activeIssuesData, overdueReturnsData, issueRequestsData] = await Promise.all([
                    axios.get('/api/reports/books'),
                    axios.get('/api/reports/movies'),
                    axios.get('/api/reports/memberships'),
                    axios.get('/api/reports/active-issues'),
                    axios.get('/api/reports/overdue-returns'),
                    axios.get('/api/reports/issue-requests'),
                ]);

                setBooks(booksData.data);
                setMovies(moviesData.data);
                setMemberships(membershipsData.data);
                setActiveIssues(activeIssuesData.data);
                setOverdueReturns(overdueReturnsData.data);
                setIssueRequests(issueRequestsData.data);
            } catch (error) {
                console.error('Error fetching report data:', error);
            }
        };

        fetchReportsData();
    }, []);

    return (
        <div>
            <h1>Reports</h1>

            {/* Master List of Books */}
            <section>
                <h2>Master List of Books</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>Name of Book</th>
                            <th>Author Name</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Cost</th>
                            <th>Procurement Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.serialNo}>
                                <td>{book.serialNo}</td>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.category}</td>
                                <td>{book.status}</td>
                                <td>{book.cost}</td>
                                <td>{new Date(book.procurementDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Master List of Movies */}
            <section>
                <h2>Master List of Movies</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>Name of Movie</th>
                            <th>Author Name</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Cost</th>
                            <th>Procurement Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => (
                            <tr key={movie.serialNo}>
                                <td>{movie.serialNo}</td>
                                <td>{movie.name}</td>
                                <td>{movie.author}</td>
                                <td>{movie.category}</td>
                                <td>{movie.status}</td>
                                <td>{movie.cost}</td>
                                <td>{new Date(movie.procurementDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Master List of Memberships */}
            <section>
                <h2>Master List of Memberships</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Membership Id</th>
                            <th>Name of Member</th>
                            <th>Contact Number</th>
                            <th>Contact Address</th>
                            <th>Aadhar Card No</th>
                            <th>Start Date of Membership</th>
                            <th>End Date of Membership</th>
                            <th>Status</th>
                            <th>Amount Pending (Fine)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberships.map((membership) => (
                            <tr key={membership.membershipId}>
                                <td>{membership.membershipId}</td>
                                <td>{membership.memberName}</td>
                                <td>{membership.contactNumber}</td>
                                <td>{membership.contactAddress}</td>
                                <td>{membership.aadharCardNo}</td>
                                <td>{new Date(membership.startDate).toLocaleDateString()}</td>
                                <td>{new Date(membership.endDate).toLocaleDateString()}</td>
                                <td>{membership.status}</td>
                                <td>{membership.amountPending}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Active Issues */}
            <section>
                <h2>Active Issues</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Serial No Book/Movie</th>
                            <th>Name of Book/Movie</th>
                            <th>Membership Id</th>
                            <th>Date of Issue</th>
                            <th>Date of Return</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeIssues.map((issue) => (
                            <tr key={issue.serialNo}>
                                <td>{issue.serialNo}</td>
                                <td>{issue.name}</td>
                                <td>{issue.membershipId}</td>
                                <td>{new Date(issue.issueDate).toLocaleDateString()}</td>
                                <td>{issue.returnDate ? new Date(issue.returnDate).toLocaleDateString() : 'Not Returned'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Overdue Returns */}
            <section>
                <h2>Overdue Returns</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Serial No Book</th>
                            <th>Name of Book</th>
                            <th>Membership Id</th>
                            <th>Date of Issue</th>
                            <th>Date of Return</th>
                            <th>Fine Calculations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {overdueReturns.map((overdue) => (
                            <tr key={overdue.serialNo}>
                                <td>{overdue.serialNo}</td>
                                <td>{overdue.name}</td>
                                <td>{overdue.membershipId}</td>
                                <td>{new Date(overdue.issueDate).toLocaleDateString()}</td>
                                <td>{new Date(overdue.returnDate).toLocaleDateString()}</td>
                                <td>{overdue.fine}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Issue Requests */}
            <section>
                <h2>Issue Requests</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Membership Id</th>
                            <th>Name of Book/Movie</th>
                            <th>Requested Date</th>
                            <th>Request Fulfilled Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issueRequests.map((request) => (
                            <tr key={request.membershipId}>
                                <td>{request.membershipId}</td>
                                <td>{request.bookName}</td>
                                <td>{new Date(request.requestedDate).toLocaleDateString()}</td>
                                <td>{request.fulfilledDate ? new Date(request.fulfilledDate).toLocaleDateString() : 'Not Fulfilled'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Reports;

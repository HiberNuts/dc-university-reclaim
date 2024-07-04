import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import { Box, Button } from "@mui/material";
import { DataCard } from "../DataCard/DataCard";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const ContestDetails = () => {
    const { contestId } = useParams()
    const [contest, setContest] = useState(null)
    const [dataRows, setDataRows] = useState([])
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/contest/getContest`, { id: contestId })
            .then(res => setContest(res.data.data))
            .catch(er => toast.error(er))
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/contest/getUsersByContest`, { contestId })
            .then(res => setDataRows(res.data.map((user) => {
                const { _id: id, username, email, isVerified, walletAddress, designation, portfolio } = user
                return {
                    id,
                    username,
                    email,
                    isVerified,
                    walletAddress,
                    designation,
                    portfolio
                }
            })))
            .catch(er => toast.error(er))
    }, [])
    // const rows = [
    //     { id: 1, username: 'john_doe', email: 'john.doe@example.com', isVerified: true, walletAddress: '0xAbC1234567890DeF1234567890abcdef12345678', designation: 'Software Engineer', portfolio: 'https://johnsportfolio.com' },
    //     { id: 2, username: 'jane_smith', email: 'jane.smith@example.com', isVerified: false, walletAddress: '0xBcD234567890EfG234567890abCdef1234567890', designation: 'Product Manager', portfolio: 'https://janesmith.com' },
    //     { id: 3, username: 'alice_jones', email: 'alice.jones@example.com', isVerified: true, walletAddress: '0xCdE34567890fGh34567890aBcdef123456789012', designation: 'UX Designer', portfolio: 'https://alicejonesdesigns.com' },
    //     { id: 4, username: 'bob_brown', email: 'bob.brown@example.com', isVerified: false, walletAddress: '0xDeF4567890gHi4567890abCdef12345678901234', designation: 'Data Scientist', portfolio: 'https://bobbrowndata.com' },
    //     { id: 5, username: 'carol_white', email: 'carol.white@example.com', isVerified: true, walletAddress: '0xEfG567890hIj567890aBcdef1234567890123456', designation: 'Marketing Specialist', portfolio: 'https://carolwhite.com' }
    // ];

    const columns = [
        { field: 'username', headerName: 'Username', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 2 },
        { field: 'isVerified', headerName: 'IsVerified', flex: 1 },
        { field: 'walletAddress', headerName: 'Wallet Address', flex: 2 },
        { field: 'designation', headerName: 'Designation', flex: 2 },
        { field: 'portfolio', headerName: 'Portfolio', flex: 2 }
    ];
    return contest ? <div style={{ textAlign: 'center', marginBottom: "100px" }}>
        <Toaster position="top-right" reverseOrder={false} />
        <div style={{ marginTop: '30px', marginBottom: '20px', }}>
            <h2>CONTEST DETAILS</h2>
        </div>

        <div
            key={contest._id}
            style={{
                margin: '10px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <img
                src={contest.image}
                alt={contest.title}
                style={{
                    width: '40%',
                    height: '40%',
                    borderRadius: '12px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    objectFit: 'cover',
                    marginBottom: '30px',
                }}
            />

            <div
                style={{
                    color: '#3A4CFF',
                    fontSize: '20px',
                    margin: '0px 0px 20px',
                }}
            >
                <p>
                    Course Soft Delete Status:{' '}
                    <span style={{ color: '#FF8743' }}>
                        {contest.softDelete}
                    </span>{' '}
                </p>
            </div>
            {/* {console.log(course)} */}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                }}
            >
                <Button onClick={() => { }} variant="contained" color="error">
                    Hard Delete
                </Button>
                <Button variant="outlined" color="error" onClick={() => { }}>
                    Soft Delete
                </Button>
            </div>

            <div
                style={{
                    margin: '10px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                <DataCard title="Title" data={contest.title} />
                <DataCard
                    title="Description"
                    data={contest.description.slice(0, 200) + (contest.description.length > 200 ? "..." : "")}
                    sx={{
                        maxHeight: '20px',
                        overflowY: 'auto',
                        margin: '0',
                        padding: '0',
                    }}
                />
                {/* <DataCard title="Users Enrolled" data={contest.usersEnrolled.length} /> */}
                <DataCard title="Level" data={contest.level} />
                {/* <DataCard title="Duration" data={contest.duration} /> */}
            </div>
            <div
                style={{
                    margin: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '10px',
                }}
            ></div>
        </div>

        <div style={{ marginTop: '30px', marginBottom: '20px' }}>
            <h2>User Details</h2>
        </div>
        {/* <div>
      <Button disabled={csvLoading} variant='contained' className='text-lg' onClick={handleExportCSV}>{csvLoading ? "Generating your file please wait" : "Export as CSV"} </Button>
    </div> */}
        {/* <div style={{ height: '400px', width: '100%', overflow: 'auto' }} className="tablediv"> */}
        {/* <Box sx={{ width: '100%', overflow: "scroll" }}>
      <DataGrid
        // pagination
        
        rows={rows}
        columns={columns}
      />
    </Box> */}
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={dataRows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
        {/* <div>
      <Button disabled={pagination.page === 1} onClick={handlePrevPage}>Previous Page</Button>
      <span>Page {pagination.page} of {pagination.totalPages}</span>
      <Button disabled={pagination.page === pagination.totalPages} onClick={handleNextPage}>Next Page</Button>
    </div> */}

        {/* </div> */}
    </div> : <div>
        contest loading
    </div>
}
export default ContestDetails;
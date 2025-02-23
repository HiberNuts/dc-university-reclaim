import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import { Box, Button } from "@mui/material";
import { DataCard } from "../DataCard/DataCard";
import { DataGrid } from "@mui/x-data-grid";

const ContestDetails = () => {
    const { contestId } = useParams()
    const [contest, setContest] = useState(null)
    const [dataRows, setDataRows] = useState([])
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/contest/getContest`, { id: contestId })
            .then(res => setContest(res.data.data))
            .catch(er => toast.error(er))
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/contest/getSubmissionByContest`, { contestId })
            .then(res => {
                if (!res.data.length) return
                setDataRows(
                    res.data.map((user, index) => {
                        return {
                            id: index + 1,
                            ...user
                        }
                    }))
            }
            )
            .catch(er => console.log(er))
    }, [])

    const generateLeaderboard = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/contest/leaderboard/generate?id=${contestId}`,)
            .then(res => {
                if (res.data.error === false)
                    toast.success(res.data.message)
                else
                    toast.error(res.data.message)
            })
            .catch(er => toast.error(er.message))
    }
    const softDelete = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/contest/softDelete?id=${contestId}`)
            .then(res => {
                if (res.data.error == false)
                    toast.success(res.data.message);
                else
                    toast.error(res.data.message);
            })
    }
    const columns = [
        { field: 'rank', headerName: 'Rank', flex: 1 },
        { field: 'shardId', headerName: 'ID', flex: 2 },
        { field: 'username', headerName: 'Username', flex: 2 },
        { field: 'totalCases', headerName: 'total cases', flex: 1 },
        { field: 'passedCases', headerName: 'passed cases', flex: 2 },
        { field: 'submittedTime', headerName: 'Submitted Time', flex: 2 },
        { field: 'xp', headerName: 'XP', flex: 2 },
        { field: 'walletAddress', headerName: 'Wallet Adress', flex: 2 },
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
                        {contest.softDelete.toString()}
                    </span>{' '}
                </p>
            </div>
            <div
                style={{
                    color: '#3A4CFF',
                    fontSize: '20px',
                    margin: '0px 0px 20px',
                }}
            >
                <p>
                    Leader Board generation status:{' '}
                    <span style={{ color: '#FF8743' }}>
                        {contest.leaderboard.toString()}
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
                {/* <Button onClick={() => { }} variant="contained" color="error">
                    Hard Delete
                </Button> */}
                <Button variant="outlined" color="error" onClick={softDelete}>
                    Soft Delete
                </Button>
            </div>

            <Button variant="contained" style={{ marginTop: "1rem" }} color="error" onClick={generateLeaderboard}>
                Generate leader board
            </Button>

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
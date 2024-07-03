import { Button } from "@mui/material"
import { DataCard } from "../DataCard/DataCard"
import { useEffect, useState } from "react"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
const Contest = () => {
    const navigate=useNavigate()
    const syncContestData = async () => {
        return
    }   
    const [contests, setContests] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/contest/allContests`)
            .then(res => setContests(res.data.data))
            .catch(er => toast.error(er))
    }, [])
    return <div style={{ padding: "5rem", textAlign: "center" }}>
        <Toaster position="top-center" reverseOrder={false} />
        <p>
            Total Number of Contests:{' '}
            <span style={{ color: '#FF8743', textAlign: "center" }}>{contests.length}</span>
        </p>

        <Button
            className="sync-button"
            onClick={syncContestData}
            contained
            disableElevation
            style={{
                padding: '10px',
                margin: '10px',
                backgroundColor: 'var(--shardeum-orange)',
                cursor: 'pointer',
                border: '2px solid var(--shardeum-blue)',
                borderRadius: '10px',
                color: 'white',
            }}
        >
            Sync Courses
        </Button>

        <div
            style={{
                margin: '10px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
        >

            {contests.length && contests.map(contest => <DataCard
                title={
                    contest.title
                }
                data={
                    contest.description
                }
                onClick={() => navigate(`/contest-details/${contest._id}`)}
                key={contest._id}
            />)}
        </div>

    </div>
}
export default Contest
import React from 'react'
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';

export default function LoadingState() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    return (
        <>

            <svg width={0} height={0}>
                <defs>
                    <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#E3D095" />
                        <stop offset="100%" stopColor="#626F47" />
                    </linearGradient>
                </defs>
            </svg>
            {isLoggedIn ? (
                <div style={{
                    height: '54vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
                </div>
            ) : (
                <div style={{
                    height: '65.5vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
                </div>
            )
            }
        </>
    )
}

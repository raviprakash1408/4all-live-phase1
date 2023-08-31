import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import { useSelector } from "react-redux";


export const SpaceLoadingShimmer = () => {
    const theme = useSelector((state) => state.theme.themeData);
    return (
        <>
            <div style={{ display: "flex" }}>
                <span style={{position:"relative",marginLeft:'-7px'}}>
                    <Skeleton style={{ backgroundColor:  theme?.loading?.loadingColor }} variant="circular" width={40} height={40} />
                </span>
                <span style={{position:"relative",marginLeft:'-7px'}}>
                    <Skeleton style={{backgroundColor:  theme?.loading?.loadingColor}} variant="circular" width={40} height={40} />
                </span>
                <span style={{position:"relative",marginLeft:'-7px'}}>
                    <Skeleton style={{backgroundColor:  theme?.loading?.loadingColor}} variant="circular" width={40} height={40} />
                </span>
                <span style={{position:"relative",marginLeft:'-7px'}}>
                    <Skeleton style={{backgroundColor:  theme?.loading?.loadingColor}} variant="circular" width={40} height={40} />
                </span>
            </div>
        </>
    )
};
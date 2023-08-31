import { Box,Typography,Grid,CardActionArea } from "@mui/material";
import { trimFileNme } from "../../utilities/common";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const MediaFileManagerLoader = ({progress, loaderfilename, loaderfilesize, loaderfileduration, count}) => {
console.log(count,"FileCount");
    const theme = useSelector((state) => state.theme.themeData);

        return (
            
                
<Grid item xs={12} sm={4} md={3} lg={3}>
                <Card
                    sx={{ maxWidth: 250, height: 250 }}
                    style={{
                    backgroundColor: theme?.shareVideo?.videoIconBgcolor,
                    transition: "all 0.1s ease",
                    boxShadow: "none",
                    position: "relative",
                    }}
                    className="filemanager-grid"
                >
                    <CardActionArea>
                    <Skeleton height="179px" width="250px" />
                    <p
                        style={{
                        position: "absolute",
                        top: "33%",
                        right: "50%",
                        transform: "translate(50%,-50%)",
                        zIndex: 6,
                        fontSize: "14px",
                        color: "rgb(136, 161, 171)",
                        fontFamily: "URW DIN REGULAR",
                        }}
                    >
                        Uploading...
                    </p>
    
                    <CardContent
                        style={{
                        margin: "0px",
                        padding: "0px",
                        display: "flex",
                        }}
                    >
                        <div
                        style={{
                            padding: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        >
                        {/* circular loader */}
                        <Box
                            sx={{
                            position: "relative",
                            display: "inline-flex",
                            }}
                        >
                            <CircularProgress
                            variant="determinate"
                            value={progress}
                            />
                            <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: "absolute",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            >
                            <Typography
                                variant="caption"
                                component="div"
                                color="text.secondary"
                                style={{
                                fontSize: "12px",
                                color: "rgb(136, 161, 171)",
                                fontFamily: "URW DIN REGULAR",
                                }}
                            >
                                {`${Math.round(progress)}%`}
                            </Typography>
                            </Box>
                        </Box>
                        </div>
                        <div
                        style={{
                            padding: "15px 10px",
                            backgroundColor: theme?.shareVideo?.cardBgcolor,
                            width: "200px",
                        }}
                        >
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            style={{
                            color: "#88A1AB",
                            fontSize: "14px",
                            whiteSpace: "nowrap",
                            marginRight: "19px",
                            }}
                        >
                            {/* <Skeleton /> */}
                            {trimFileNme(loaderfilename)}
                        </Typography>
                        <Typography
                            variant="body2"
                            style={{
                            fontFamily: "URW DIN REGULAR",
                            fontWeight: 400,
                            color: theme?.shareVideo?.dateTextColor,
                            }}
                        >
                            {/* <Skeleton /> */}
                            Size:{loaderfilesize} MB | 00:00:
                            {loaderfileduration}
                        </Typography>
                        </div>
                    </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
                
            
   
        )
    
}

export default MediaFileManagerLoader
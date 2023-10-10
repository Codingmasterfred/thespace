import { ManageAccounts,EditOutlined,LocationOutLined,WorkOutlineOutlined, LocationOnOutlined } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/icons-material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import  { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget =({ userId, picturePath }) => {
    const [user, setUser] = useState(null)
    const palette = useTheme();
    const Navigate = useNavigate();
    const token =useSelector((state) => state.token)
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`"http://localhost:3001/users/${userId}"`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},

        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        setUser();
    }, [])

    if(!user)
    {
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (
        <WidgetWrapper>

            <FlexBetween
            gap="0.5rem"
            pb="1.1rem"
            onClick={() => Navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap= "1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                        variant="h4"
                        color={dark}
                        fontWeight="500"
                        sx={{
                            "&:hover":{
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                        }}>{firstName} {lastName}</Typography>
                        <Typography color={medium}>{friends.length} friends</Typography>
                    </Box>
                </FlexBetween>
                <Divider />

                <Box p="1rem 0">
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <LocationOnOutlined fontSize="large" sx={{ color:main}} />
                        <Typography color={medium} >{location}</Typography>
                    </Box>
                </Box>
                        
                <Box p="1rem">
                     <FlexBetween mb="0.5rem">
                        <Typography color={medium}>Who's viewed your profile?</Typography>
                        <Typography color={main} fontWeight="500">{viewedProfile}</Typography>
                     </FlexBetween>
                     <FlexBetween>
                        <Typography color={medium}>Post Impressions</Typography>
                        <Typography color={main} fontWeight="500">{impressions}</Typography>
                     </FlexBetween>
                </Box>

                        <Divider />
                <Box p="1rem 0">
                    <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                        Social Profiles
                    </Typography>
                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <img src="JaysApp\public\assets\logo-black.png" alt="X Icon" />
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    X
                                </Typography>
                                <Typography color={medium}>Network</Typography>
                            </Box>
                        </FlexBetween>
                    </FlexBetween>
                    <EditOutlined sx={{color: main}} />
                        
                        <Divider />
                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <img src="JaysApp\public\assets\LI-In-Bug.png" alt="LinkedIn" />
                            <Box>
                                <Typography color={main} fontWeight="500">
                                   LinkedIn
                                </Typography>
                                <Typography color={medium}>Network</Typography>
                            </Box>
                        </FlexBetween>
                    </FlexBetween>
                    <EditOutlined sx={{color: main}} />
                </Box> 

            </FlexBetween>
        </WidgetWrapper>
    )
}

export default UserWidget;
Dev
import { Box, useMediaQuery } from "@mui/material";
import {useSelector} from "react-redux";
import Navbar from "../navbar/navbar";
import UserWidget from "../widgets/UserWidgets";
import MyPostWidget from 'scenes/widgets/MyPostWidget';


const HomePage = () => {

    const isNonMobileScreens =useMediaQuery("(min-width:1000px)");
    const {_id, picturePath} = useSelector((state) => state.user);
    return(<Box>
        <Navbar />
        <Box 
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between">
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
                mt={isNonMobileScreens ? undefined :"2rem"}></Box>
            </Box>

            {isNonMobileScreens && (
                {}
            )}

import { Box } from "@mui/material";
import Navbar from "../navbar/navbar";

const HomePage = () => {
    return(<Box>
        <Navbar />
master
    </Box>)
}

export default HomePage;
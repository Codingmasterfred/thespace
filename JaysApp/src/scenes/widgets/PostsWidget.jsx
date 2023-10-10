import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";

const PostsWidget  =({ userId, isProfile = false }) => {
const dispach = useDispatch();
const posts = useSelector((state) => state.posts);
const token = useSelector((state) => state.token);

// GET request to see all posts
const getPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts`, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`},

    });
    const data = await response.json();
    dispach(setPosts({ posts:data }))
}

// GET request for user-specific posts
const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`},

    });
    const data = await response.json();
    dispach(setPosts({ posts:data }))
};

useEffect(() => {
    if (isProfile){ // Deciding on seeing all posts, or if on a profile, user specific ones
        getUserPosts();
    } else {
        getPosts();
    }
}, []);

return (
    <>
    {posts.map(
        ({
         _id,
         userId,
         firstName,
         lastName,
         description,
         location,
         picturePath,
         userPicturePath,
         likes,
         comments,
       
        }) => (
            <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            />

           
        )

    )}

</>
)
};

export default PostsWidget;
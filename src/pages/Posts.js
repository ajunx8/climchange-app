import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import '../styles/Posts.css';

const Posts = ( {session} ) => {
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState( {user_id: null, title: "", content: ""} );
    const { title, content } = post
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (session) {
            initializePost({session})
            fetchPosts({session})
        }
    }, [session])

    const initializePost = ({session}) => {
        console.log("setting user: ", session)
        setUser(session.user)
        setPost({ ...post, user_id: session.user.id })
    }

    async function fetchPosts({session}) {
        const { data } = await supabase
            .from('posts')
            .select()
            .eq('user_id', session.user.id)
        setPosts(data) // gets all the posts matching the user_id with the session.user.id and sets the 'posts' as 'data'
        console.log("data: ", data) 
    }

    async function createPost(e) {
        e.preventDefault();
        const { data } = await supabase
        .from('posts')
        .insert(post)

        console.log("created post: ", data);
        
        setPost({user_id: post.user_id, title: "", content: "" })
        fetchPosts({session})
    }

    return(
        <div className="posts-container" >
            <h3>My Journal on Climate Change</h3>
            <form className="post-form" onSubmit={ createPost }>
                <input 
                    id="title"
                    type="text" 
                    required 
                    placeholder="Title of Entry" 
                    value={title}
                    onChange={e => setPost({ ...post, title: e.target.value })} 
                />
                <textarea  
                    required 
                    placeholder="💭 Today's thoughts on the state of our Climate 💭" 
                    value={content}
                    onChange={e => setPost({ ...post, content: e.target.value })} 
                />
                <input id="create-post" type="submit" value="Create Post" />
            </form>

            <PostsList posts={ posts } />
        </div>
    );
}


const PostsList = (props) => {
    return (
        <div className="all-posts" >
            <p>You have {props.posts.length} Posts</p>
            { props.posts.map(p => (
                <div className="each-post" key={p.id}>
                    <h3>{p.title}</h3>
                    <p>{p.content}</p>
                </div>
                ))
            }
        </div>
    )
}

export default Posts;


import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

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
        <div>
            <h3>Blog Here</h3>
            <form className="post-form" onSubmit={ createPost }>
                <input 
                    type="text" 
                    required 
                    placeholder="title" 
                    value={title}
                    onChange={e => setPost({ ...post, title: e.target.value })} 
                />
                <input 
                    type="textarea" 
                    required 
                    placeholder="Content" 
                    value={content}
                    onChange={e => setPost({ ...post, content: e.target.value })} 
                />
                <input type="submit" value="Create Post" />
            </form>
        </div>
    );
}

export default Posts;
import React from "react";

const Blogs = () => {
    const [content,setContent] = useState('');

    const _handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <div>
            <h3>Blog Here</h3>
            <form onSubmit={ _handleSubmit }>
                <input type="text" required placeholder="title" />
                <input type="textarea" value={content} />
                <input type="submit" value="Post" />
            </form>
        </div>
    );
}

export default Blogs;
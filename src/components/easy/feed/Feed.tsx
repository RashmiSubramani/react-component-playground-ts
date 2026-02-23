/*
  FEED (Social Post Feed with Like)
  -----------------------------------
  Difficulty: Easy
  Concepts: typed Post object, useState<Post[]>, typed form event (FormEvent),
            immutable update with .map(), toggle boolean + conditional increment/decrement,
            aria-pressed for accessibility

  How toggleLike works:
  - .map() over posts, find matching ID
  - Flip the `liked` boolean
  - If was liked → decrement likes, if wasn't → increment likes
  - Returns a new array (immutable update)
*/

import { useState } from "react";
import "./styles.css";

// ─── Post type ────────────────────────────────────────────────────
type Post = {
  id: number;
  author: string;
  content: string;
  likes: number;
  liked: boolean;
  createdAt: number; // timestamp from Date.now()
};

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");

  // ChangeEvent<HTMLTextAreaElement> — typed event from the textarea
  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      author: "You",
      content: text,
      likes: 0,
      liked: false,
      createdAt: Date.now(),
    };

    setPosts([newPost, ...posts]);
    setText("");
  }

  function toggleLike(id: number) {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  }

  return (
    <div className="feed-container">
      <form className="create-post" onSubmit={handleSubmit}>
        <textarea
          className="post-input"
          placeholder="What's happening?"
          value={text}
          onChange={handleTextChange}
          aria-label="Create post"
        />
        <button className="post-btn" type="submit">
          Post
        </button>
      </form>

      <div className="post-list">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <div className="post-header">
              <strong>{post.author}</strong>
              <span className="post-time">
                {new Date(post.createdAt).toLocaleTimeString()}
              </span>
            </div>

            <p className="post-content">{post.content}</p>

            <button
              className={`like-btn ${post.liked ? "liked" : ""}`}
              onClick={() => toggleLike(post.id)}
              aria-pressed={post.liked}
            >
              {post.likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

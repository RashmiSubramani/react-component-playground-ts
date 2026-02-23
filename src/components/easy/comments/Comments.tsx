/*
  NESTED COMMENTS (Reddit-style)
  --------------------------------
  Difficulty: Easy
  Concepts: recursive type (self-referencing CommentData), recursive component,
            optional chaining on replies, typed props

  Architecture:
  Comments (parent) — owns the data array
    └── Comment (recursive) — renders each comment + recurses into replies
*/

import { Comment } from "./Comment";
import "./styles.css";

// ─── Recursive type — a comment can have nested replies of the same shape ──
export type CommentData = {
  username: string;
  comment: string;
  replies?: CommentData[]; // optional → leaf comments have no replies
};

// ─── Sample data with deeply nested replies ───────────────────────
const data: CommentData[] = [
  {
    username: "Akshay Saini",
    comment: "Lorem ipsum dolor sit amet consectetur adip occurence velit",
    replies: [
      {
        username: "Deepika Padukone",
        comment: "Lorem ipsum dolor sit amet consectetur adip occurence velit",
      },
    ],
  },
  {
    username: "Elon Musk",
    comment: "Lorem ipsum dolor sit amet consectetur adip occurence velit",
    replies: [
      {
        username: "Deepika Padukone",
        comment: "Lorem ipsum dolor sit amet consectetur adip occurence velit",
        replies: [
          {
            username: "Deepika Padukone",
            comment:
              "Lorem ipsum dolor sit amet consectetur adip occurence velit",
            replies: [
              {
                username: "Deepika Padukone",
                comment:
                  "Lorem ipsum dolor sit amet consectetur adip occurence velit",
                replies: [
                  {
                    username: "Deepika Padukone",
                    comment:
                      "Lorem ipsum dolor sit amet consectetur adip occurence velit",
                    replies: [
                      {
                        username: "Deepika Padukone",
                        comment:
                          "Lorem ipsum dolor sit amet consectetur adip occurence velit",
                        replies: [
                          {
                            username: "Deepika Padukone",
                            comment:
                              "Lorem ipsum dolor sit amet consectetur adip occurence velit",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            username: "Deepika Padukone",
            comment:
              "Lorem ipsum dolor sit amet consectetur adip occurence velit",
          },
        ],
      },
      {
        username: "Deepika Padukone",
        comment: "Lorem ipsum dolor sit amet consectetur adip occurence velit",
      },
    ],
  },
  {
    username: "Sachin Tendulkar",
    comment: "Lorem ipsum dolor sit amet consectetur adip occurence velit",
  },
];

export default function Comments() {
  return (
    <div className="commentsContainer">
      <Comment data={data} />
    </div>
  );
}

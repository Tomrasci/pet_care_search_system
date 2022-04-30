import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import commentApi from "../../Api/commentApi";
import { IComment } from "../../Interfaces/Caretaker/IComment";
import { IFetchedComment } from "../../Interfaces/Caretaker/IFetchedComment";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({ currentUser, currentAdvertisement }: any) => {
  const [fetchedComments, setFetchedComments] = useState<IFetchedComment[]>([]);
  const [activeComment, setActiveComment] = useState(null);

  useEffect(() => {
    async function getComments() {
      if (currentAdvertisement) {
        const comments = await commentApi.getAdvertisementCommentsWithUserInfo(
          currentAdvertisement.id
        );
        setFetchedComments(comments);
      }
    }
    getComments();
  }, [currentAdvertisement]);

  const addComment = async (text: string) => {
    const newComment: IComment = {
      description: text,
      advertisement_id: currentAdvertisement.id,
      user_id: currentUser.id,
    };
    await commentApi.createComment(newComment).then((comment) => {
      setFetchedComments([...fetchedComments, comment]);
    });
  };

  const deleteComment = async (commentId: number) => {
    if (window.confirm("Are you sure you want to remove this comment?")) {
      await commentApi.deleteComment(commentId).then(() => {
        const updatedComments = fetchedComments.filter(
          (comment) => comment.id !== commentId
        );
        setFetchedComments(updatedComments);
      });
    }
  };

  const updateComment = async (text: string, commentId: number) => {
    const editedComment: IComment = {
      description: text,
      advertisement_id: currentAdvertisement.id,
      user_id: currentUser.id,
    };
    await commentApi
      .updateComment(commentId, editedComment)
      .then((comments: IFetchedComment[]) => {
        const updatedComments = comments.map((comment: IFetchedComment) => {
          if (comment.id === commentId) {
            return { ...comment, description: text };
          }
          return comment;
        });
        setFetchedComments(updatedComments);
        setActiveComment(null);
      });
  };

  return (
    fetchedComments && (
      <div className="comments">
        <Box marginY={2}></Box>
        <CommentForm submitLabel="Write" handleSubmit={addComment} />
        <div className="comments-container">
          {fetchedComments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                currentUser={currentUser}
                deleteComment={deleteComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                updateComment={updateComment}
              />
            );
          })}
        </div>
      </div>
    )
  );
};

export default Comments;

import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  Button,
  Textarea,
  IconButton,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { FiThumbsUp, FiMessageSquare, FiTrash2, FiEdit2 } from 'react-icons/fi';
import type { Comment } from '../api/services/comment.service';
import { commentService } from '../api/services/comment.service';
import { useAuth } from '../contexts/AuthContext';

interface CommentListProps {
  courseId: string;
  comments: Comment[];
  onCommentUpdate: () => void;
}

export function CommentList({ courseId, comments, onCommentUpdate }: CommentListProps) {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const toast = useToast();

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);
      await commentService.createComment({
        content: newComment,
        courseId,
        parentId: replyTo,
      });
      setNewComment('');
      setReplyTo(null);
      onCommentUpdate();
      toast({
        title: '评论成功',
        status: 'success',
        duration: 2000,
      });
    } catch (error: any) {
      toast({
        title: '评论失败',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditComment = async (commentId: string, content: string) => {
    try {
      setIsSubmitting(true);
      await commentService.updateComment(courseId, commentId, { content });
      setEditingComment(null);
      onCommentUpdate();
      toast({
        title: '更新成功',
        status: 'success',
        duration: 2000,
      });
    } catch (error: any) {
      toast({
        title: '更新失败',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await commentService.deleteComment(courseId, commentId);
      onCommentUpdate();
      toast({
        title: '删除成功',
        status: 'success',
        duration: 2000,
      });
    } catch (error: any) {
      toast({
        title: '删除失败',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleLikeComment = async (commentId: string, isLiked: boolean) => {
    try {
      if (isLiked) {
        await commentService.unlikeComment(courseId, commentId);
      } else {
        await commentService.likeComment(courseId, commentId);
      }
      onCommentUpdate();
    } catch (error: any) {
      toast({
        title: '操作失败',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <Box pl={isReply ? 8 : 0}>
      <HStack align="start" spacing={4}>
        <Avatar size="sm" name={comment.user.name} src={comment.user.avatar} />
        <Box flex="1">
          <HStack justify="space-between" mb={1}>
            <Text fontWeight="medium">{comment.user.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {new Date(comment.createdAt).toLocaleString()}
            </Text>
          </HStack>
          
          {editingComment === comment.id ? (
            <Box mb={2}>
              <Textarea
                defaultValue={comment.content}
                onBlur={(e) => handleEditComment(comment.id, e.target.value)}
                autoFocus
              />
            </Box>
          ) : (
            <Text mb={2}>{comment.content}</Text>
          )}

          <HStack spacing={4}>
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<FiThumbsUp />}
              onClick={() => handleLikeComment(comment.id, comment.isLiked)}
              color={comment.isLiked ? 'brand.500' : 'gray.600'}
            >
              {comment.likes}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<FiMessageSquare />}
              onClick={() => setReplyTo(comment.id)}
            >
              回复
            </Button>

            {user?.id === comment.userId && (
              <>
                <IconButton
                  size="sm"
                  variant="ghost"
                  icon={<FiEdit2 />}
                  aria-label="编辑"
                  onClick={() => setEditingComment(comment.id)}
                />
                <IconButton
                  size="sm"
                  variant="ghost"
                  icon={<FiTrash2 />}
                  aria-label="删除"
                  onClick={() => handleDeleteComment(comment.id)}
                />
              </>
            )}
          </HStack>
        </Box>
      </HStack>

      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} isReply />
      ))}
    </Box>
  );

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Textarea
          placeholder="写下你的评论..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          mb={2}
        />
        <HStack justify="space-between">
          {replyTo && (
            <Text fontSize="sm" color="gray.500">
              回复评论
              <Button
                size="sm"
                variant="link"
                colorScheme="red"
                onClick={() => setReplyTo(null)}
                ml={2}
              >
                取消
              </Button>
            </Text>
          )}
          <Button
            colorScheme="brand"
            isLoading={isSubmitting}
            onClick={handleSubmitComment}
            ml="auto"
          >
            发表评论
          </Button>
        </HStack>
      </Box>

      <Divider />

      <VStack spacing={6} align="stretch">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </VStack>
    </VStack>
  );
} 
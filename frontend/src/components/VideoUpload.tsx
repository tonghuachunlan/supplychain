import { useState, useRef } from 'react';
import {
  Box,
  AspectRatio,
  Text,
  VStack,
  HStack,
  Icon,
  IconButton,
  Progress,
  Button,
  useToast,
} from '@chakra-ui/react';
import { FiPlay, FiPause, FiUpload, FiTrash2 } from 'react-icons/fi';
import { FileUpload } from './FileUpload';

interface VideoUploadProps {
  currentVideo?: string;
  onVideoChange: (url: string) => void;
  onVideoDelete?: () => void;
}

export function VideoUpload({
  currentVideo,
  onVideoChange,
  onVideoDelete,
}: VideoUploadProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const toast = useToast();

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDelete = async () => {
    try {
      if (onVideoDelete) {
        await onVideoDelete();
        toast({
          title: '视频删除成功',
          status: 'success',
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast({
        title: '视频删除失败',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      {currentVideo ? (
        <Box position="relative">
          <AspectRatio ratio={16 / 9}>
            <video
              ref={videoRef}
              src={currentVideo}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <track kind="captions" />
            </video>
          </AspectRatio>

          {/* 视频控制按钮 */}
          <HStack
            position="absolute"
            bottom="4"
            left="4"
            spacing={2}
          >
            <IconButton
              aria-label={isPlaying ? '暂停' : '播放'}
              icon={isPlaying ? <FiPause /> : <FiPlay />}
              onClick={handlePlayPause}
              colorScheme="brand"
              size="sm"
            />
            <IconButton
              aria-label="删除视频"
              icon={<FiTrash2 />}
              onClick={handleDelete}
              colorScheme="red"
              size="sm"
            />
          </HStack>
        </Box>
      ) : (
        <FileUpload
          accept="video/mp4,video/webm"
          maxSize={500 * 1024 * 1024} // 500MB
          uploadType="video"
          onUploadSuccess={onVideoChange}
          onUploadError={(error) => {
            toast({
              title: '视频上传失败',
              description: error,
              status: 'error',
              duration: 3000,
            });
          }}
        />
      )}
    </VStack>
  );
} 
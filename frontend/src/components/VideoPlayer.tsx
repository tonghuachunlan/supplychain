import { useEffect, useRef, useState } from 'react';
import {
  Box,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  HStack,
  Text,
  Tooltip,
  AspectRatio,
} from '@chakra-ui/react';
import {
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiMaximize,
  FiMinimize,
} from 'react-icons/fi';

interface VideoPlayerProps {
  videoUrl: string;
  onProgressUpdate?: (progress: number) => void;
  onComplete?: () => void;
  startTime?: number;
}

export function VideoPlayer({
  videoUrl,
  onProgressUpdate,
  onComplete,
  startTime = 0,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
    }
  }, [startTime]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      onProgressUpdate?.(video.currentTime);
      
      // 检查是否完成观看（进度超过95%）
      if (video.currentTime / video.duration > 0.95) {
        onComplete?.();
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onComplete?.();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onProgressUpdate, onComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.volume = value;
      setVolume(value);
      setIsMuted(value === 0);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleSeek = (value: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.parentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <Box
      position="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <AspectRatio ratio={16 / 9}>
        <video
          ref={videoRef}
          src={videoUrl}
          onClick={handlePlayPause}
          style={{ width: '100%', height: '100%' }}
        >
          <track kind="captions" />
        </video>
      </AspectRatio>

      {/* 视频控制栏 */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        bg="rgba(0, 0, 0, 0.7)"
        p={4}
        transition="opacity 0.3s"
        opacity={showControls ? 1 : 0}
      >
        <Box mb={2}>
          <Slider
            aria-label="视频进度"
            value={currentTime}
            min={0}
            max={duration}
            onChange={handleSeek}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              label={formatTime(currentTime)}
              placement="top"
              isOpen={showControls}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </Box>

        <HStack justify="space-between">
          <HStack spacing={4}>
            <IconButton
              aria-label={isPlaying ? '暂停' : '播放'}
              icon={isPlaying ? <FiPause /> : <FiPlay />}
              onClick={handlePlayPause}
              variant="ghost"
              color="white"
            />

            <HStack width="200px">
              <IconButton
                aria-label={isMuted ? '取消静音' : '静音'}
                icon={isMuted ? <FiVolumeX /> : <FiVolume2 />}
                onClick={handleMuteToggle}
                variant="ghost"
                color="white"
              />
              <Slider
                aria-label="音量"
                value={isMuted ? 0 : volume}
                min={0}
                max={1}
                step={0.1}
                onChange={handleVolumeChange}
                width="100px"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </HStack>

            <Text color="white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          </HStack>

          <HStack>
            <IconButton
              aria-label={isFullscreen ? '退出全屏' : '全屏'}
              icon={isFullscreen ? <FiMinimize /> : <FiMaximize />}
              onClick={handleFullscreenToggle}
              variant="ghost"
              color="white"
            />
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
} 
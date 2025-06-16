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
  src: string;
  title: string;
  onProgressUpdate: (progress: number) => void;
  onComplete: () => void;
}

export default function VideoPlayer({ src, title, onProgressUpdate, onComplete }: VideoPlayerProps) {
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
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100;
      onProgressUpdate(progress);
      if (progress >= 99.5) {
        onComplete();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', onComplete);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', onComplete);
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
    <Box borderRadius="lg" overflow="hidden">
      <AspectRatio ratio={16 / 9}>
        <Box
          as="video"
          ref={videoRef}
          src={src}
          title={title}
          controls
          style={{ width: '100%', height: '100%' }}
        />
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
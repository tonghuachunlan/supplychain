import { useState, useRef } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  Progress,
  VStack,
  HStack,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';

interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  uploadType: 'avatar' | 'video' | 'cover' | 'material';
  onUploadSuccess: (url: string) => void;
  onUploadError?: (error: string) => void;
}

export function FileUpload({
  accept = '*/*',
  maxSize = 100 * 1024 * 1024, // 默认100MB
  uploadType,
  onUploadSuccess,
  onUploadError,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 检查文件大小
    if (file.size > maxSize) {
      toast({
        title: '文件过大',
        description: `文件大小不能超过 ${Math.round(maxSize / 1024 / 1024)}MB`,
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch(`/api/upload/${uploadType}`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        // 上传进度处理
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(Math.round(progress));
        },
      });

      if (!response.ok) {
        throw new Error('上传失败');
      }

      const data = await response.json();
      onUploadSuccess(data.url);
      
      toast({
        title: '上传成功',
        status: 'success',
        duration: 2000,
      });

      // 清理状态
      setSelectedFile(null);
      setUploadProgress(0);
    } catch (error: any) {
      const errorMessage = error.message || '上传失败';
      onUploadError?.(errorMessage);
      
      toast({
        title: '上传失败',
        description: errorMessage,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Input
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        hidden
        ref={fileInputRef}
      />

      <Box
        borderWidth={2}
        borderRadius="lg"
        borderStyle="dashed"
        p={6}
        textAlign="center"
        cursor="pointer"
        onClick={() => fileInputRef.current?.click()}
        _hover={{ bg: 'gray.50' }}
      >
        {selectedFile ? (
          <VStack spacing={2}>
            <HStack>
              <Icon as={FiFile} />
              <Text>{selectedFile.name}</Text>
              <Button
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
              >
                <Icon as={FiX} />
              </Button>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </Text>
          </VStack>
        ) : (
          <VStack spacing={2}>
            <Icon as={FiUpload} boxSize={6} />
            <Text>点击或拖拽文件到此处上传</Text>
            <Text fontSize="sm" color="gray.500">
              最大文件大小: {Math.round(maxSize / 1024 / 1024)}MB
            </Text>
          </VStack>
        )}
      </Box>

      {selectedFile && (
        <VStack spacing={2}>
          {isUploading && (
            <Progress
              value={uploadProgress}
              size="sm"
              width="100%"
              borderRadius="full"
              colorScheme="brand"
            />
          )}
          <Button
            colorScheme="brand"
            onClick={handleUpload}
            isLoading={isUploading}
            loadingText="上传中..."
            width="100%"
          >
            上传文件
          </Button>
        </VStack>
      )}
    </VStack>
  );
} 
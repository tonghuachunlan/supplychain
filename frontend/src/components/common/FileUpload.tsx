import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Progress,
  Text,
  VStack,
  useToast,
  Icon,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';
import { captureError } from '../../utils/monitoring';

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  acceptedFileTypes?: string[];
  maxSize?: number;
  multiple?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  acceptedFileTypes = ['video/*', 'image/*', 'application/pdf'],
  maxSize = 100 * 1024 * 1024, // 100MB
  multiple = false,
}) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const toast = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setIsUploading(true);
      for (const file of acceptedFiles) {
        await onUpload(file);
        setUploadProgress((prev) => prev + (100 / acceptedFiles.length));
      }
      toast({
        title: '上传成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      captureError(error as Error);
      toast({
        title: '上传失败',
        description: '请稍后重试',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [onUpload, toast]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.join(','),
    maxSize,
    multiple,
  });

  return (
    <VStack spacing={4} width="100%">
      <Box
        {...getRootProps()}
        width="100%"
        p={6}
        border="2px dashed"
        borderColor={isDragActive ? 'blue.500' : 'gray.200'}
        borderRadius="md"
        textAlign="center"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ borderColor: 'blue.500' }}
      >
        <input {...getInputProps()} />
        <Icon as={FiUpload} w={8} h={8} color="gray.400" mb={4} />
        {isDragActive ? (
          <Text>将文件拖放到此处</Text>
        ) : (
          <Text>
            点击或将文件拖放到此处上传
            <br />
            <Text as="span" fontSize="sm" color="gray.500">
              支持的文件类型: {acceptedFileTypes.join(', ')}
            </Text>
          </Text>
        )}
      </Box>

      {isUploading && (
        <Box width="100%">
          <Progress value={uploadProgress} size="sm" colorScheme="blue" />
        </Box>
      )}

      {fileRejections.length > 0 && (
        <Box width="100%" p={4} bg="red.50" borderRadius="md">
          <Text color="red.500">
            以下文件无法上传：
            {fileRejections.map(({ file, errors }) => (
              <Text key={file.name} fontSize="sm">
                {file.name}: {errors.map(e => e.message).join(', ')}
              </Text>
            ))}
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export default FileUpload; 
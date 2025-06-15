import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  IconButton,
  Button,
  List,
  ListItem,
  useToast,
} from '@chakra-ui/react';
import {
  FiFile,
  FiDownload,
  FiTrash2,
  FiUpload,
  FiFileText,
  FiFilePlus,
} from 'react-icons/fi';
import { FileUpload } from './FileUpload';

interface Material {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

interface MaterialUploadProps {
  materials: Material[];
  onMaterialAdd: (url: string, name: string) => void;
  onMaterialDelete: (id: string) => Promise<void>;
}

export function MaterialUpload({
  materials,
  onMaterialAdd,
  onMaterialDelete,
}: MaterialUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();

  const handleUploadSuccess = (url: string, fileName: string) => {
    onMaterialAdd(url, fileName);
    setIsUploading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await onMaterialDelete(id);
      toast({
        title: '资料删除成功',
        status: 'success',
        duration: 2000,
      });
    } catch (error: any) {
      toast({
        title: '资料删除失败',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <VStack spacing={4} align="stretch">
      <List spacing={2}>
        {materials.map((material) => (
          <ListItem
            key={material.id}
            p={3}
            borderWidth={1}
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
          >
            <HStack justify="space-between">
              <HStack flex={1}>
                <Icon
                  as={FiFileText}
                  color="brand.500"
                  boxSize={5}
                />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="medium">{material.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {formatFileSize(material.size)} • {
                      new Date(material.uploadedAt).toLocaleDateString()
                    }
                  </Text>
                </VStack>
              </HStack>
              <HStack>
                <IconButton
                  aria-label="下载资料"
                  icon={<FiDownload />}
                  size="sm"
                  variant="ghost"
                  onClick={() => window.open(material.url, '_blank')}
                />
                <IconButton
                  aria-label="删除资料"
                  icon={<FiTrash2 />}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => handleDelete(material.id)}
                />
              </HStack>
            </HStack>
          </ListItem>
        ))}
      </List>

      {isUploading ? (
        <FileUpload
          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
          maxSize={50 * 1024 * 1024} // 50MB
          uploadType="material"
          onUploadSuccess={(url) => handleUploadSuccess(url, 'New Material')}
          onUploadError={(error) => {
            toast({
              title: '资料上传失败',
              description: error,
              status: 'error',
              duration: 3000,
            });
            setIsUploading(false);
          }}
        />
      ) : (
        <Button
          leftIcon={<FiFilePlus />}
          onClick={() => setIsUploading(true)}
          colorScheme="brand"
          variant="outline"
          width="100%"
        >
          添加课程资料
        </Button>
      )}
    </VStack>
  );
} 
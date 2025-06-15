import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Textarea,
  Button,
  VStack,
  HStack,
  Text,
  useToast,
  Badge,
} from '@chakra-ui/react';
import { FiSave, FiClock } from 'react-icons/fi';
import debounce from 'lodash/debounce';

interface NoteEditorProps {
  courseId: string;
  chapterId: string;
  initialNote?: string;
  timestamp?: number;
  onSave: (note: string) => Promise<void>;
}

export function NoteEditor({
  courseId,
  chapterId,
  initialNote = '',
  timestamp = 0,
  onSave,
}: NoteEditorProps) {
  const [note, setNote] = useState(initialNote);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const toast = useToast();

  // 自动保存防抖
  const debouncedSave = useCallback(
    debounce(async (content: string) => {
      try {
        setIsSaving(true);
        await onSave(content);
        setLastSaved(new Date());
      } catch (error: any) {
        toast({
          title: '保存失败',
          description: error.message,
          status: 'error',
          duration: 3000,
        });
      } finally {
        setIsSaving(false);
      }
    }, 1000),
    [onSave]
  );

  // 监听笔记内容变化，触发自动保存
  useEffect(() => {
    if (note !== initialNote) {
      debouncedSave(note);
    }
  }, [note, initialNote, debouncedSave]);

  // 组件卸载时保存
  useEffect(() => {
    return () => {
      if (note !== initialNote) {
        debouncedSave.flush();
      }
    };
  }, [note, initialNote, debouncedSave]);

  const formatTimestamp = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleManualSave = async () => {
    try {
      setIsSaving(true);
      await onSave(note);
      setLastSaved(new Date());
      toast({
        title: '保存成功',
        status: 'success',
        duration: 2000,
      });
    } catch (error: any) {
      toast({
        title: '保存失败',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="lg" fontWeight="medium">
          课程笔记
        </Text>
        <HStack spacing={2}>
          {timestamp > 0 && (
            <Badge variant="subtle" colorScheme="blue">
              <HStack spacing={1}>
                <FiClock />
                <Text>{formatTimestamp(timestamp)}</Text>
              </HStack>
            </Badge>
          )}
          {lastSaved && (
            <Text fontSize="sm" color="gray.500">
              上次保存: {lastSaved.toLocaleTimeString()}
            </Text>
          )}
          <Button
            leftIcon={<FiSave />}
            size="sm"
            colorScheme="brand"
            onClick={handleManualSave}
            isLoading={isSaving}
          >
            保存
          </Button>
        </HStack>
      </HStack>

      <Box position="relative">
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="在这里记录你的学习笔记..."
          minHeight="200px"
          resize="vertical"
          disabled={isSaving}
        />
        {isSaving && (
          <Text
            position="absolute"
            bottom={2}
            right={2}
            fontSize="sm"
            color="gray.500"
          >
            正在保存...
          </Text>
        )}
      </Box>
    </VStack>
  );
} 
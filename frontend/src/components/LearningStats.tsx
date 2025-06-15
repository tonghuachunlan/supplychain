import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  VStack,
  HStack,
  Text,
  Icon,
  Progress,
} from '@chakra-ui/react';
import {
  FiClock,
  FiBook,
  FiAward,
  FiTrendingUp,
  FiCalendar,
} from 'react-icons/fi';

interface LearningStatsProps {
  stats: {
    totalCourses: number;
    completedCourses: number;
    totalLearningTime: number;
    averageDailyTime: number;
    learningDays: number;
    lastWeekTime: number;
    thisWeekTime: number;
  };
}

export function LearningStats({ stats }: LearningStatsProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}小时${mins}分钟`;
    }
    return `${mins}分钟`;
  };

  const calculateProgress = () => {
    return (stats.completedCourses / stats.totalCourses) * 100;
  };

  const calculateTimeChange = () => {
    const change = ((stats.thisWeekTime - stats.lastWeekTime) / stats.lastWeekTime) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isIncrease: change > 0,
    };
  };

  const timeChange = calculateTimeChange();

  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="sm">
      <VStack spacing={6} align="stretch">
        {/* 总体进度 */}
        <Box>
          <HStack justify="space-between" mb={2}>
            <Text fontSize="lg" fontWeight="medium">
              学习概览
            </Text>
            <Text color="gray.600">
              {stats.completedCourses}/{stats.totalCourses} 课程完成
            </Text>
          </HStack>
          <Progress
            value={calculateProgress()}
            size="lg"
            borderRadius="full"
            colorScheme="brand"
          />
        </Box>

        {/* 统计数据 */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <Stat>
            <StatLabel>
              <HStack>
                <Icon as={FiClock} />
                <Text>总学习时长</Text>
              </HStack>
            </StatLabel>
            <StatNumber>{formatTime(stats.totalLearningTime)}</StatNumber>
            <StatHelpText>
              <StatArrow
                type={timeChange.isIncrease ? 'increase' : 'decrease'}
              />
              较上周{timeChange.isIncrease ? '增长' : '减少'} {timeChange.value}%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>
              <HStack>
                <Icon as={FiBook} />
                <Text>已学课程</Text>
              </HStack>
            </StatLabel>
            <StatNumber>{stats.completedCourses}</StatNumber>
            <StatHelpText>共 {stats.totalCourses} 门课程</StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>
              <HStack>
                <Icon as={FiTrendingUp} />
                <Text>日均学习</Text>
              </HStack>
            </StatLabel>
            <StatNumber>{formatTime(stats.averageDailyTime)}</StatNumber>
            <StatHelpText>坚持学习的好习惯</StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>
              <HStack>
                <Icon as={FiCalendar} />
                <Text>学习天数</Text>
              </HStack>
            </StatLabel>
            <StatNumber>{stats.learningDays}</StatNumber>
            <StatHelpText>
              <Icon as={FiAward} color="yellow.500" mr={1} />
              继续保持
            </StatHelpText>
          </Stat>
        </SimpleGrid>

        {/* 学习提示 */}
        <Box bg="gray.50" p={4} borderRadius="md">
          <HStack spacing={2}>
            <Icon as={FiTrendingUp} color="brand.500" />
            <Text color="gray.600" fontSize="sm">
              {timeChange.isIncrease
                ? '本周学习时长有所提升，继续加油！'
                : '本周学习时长有所下降，要保持学习热情哦！'}
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
} 
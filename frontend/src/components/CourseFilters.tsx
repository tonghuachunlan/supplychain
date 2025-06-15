import { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Select,
  Stack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { CourseFilters as FilterOptions } from '../api/services/course.service';

interface CourseFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  isLoading?: boolean;
}

export function CourseFilters({ onFilterChange, isLoading }: CourseFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    sortBy: 'createdAt',
    order: 'desc',
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onFilterChange(filters);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [filters, onFilterChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterOptions['sortBy'] }));
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, order: e.target.value as FilterOptions['order'] }));
  };

  const handleReset = () => {
    setFilters({
      search: '',
      sortBy: 'createdAt',
      order: 'desc',
    });
    setIsExpanded(false);
  };

  const FilterControls = () => (
    <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
      <FormControl>
        <FormLabel>排序方式</FormLabel>
        <Select
          value={filters.sortBy}
          onChange={handleSortChange}
          isDisabled={isLoading}
        >
          <option value="createdAt">最新发布</option>
          <option value="enrolledCount">最多报名</option>
          <option value="rating">最高评分</option>
          <option value="price">价格</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>排序顺序</FormLabel>
        <Select
          value={filters.order}
          onChange={handleOrderChange}
          isDisabled={isLoading}
        >
          <option value="desc">降序</option>
          <option value="asc">升序</option>
        </Select>
      </FormControl>

      <Button
        onClick={handleReset}
        variant="ghost"
        colorScheme="gray"
        isDisabled={isLoading}
        leftIcon={<Icon as={FiX} />}
      >
        重置
      </Button>
    </Stack>
  );

  return (
    <Box bg="white" p={4} borderRadius="lg" shadow="sm">
      <Stack spacing={4}>
        <HStack>
          <FormControl flex="1">
            <Input
              placeholder="搜索课程..."
              value={filters.search}
              onChange={handleSearchChange}
              isDisabled={isLoading}
              leftIcon={<Icon as={FiSearch} color="gray.400" />}
            />
          </FormControl>
          {isMobile && (
            <IconButton
              aria-label="Toggle filters"
              icon={<Icon as={FiFilter} />}
              onClick={() => setIsExpanded(!isExpanded)}
              isDisabled={isLoading}
            />
          )}
        </HStack>

        {(!isMobile || isExpanded) && <FilterControls />}
      </Stack>
    </Box>
  );
} 
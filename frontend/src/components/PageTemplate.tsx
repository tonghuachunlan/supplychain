import {
  Box,
  Container,
  Heading,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  breadcrumbs: Array<{
    title: string;
    link?: string;
  }>;
  children: React.ReactNode;
}

export default function PageTemplate({ title, subtitle, breadcrumbs, children }: PageTemplateProps) {
  return (
    <Box>
      <Box bg="gray.50" py={8}>
        <Container maxW="container.xl">
          <Breadcrumb mb={4}>
            <BreadcrumbItem>
              <BreadcrumbLink as={RouterLink} to="/">首页</BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.map((item, index) => (
              <BreadcrumbItem key={index} isCurrentPage={index === breadcrumbs.length - 1}>
                {item.link ? (
                  <BreadcrumbLink as={RouterLink} to={item.link}>
                    {item.title}
                  </BreadcrumbLink>
                ) : (
                  <Text>{item.title}</Text>
                )}
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
          <Heading as="h1" size="xl" mb={subtitle ? 2 : 0}>
            {title}
          </Heading>
          {subtitle && (
            <Text fontSize="lg" color="gray.600">
              {subtitle}
            </Text>
          )}
        </Container>
      </Box>
      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </Box>
  );
} 
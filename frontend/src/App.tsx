import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from './styles/theme';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// 基础页面
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// 已实现的课程相关页面
import CourseList from './pages/courses/CourseList';
import CourseDetail from './pages/courses/CourseDetail';
import CourseLearning from './pages/courses/CourseLearning';

// 行业动态
import IndustryNews from './pages/industry/IndustryNews';
import PolicyAnalysis from './pages/industry/PolicyAnalysis';
import TechnologyTrends from './pages/industry/TechnologyTrends';
import CaseStudies from './pages/industry/CaseStudies';

// 专家观点（待实现）
import ExpertColumns from './pages/expert/ExpertColumns';
import DeepArticles from './pages/expert/DeepArticles';
import Solutions from './pages/expert/Solutions';
import ExpertQA from './pages/expert/ExpertQA';

// 供应链学院（整合已有课程系统）
import AcademyHome from './pages/academy/Home';
import BasicCourses from './pages/academy/BasicCourses';
import AdvancedCourses from './pages/academy/AdvancedCourses';
import PracticalGuides from './pages/academy/PracticalGuides';
import LearningPaths from './pages/academy/LearningPaths';

// 资料下载
import Whitepapers from './pages/resources/Whitepapers';
import Reports from './pages/resources/Reports';
import Tools from './pages/resources/Tools';
import Standards from './pages/resources/Standards';

// 用户中心
import UserProfile from './pages/user/Profile';
import LearningRecords from './pages/user/LearningRecords';
import Favorites from './pages/user/Favorites';
import Interactions from './pages/user/Interactions';
import Enterprise from './pages/user/Enterprise';
import Orders from './pages/user/Orders';

// 管理平台
import AdminDashboard from './pages/admin/Dashboard';
import ContentManagement from './pages/admin/ContentManagement';
import UserManagement from './pages/admin/UserManagement';
import DataAnalysis from './pages/admin/DataAnalysis';
import OperationTools from './pages/admin/OperationTools';

// 其他页面
import About from './pages/about/About';
import Team from './pages/about/Team';
import Contact from './pages/about/Contact';
import Careers from './pages/about/Careers';

// 咨询与服务
import ConsultingHome from './pages/consulting/Home';
import EnterpriseService from './pages/consulting/EnterpriseService';
import CustomTraining from './pages/consulting/CustomTraining';
import SupplyChainAssessment from './pages/consulting/SupplyChainAssessment';
import ConsultingContact from './pages/consulting/ConsultingContact';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Router>
            <Layout>
              <Routes>
                {/* 基础路由 */}
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                {/* 供应链学院 */}
                <Route path="academy">
                  <Route index element={<AcademyHome />} />
                  <Route path="courses" element={<CourseList />} />
                  <Route path="courses/:courseId" element={<CourseDetail />} />
                  <Route path="courses/:courseId/learn" 
                    element={<ProtectedRoute><CourseLearning /></ProtectedRoute>} 
                  />
                  <Route path="basic" element={<BasicCourses />} />
                  <Route path="advanced" element={<AdvancedCourses />} />
                  <Route path="guides" element={<PracticalGuides />} />
                  <Route path="paths" element={<LearningPaths />} />
                </Route>

                {/* 专家观点 */}
                <Route path="expert">
                  <Route index element={<ExpertColumns />} />
                  <Route path="columns" element={<ExpertColumns />} />
                  <Route path="articles" element={<DeepArticles />} />
                  <Route path="solutions" element={<Solutions />} />
                  <Route path="qa" element={<ExpertQA />} />
                </Route>

                {/* 咨询与服务 */}
                <Route path="consulting">
                  <Route index element={<ConsultingHome />} />
                  <Route path="enterprise" element={<EnterpriseService />} />
                  <Route path="training" element={<CustomTraining />} />
                  <Route path="assessment" element={<SupplyChainAssessment />} />
                  <Route path="contact" element={<ConsultingContact />} />
                </Route>

                {/* 新闻动态 */}
                <Route path="news">
                  <Route index element={<IndustryNews />} />
                  <Route path="policy" element={<PolicyAnalysis />} />
                  <Route path="technology" element={<TechnologyTrends />} />
                  <Route path="cases" element={<CaseStudies />} />
                </Route>

                {/* 资料下载 */}
                <Route path="resources">
                  <Route index element={<Whitepapers />} />
                  <Route path="whitepapers" element={<Whitepapers />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="tools" element={<Tools />} />
                  <Route path="standards" element={<Standards />} />
                </Route>

                {/* 用户中心（需要认证） */}
                <Route path="user">
                  <Route path="profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                  <Route path="learning" element={<ProtectedRoute><LearningRecords /></ProtectedRoute>} />
                  <Route path="favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
                  <Route path="interactions" element={<ProtectedRoute><Interactions /></ProtectedRoute>} />
                  <Route path="enterprise" element={<ProtectedRoute><Enterprise /></ProtectedRoute>} />
                  <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                </Route>

                {/* 管理平台（需要认证和管理员权限） */}
                <Route path="admin">
                  <Route index element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                  <Route path="content" element={<ProtectedRoute><ContentManagement /></ProtectedRoute>} />
                  <Route path="users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
                  <Route path="analysis" element={<ProtectedRoute><DataAnalysis /></ProtectedRoute>} />
                  <Route path="operations" element={<ProtectedRoute><OperationTools /></ProtectedRoute>} />
                </Route>

                {/* 关于我们 */}
                <Route path="about" element={<About />} />
                <Route path="team" element={<Team />} />
                <Route path="contact" element={<Contact />} />
                <Route path="careers" element={<Careers />} />
              </Routes>
            </Layout>
          </Router>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;

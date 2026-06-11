import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { DashboardPage } from '../pages/DashboardPage'
import { TopicsPage } from '../pages/TopicsPage'
import { StudyRoutePage } from '../pages/StudyRoutePage'
import { SearchPage } from '../pages/SearchPage'
import { StatsPage } from '../pages/StatsPage'

export const AppRouter = () => (
  <Routes>
    <Route element={<Layout />} path="/">
      <Route element={<DashboardPage />} index />
      <Route element={<TopicsPage />} path="topics" />
      <Route element={<StudyRoutePage />} path="study/:mode" />
      <Route element={<StudyRoutePage />} path="study/:mode/:topicSlug" />
      <Route element={<SearchPage />} path="search" />
      <Route element={<StatsPage />} path="stats" />
      <Route element={<Navigate to="/" replace />} path="*" />
    </Route>
  </Routes>
)

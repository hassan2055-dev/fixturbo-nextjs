import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import RouteScrollToTop from "./helper/RouteScrollToTop";
import ScrollToTop from "react-scroll-to-top";
import Analytics from "./components/Analytics";
import HomePageTwo from "./pages/HomePageTwo";
import ThankYouPage from "./pages/ThankYouPage";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Analytics googleAnalyticsId="G-0C0XXT0XX7" />
        <RouteScrollToTop />
        <ScrollToTop smooth color="#E8092E" />
        <Routes>
          <Route exact path="/" element={<HomePageTwo />} />
          <Route path="/11235813.html" element={<ThankYouPage />} />
          {/* Catch-all route - redirect any non-existent URLs to homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

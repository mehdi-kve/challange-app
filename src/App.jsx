import { lazy, Suspense, useEffect, useState } from "react";
import QuestionnairePage from "./pages/QuestionnairePage";
import { REVIEW_STORAGE_KEY } from "./features/usconcept/hooks/useReviewFlow";

const ScanPage = lazy(() => import("./pages/ScanPage"));

function getRoute() {
  return window.location.hash.replace(/^#/, "") || "/";
}

function ReviewRedirect() {
  useEffect(() => {
    window.location.hash = "/";
  }, []);
  return null;
}

function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route.startsWith("/scan")) {
    return (
      <Suspense fallback={null}>
        <ScanPage />
      </Suspense>
    );
  }

  if (route.startsWith("/review")) {
    const raw = sessionStorage.getItem(REVIEW_STORAGE_KEY);
    let reviewPayload = null;
    if (raw) {
      try {
        reviewPayload = JSON.parse(raw);
      } catch {
        sessionStorage.removeItem(REVIEW_STORAGE_KEY);
      }
    }
    if (reviewPayload && reviewPayload.answers) {
      return <QuestionnairePage reviewPayload={reviewPayload} />;
    }
    return <ReviewRedirect />;
  }

  return <QuestionnairePage />;
}

export default App;
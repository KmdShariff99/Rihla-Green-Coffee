"use client";

import dynamic from "next/dynamic";

const LegacyApp = dynamic(() => import("../../client/src/App"), { ssr: false, loading: () => <div className="min-h-screen bg-background" aria-label="Loading Rihla Global" /> });

export default function CatchAllPage() {
  return <LegacyApp />;
}

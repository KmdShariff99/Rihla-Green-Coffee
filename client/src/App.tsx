"use client";

import { lazy, Suspense } from "react";
import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import Home from "@/pages/Home";
const About = lazy(() => import("@/pages/About"));
const Products = lazy(() => import("@/pages/Products"));
const ExportProcess = lazy(() => import("@/pages/ExportProcess"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Contact = lazy(() => import("@/pages/Contact"));
import NotFound from "@/pages/not-found";

function AppRouter() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-background" aria-label="Loading page" />}>
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/products" component={Products} />
      <Route path="/export-process" component={ExportProcess} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
              <AppRouter />
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </Router>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { X, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup in this session
    const hasSeen = sessionStorage.getItem("hasSeenWelcomePopup");

    if (!hasSeen) {
      // Small delay to allow dashboard to render first
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenWelcomePopup", "true");
      }, 800);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md bg-white rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                  <BookOpen className="w-6 h-6" />
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 -mr-2 text-muted hover:bg-secondary hover:text-foreground rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-bold font-serif text-foreground">
                  Welcome to NIVAA Admin
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  If you want to understand how the admin panel works, we have
                  prepared a comprehensive documentation just for you. Get
                  started by learning the core features and flow.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleClose}
                  className="px-5 py-3 rounded-xl border border-border text-xs font-bold uppercase tracking-wider text-muted hover:bg-secondary transition-colors w-full sm:w-auto text-center"
                >
                  Dismiss
                </button>
                <Link
                  to="/docs"
                  onClick={handleClose}
                  className="px-5 py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex-1 text-center"
                >
                  Go to Documentation
                </Link>
              </div>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}

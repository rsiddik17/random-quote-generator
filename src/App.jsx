import React, { useEffect, useState } from "react";
import getQuotes from "./getQuotes";
import { Stack, Typography, Button } from "@mui/material";
import QuoteCard from "./components/QuoteCard";
import QuoteHistory from "./components/QuoteHistory";
import DarkModeToggle from "./components/DarkModeToggle";
import ToastNotification from "./components/ToastNotification";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("quoteHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const hasMounted = React.useRef(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const data = await getQuotes();
      if (data && data.length > 0) {
        const newQuote = {
          quote: data[0].quote,
          author: data[0].author,
        };

        setHistory((prev) => {
          const updated = [newQuote, ...prev.slice(0, 4)];
          localStorage.setItem("quoteHistory", JSON.stringify(updated));
          return updated;
        });

        setQuote(newQuote.quote);
        setAuthor(newQuote.author);
      }
    } catch (err) {
      alert("Failed to load quote. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote}" - ${author}`);
    setToastOpen(true);
  };

  const handleToggleDark = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("darkMode", next);
      return next;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("quoteHistory");
  };

  const speak = () => {
    if (!quote) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(`"${quote}" by ${author}`);
    utterance.lang = "en-US";
    utterance.rate = 1;

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  useEffect(() => {
    if (!hasMounted.current) {
      handleClick();
      hasMounted.current = true;
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="app">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignContent="center"
        sx={{ width: "100%", maxWidth: 500 }}
      >
        <Typography variant="h3" gutterBottom>
          Random Quote Generator
        </Typography>
        <DarkModeToggle darkMode={darkMode} onToggle={handleToggleDark} />
      </Stack>

      <QuoteCard
        quote={quote}
        author={author}
        loading={loading}
        onGetQuote={handleClick}
        onCopy={handleCopy}
        onSpeak={speak}
        onStop={stopSpeaking}
      />

      <ToastNotification
        open={toastOpen}
        message="Copied to clipboard!"
        onClose={() => setToastOpen(false)}
      />

      {history.length > 0 && (
        <div className="history">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography variant="h6">Quote History</Typography>
            <Button
              onClick={handleClearHistory}
              color="error"
              size="small"
              variant="outlined"
            >
              Clear History
            </Button>
          </Stack>

          <QuoteHistory history={history} />
        </div>
      )}
    </div>
  );
}

export default App;
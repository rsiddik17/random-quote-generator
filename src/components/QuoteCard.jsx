import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const QuoteCard = ({ quote, author, loading, onGetQuote, onCopy, onSpeak, onStop }) => {
  return (
    <Card className="card">
      <CardContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              "{quote}""
            </Typography>
            <Typography variant="subtitle2" className="margin-top">
              - {author}
            </Typography>
            <hr />
            <Stack spacing={1}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={onGetQuote}
              >
                Get Another Quote
              </Button>

              <Button
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={onCopy}
                fullWidth
              >
                Copy to Clipboard
              </Button>

              <Stack direction="row" spacing={1}>
                <Button variant="outlined" fullWidth onClick={onSpeak}>
                  🔊 Listen to Quote
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  color="error"
                  onClick={onStop}
                >
                  🛑 Stop Voice
                </Button>
              </Stack>
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
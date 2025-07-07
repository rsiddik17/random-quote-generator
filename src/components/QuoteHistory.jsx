import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const QuoteHistory = ({ history }) => {
  return (
    <div className="history-grid">
      {history.map((item, index) => (
        <Card key={index} className="card history-card">
          <CardContent>
            <Typography variant="body1">"{item.quote}"</Typography>
            <Typography variant="caption">— {item.author}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuoteHistory;
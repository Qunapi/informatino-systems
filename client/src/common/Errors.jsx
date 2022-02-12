import { Typography, CardContent, Card } from "@mui/material";
import React from "react";

export const Errors = ({ errors }) => {
  return (
    !!Object.entries(errors || {}).length && (
      <Card
        sx={(theme) => ({
          minWidth: 275,
          position: "fixed",
          right: 30,
          top: 100,
          border: `1px solid ${theme.palette.error.main}`,
          maxWidth: 400,
        })}
      >
        <CardContent>
          {Object.entries(errors || {}).map(([key, value]) => {
            return (
              <Typography
                key={key}
                sx={(theme) => ({ color: theme.palette.error.main })}
                variant="body2"
              >
                {key}: {value.message}
              </Typography>
            );
          })}
        </CardContent>
      </Card>
    )
  );
};

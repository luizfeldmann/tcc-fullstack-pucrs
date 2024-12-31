import { Box, Paper, Stack } from "@mui/material";

export const FormPage = (props: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Paper
        component={Stack}
        spacing={1}
        sx={{
          width: "100%",
          maxWidth: "600px",
          padding: 2,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "stretch",
          boxShadow: 3,
        }}
      >
        {props.children}
      </Paper>
    </Box>
  );
};

import { Grid, Stack, Box, Skeleton, Typography } from "@mui/material";
const WeeklyCalendarSkeleton = () => {
  return (
    <Box>
      <Stack justifyContent="center" direction="row">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography align="center" variant="h5">
            <Skeleton variant="text" width={90} height={50} />
          </Typography>
        </div>
      </Stack>
      <Grid container spacing={1} columns={14}>
        {Array.from(Array(7).keys()).map((i) => (
          <Grid item xs={14} sm={7} md={2} key={i}>
            <Stack spacing={1}>
              <Skeleton variant="rectangular" width={"100%"} height={40} />
              <Skeleton variant="rectangular" width={"100%"} height={120} />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WeeklyCalendarSkeleton;

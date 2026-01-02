import { GridOverlay } from "@mui/x-data-grid";
import { Box, Skeleton } from "@mui/material";

export const CustomLoadingOverlay = () => {
  return (
    <GridOverlay>
      <Box width="100%" p={2}>
        {[...Array(5)].map((_, i) => (
          <Box key={i} mb={2}>
            <Skeleton width="60%" height={28} />
            <Skeleton width="80%" />
            <Skeleton width="70%" />
            <Skeleton variant="rectangular" height={36} sx={{ mt: 1 }} />
          </Box>
        ))}
      </Box>
    </GridOverlay>
  );
};

export default CustomLoadingOverlay;

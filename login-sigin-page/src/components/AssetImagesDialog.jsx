import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";

const BASE_URL = "http://localhost:5000"; // change if needed

const AssetImagesDialog = ({ open, onClose, images = [] }) => {
  const safeImages = Array.isArray(images) ? images : [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Allocated Images</DialogTitle>

      <DialogContent>
        {safeImages.length === 0 ? (
          <Typography>No images allocated</Typography>
        ) : (
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {safeImages.map((img, i) => {
              if (!img) return null;

              const src = img.startsWith("http")
                ? img
                : `${BASE_URL}/${img.replace(/\\/g, "/")}`;

              return (
                <img
                  key={i}
                  src={src}
                  alt="asset"
                  width={140}
                  height={140}
                  style={{
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              );
            })}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AssetImagesDialog;

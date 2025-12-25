import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  List,
  ListItem,
} from "@mui/material";

const AssetCountDialog = ({ open, onClose, assets }) => {
  const safeAssets = Array.isArray(assets) ? assets : [];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Asset Summary</DialogTitle>
      <DialogContent>
        <Typography fontWeight="bold">
          Total Allocated Assets: {safeAssets.length}
        </Typography>

        {safeAssets.length === 0 ? (
          <Typography mt={1}>No assets allocated</Typography>
        ) : (
          <List>
            {safeAssets.map((asset, i) => (
              <ListItem key={i}>{asset}</ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AssetCountDialog;

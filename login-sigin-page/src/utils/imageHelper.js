const IMAGE_BASE_URL = "https://hard-ingratiating-ila.ngrok-free.dev";

export const getAssetImage = (asset) => {
  if (!asset?.image) return "";

  // already full URL
  if (asset.image.startsWith("http")) {
    return asset.image.replace(
      "http://localhost:5000",
      IMAGE_BASE_URL
    );
  }

  // relative path
  return `${IMAGE_BASE_URL}${asset.image}`;
};

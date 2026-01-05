const IMAGE_BASE_URL = "https://hard-ingratiating-ila.ngrok-free.dev";
/*
export const getAssetImage = (asset) => {
  if (!asset?.image) return "/no-image.png";

  if (asset.image.includes("localhost:5000")) {
    return asset.image.replace(
      "http://localhost:5000",
      IMAGE_BASE_URL
    );
  }

  if (asset.image.startsWith("http")) {
    return asset.image;
  }

  return `${IMAGE_BASE_URL}${asset.image}`;
};
*/


export const getAssetImage = (asset) => {
  if (!asset?.image) {
    return "https://via.placeholder.com/300x400"; // fallback
  }

  let url = asset.image;

  // Replace localhost backend with ngrok URL
  if (url.includes("localhost:5000")) {
    url = url.replace("http://localhost:5000", IMAGE_BASE_URL);
  }

  // Force https if http
  if (url.startsWith("http:")) {
    url = url.replace("http:", "https:");
  }

  return url;
};

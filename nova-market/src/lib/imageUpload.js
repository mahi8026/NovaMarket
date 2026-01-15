/**
 * Image Upload Utility for Nova Marketplace
 * Uses imgbb.com for image hosting
 */

const IMAGE_HOST_KEY =
  process.env.NEXT_PUBLIC_IMAGE_HOST_KEY || "5fbe3b269af220ef9639c781bec38e5b";
const UPLOAD_API_URL = "https://api.imgbb.com/1/upload";

/**
 * Upload image to imgbb
 * @param {File} file - Image file to upload
 * @returns {Promise<string>} URL of uploaded image
 */
export async function uploadImage(file) {
  if (!file) {
    throw new Error("No file provided");
  }

  // Validate file type
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (!validTypes.includes(file.type)) {
    throw new Error(
      "Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image."
    );
  }

  // Validate file size (max 32MB for imgbb)
  const maxSize = 32 * 1024 * 1024; // 32MB
  if (file.size > maxSize) {
    throw new Error("File size too large. Maximum size is 32MB.");
  }

  try {
    // Create form data
    const formData = new FormData();
    formData.append("key", IMAGE_HOST_KEY);
    formData.append("image", file);

    // Upload to imgbb
    const response = await fetch(UPLOAD_API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to upload image");
    }

    const data = await response.json();

    if (!data.success || !data.data?.url) {
      throw new Error("Invalid response from image host");
    }

    return data.data.url;
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error(
      error.message || "Failed to upload image. Please try again."
    );
  }
}

/**
 * Convert base64 to File object
 * @param {string} base64 - Base64 encoded image
 * @param {string} filename - Filename for the file
 * @returns {File} File object
 */
export function base64ToFile(base64, filename = "image.jpg") {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

/**
 * Validate image URL
 * @param {string} url - Image URL to validate
 * @returns {Promise<boolean>} True if valid image URL
 */
export async function validateImageUrl(url) {
  if (!url) return false;

  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("content-type");
    return contentType && contentType.startsWith("image/");
  } catch {
    return false;
  }
}

"use client";

import { useState, useRef } from "react";
import { uploadImage } from "@/lib/imageUpload";

export default function ProductForm({ onSubmit, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.length > 100) {
      newErrors.name = "Product name must be 100 characters or less";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length > 1000) {
      newErrors.description = "Description must be 1000 characters or less";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else {
      const priceNum = parseFloat(formData.price);
      if (isNaN(priceNum) || priceNum <= 0) {
        newErrors.price = "Price must be a positive number";
      }
    }

    if (!formData.image.trim()) {
      newErrors.image = "Product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image:
          "Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.",
      }));
      return;
    }

    const maxSize = 32 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        image: "File size too large. Maximum size is 32MB.",
      }));
      return;
    }

    try {
      setIsUploadingImage(true);
      setErrors((prev) => ({ ...prev, image: "" }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      const imageUrl = await uploadImage(file);

      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
      setErrors((prev) => ({
        ...prev,
        image: error.message || "Failed to upload image. Please try again.",
      }));
      setImagePreview(null);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      image: formData.image.trim(),
    };

    await onSubmit(productData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Product Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
            errors.name
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-300"
          } ${isSubmitting ? "bg-slate-100 cursor-not-allowed" : ""}`}
          placeholder="Enter product name"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={isSubmitting}
          rows={4}
          className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none ${
            errors.description
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-300"
          } ${isSubmitting ? "bg-slate-100 cursor-not-allowed" : ""}`}
          placeholder="Enter product description"
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.description}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Price *
        </label>
        <div className="relative">
          <span className="absolute left-4 top-3.5 text-slate-500 font-semibold">
            $
          </span>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            disabled={isSubmitting}
            step="0.01"
            min="0"
            className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-mono ${
              errors.price
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-300"
            } ${isSubmitting ? "bg-slate-100 cursor-not-allowed" : ""}`}
            placeholder="0.00"
          />
        </div>
        {errors.price && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.price}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Product Image *
        </label>

        {imagePreview && (
          <div className="mb-4 relative">
            <img
              src={imagePreview}
              alt="Product preview"
              className="w-full h-64 object-cover rounded-xl border-2 border-slate-200"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={isSubmitting || isUploadingImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            id="image"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleImageUpload}
            disabled={isSubmitting || isUploadingImage}
            className="hidden"
          />
          <label
            htmlFor="image"
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-dashed rounded-xl cursor-pointer transition-all ${
              errors.image
                ? "border-red-500"
                : "border-slate-300 hover:border-primary-500"
            } ${
              isSubmitting || isUploadingImage
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isUploadingImage ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="text-slate-600 font-medium">Uploading...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-6 h-6 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-slate-600 font-medium">
                  {imagePreview ? "Change Image" : "Upload Image"}
                </span>
              </>
            )}
          </label>
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Supported formats: JPEG, PNG, GIF, WebP (Max 32MB)
        </p>

        {errors.image && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.image}
          </p>
        )}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting || isUploadingImage}
          className={`w-full bg-gradient-to-r from-primary-600 to-accent-purple text-white px-6 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
            isSubmitting || isUploadingImage
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Adding Product...
            </>
          ) : (
            <>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Product
            </>
          )}
        </button>
      </div>
    </form>
  );
}

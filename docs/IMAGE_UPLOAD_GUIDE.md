# Image Upload Guide - Nova Marketplace

## ✅ Setup Complete

Image hosting is now integrated using **imgbb.com** with your API key.

## 🎯 Features

- **Drag & Drop Upload**: Users can upload images directly from their device
- **Image Preview**: See the uploaded image before submitting the form
- **Automatic Hosting**: Images are automatically uploaded to imgbb.com
- **Validation**: File type and size validation (max 32MB)
- **Supported Formats**: JPEG, PNG, GIF, WebP
- **Modern UI**: Beautiful upload interface matching the app design

## 🔧 Configuration

### Environment Variable

```env
NEXT_PUBLIC_IMAGE_HOST_KEY=5fbe3b269af220ef9639c781bec38e5b
```

This is already configured in your `.env.local` file.

## 📝 How It Works

### 1. User Flow

1. Navigate to `/items/add` (Add Product page)
2. Fill in product details (name, description, price)
3. Click "Upload Image" button
4. Select an image file from their device
5. Image is automatically uploaded to imgbb.com
6. Preview appears with option to change/remove
7. Submit form with the hosted image URL

### 2. Technical Flow

```
User selects file
    ↓
Validate file type & size
    ↓
Create local preview
    ↓
Upload to imgbb.com API
    ↓
Receive hosted URL
    ↓
Store URL in form data
    ↓
Submit product with image URL
```

## 🎨 UI Components

### Upload Button

- Dashed border design
- Hover effects
- Loading state with spinner
- Disabled state during upload

### Image Preview

- Full-width preview (264px height)
- Rounded corners matching app design
- Remove button (top-right corner)
- Smooth transitions

### Error Handling

- File type validation
- File size validation (32MB max)
- Network error handling
- User-friendly error messages

## 📚 API Reference

### uploadImage(file)

Uploads an image file to imgbb.com

**Parameters:**

- `file` (File): Image file to upload

**Returns:**

- `Promise<string>`: URL of the uploaded image

**Throws:**

- Error if file type is invalid
- Error if file size exceeds 32MB
- Error if upload fails

**Example:**

```javascript
import { uploadImage } from "@/lib/imageUpload";

const file = event.target.files[0];
const imageUrl = await uploadImage(file);
console.log("Uploaded image URL:", imageUrl);
```

## 🔍 File Structure

```
nova-market/
├── src/
│   ├── lib/
│   │   └── imageUpload.js          # Image upload utility
│   └── components/
│       └── products/
│           └── ProductForm.js      # Form with image upload
└── .env.local                      # Environment variables
```

## 🐛 Troubleshooting

### Upload fails with "Invalid file type"

**Solution:** Only JPEG, PNG, GIF, and WebP images are supported. Convert your image to one of these formats.

### Upload fails with "File size too large"

**Solution:** The maximum file size is 32MB. Compress your image or use a smaller file.

### Upload button not working

**Solution:**

1. Check that `NEXT_PUBLIC_IMAGE_HOST_KEY` is set in `.env.local`
2. Restart the Next.js dev server
3. Check browser console for errors

### Image preview not showing

**Solution:**

1. Ensure the file is a valid image format
2. Check browser console for errors
3. Try a different image file

## 🌐 imgbb.com Details

- **Service**: Free image hosting
- **Max File Size**: 32MB
- **Supported Formats**: JPEG, PNG, GIF, WebP, BMP
- **API Endpoint**: `https://api.imgbb.com/1/upload`
- **Rate Limits**: Check imgbb.com documentation for current limits

## 🚀 Testing

### Test the Upload Feature:

1. Start the application: `npm run dev`
2. Navigate to: http://localhost:3000/items/add
3. Fill in product details
4. Click "Upload Image"
5. Select an image file
6. Wait for upload (spinner will show)
7. Preview should appear
8. Submit the form

### Expected Behavior:

- ✅ File validation before upload
- ✅ Loading spinner during upload
- ✅ Image preview after successful upload
- ✅ Ability to remove and re-upload
- ✅ Form submission with hosted image URL
- ✅ Product appears in listing with uploaded image

## 📊 Benefits

1. **No Server Storage**: Images are hosted externally
2. **Fast CDN**: imgbb provides fast image delivery
3. **Reliable**: Professional image hosting service
4. **Free**: No cost for basic usage
5. **Easy Integration**: Simple API
6. **Automatic Optimization**: imgbb handles image optimization

## 🔐 Security

- File type validation prevents malicious uploads
- File size limits prevent abuse
- API key is stored in environment variables
- Client-side validation before upload
- Server-side validation by imgbb

## 📈 Future Enhancements

Potential improvements:

- Multiple image upload
- Image cropping/editing
- Drag & drop zone
- Progress bar for large files
- Image compression before upload
- Alternative image hosts (Cloudinary, AWS S3)

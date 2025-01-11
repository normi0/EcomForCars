import { v2 as cloudinary } from 'cloudinary'

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.VUE_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VUE_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.VUE_APP_CLOUDINARY_API_SECRET,
})

/**
 * Uploads an image to Cloudinary
 * @param {File} file - The image file to upload
 * @param {string} publicId - Optional public ID for the image
 * @returns {Promise<Object>} - The upload result
 */
export const uploadImage = async (file, publicId = '') => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET) // Replace with your upload preset

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.VUE_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    )

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    return await response.json()
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

/**
 * Generates an optimized image URL
 * @param {string} publicId - The public ID of the image
 * @param {Object} options - Transformation options
 * @returns {string} - The optimized image URL
 */
export const getOptimizedImageUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: 'auto',
    ...options,
  })
}

/**
 * Generates a transformed image URL (e.g., auto-crop)
 * @param {string} publicId - The public ID of the image
 * @param {Object} options - Transformation options
 * @returns {string} - The transformed image URL
 */
export const getTransformedImageUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, {
    crop: 'auto',
    gravity: 'auto',
    width: 500,
    height: 500,
    ...options,
  })
}

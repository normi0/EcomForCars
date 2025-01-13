/**
 * Uploads an image to Cloudinary
 * @param {File} file - The image file to upload
 * @param {string} uploadPreset - The upload preset to use
 * @returns {Promise<Object>} - The upload result
 */
export const uploadImage = async (file, uploadPreset) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset) // Use the provided upload preset

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
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
  return `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}?${new URLSearchParams(
    {
      fetch_format: 'auto',
      quality: 'auto',
      ...options,
    },
  ).toString()}`
}

/**
 * Generates a transformed image URL (e.g., auto-crop)
 * @param {string} publicId - The public ID of the image
 * @param {Object} options - Transformation options
 * @returns {string} - The transformed image URL
 */
export const getTransformedImageUrl = (publicId, options = {}) => {
  return `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}?${new URLSearchParams(
    {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
      ...options,
    },
  ).toString()}`
}

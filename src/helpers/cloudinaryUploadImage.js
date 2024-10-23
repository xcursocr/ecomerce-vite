const urlCloudinary = `${import.meta.env.VITE_URL_CLOUDINARY}/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`

export const uploadImageCloudinary = async (image) => {

  const formData = new FormData()
  formData.append('file', image)
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET_NAME)

  const resp = await fetch(urlCloudinary, {
    method: "POST",
    body: formData
  })

  return resp.json()

}
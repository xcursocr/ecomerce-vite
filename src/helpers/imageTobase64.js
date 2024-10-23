export const imageToBase64 = async (image, maxWidth = 800, maxHeight = 800) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const img = await new Promise((resolve) => {
    const imgElement = new Image()
    imgElement.src = URL.createObjectURL(image)
    imgElement.onload = () => resolve(imgElement)
  })

  // Calcular las dimensiones manteniendo la relación de aspecto
  let width = img.width
  let height = img.height

  if (width > height) {
    if (width > maxWidth) {
      height *= maxWidth / width
      width = maxWidth
    }
  } else {
    if (height > maxHeight) {
      width *= maxHeight / height
      height = maxHeight
    }
  }

  canvas.width = width
  canvas.height = height
  ctx.drawImage(img, 0, 0, width, height)

  // Convertir a base64, puedes ajustar la calidad de la compresión aquí
  const dataUrl = canvas.toDataURL('image/jpeg', 0.7)
  return dataUrl
}





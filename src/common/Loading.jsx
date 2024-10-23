
export const LoadingDots = () => {
  return (
    // <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
    <div className='flex space-x-2 justify-center items-center bg-transparent h-screen dark:invert'>
      <span className='sr-only'>Loading...</span>
      <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
    </div>
  )
}

export const LoadingSpiner = () => {
  return (
    <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
  )
}

export const LoadingOvelShaped = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
        </div>
      </div>
    </div>
  )
}
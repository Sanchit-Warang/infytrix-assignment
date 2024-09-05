import { ScaleLoader } from 'react-spinners'
const Loader = () => {
  return (
    <div className="w-full flex justify-center">
      <ScaleLoader
        color={'hsl(var(--primary))'}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Loader

import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-28 text-center max-w-md mx-auto space-y-4">
      <span className="text-6xl font-light text-[#777B60] font-mono">404</span>
      <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#20211E]">Page Not Found</h1>
      <p className="font-sans text-sm text-[#53554D] leading-relaxed font-light">
        The requested spatial reference does not exist or has been relocated within the studio archive.
      </p>
      <Link to="/" className="pt-4">
        <Button variant="primary" size="md">
          Return to Studio Home
        </Button>
      </Link>
    </div>
  )
}

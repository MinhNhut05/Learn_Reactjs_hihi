// ============================================
// UI Component: ErrorMessage
// ============================================

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="text-4xl mb-3">😕</div>
      <p className="text-red-600 font-medium mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium
                     hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

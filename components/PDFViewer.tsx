import { FiX } from 'react-icons/fi';

type PDFViewerProps = {
  url: string; // URL del archivo PDF
  onClose: () => void;
  title?: string;
};

export default function PDFViewer({ url, onClose, title }: PDFViewerProps) {
  const googleDriveViewerUrl = `${url}/preview`; // Construir la URL del Google Drive Viewer

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="h-full max-w-6xl mx-auto px-4 py-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-white truncate">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* PDF Viewer */}
        <iframe
          src={googleDriveViewerUrl}
          width="100%"
          height="600px"
          className="rounded-lg"
          allow="autoplay"
          title={title}
        />
      </div>
    </div>
  );
}
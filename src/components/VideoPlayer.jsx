import { useState, useRef, useEffect } from 'react';
import { X, CheckCircle, Lock } from 'lucide-react';

// Fallback URLs if primary fails (e.g. CORS on deployed domain)
const FALLBACK_VIDEO_URLS = [
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
];

const VideoPlayer = ({ assignment, onComplete, onBack }) => {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);
  const [canComplete, setCanComplete] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(assignment?.module?.videoUrl || '');
  const [fallbackIndex, setFallbackIndex] = useState(0);

  const completionThreshold = 0.3; // 30%

  useEffect(() => {
    setCurrentVideoUrl(assignment?.module?.videoUrl || '');
    setFallbackIndex(0);
    setError(null);
  }, [assignment?.module?.videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration && video.duration > 0) {
        const currentProgress = video.currentTime / video.duration;
        setProgress(currentProgress);
        setCanComplete(currentProgress >= completionThreshold);
      } else if (duration > 0) {
        const currentProgress = video.currentTime / duration;
        setProgress(currentProgress);
        setCanComplete(currentProgress >= completionThreshold);
      }
    };

    const handleLoadedMetadata = () => {
      if (video.duration && video.duration > 0) {
        setDuration(video.duration);
      }
    };

    const handleLoadedData = () => {
      if (video.duration && video.duration > 0 && !duration) {
        setDuration(video.duration);
      }
    };

    const handleError = () => {
      // Error state and fallback are handled by the video's onError below
    };

    const handleCanPlay = () => {
      if (video.duration && video.duration > 0 && !duration) {
        setDuration(video.duration);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Try to load video metadata
    if (video.readyState >= 1) {
      setDuration(video.duration);
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [duration, completionThreshold, fallbackIndex]);

  const handleComplete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (canComplete && assignment?.moduleId) {
      console.log('Completing assignment:', assignment.moduleId);
      onComplete(assignment.moduleId);
    } else {
      console.log('Cannot complete:', { canComplete, moduleId: assignment?.moduleId });
    }
  };

  const progressPercentage = Math.round(progress * 100);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">{assignment.module.title}</h3>
          <button
            onClick={onBack}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Video Container */}
        <div className="bg-black flex-1 min-h-0 flex items-center justify-center p-4">
          {error ? (
            <div className="text-center text-white p-8">
              <p className="text-lg mb-2">⚠️ Video Error</p>
              <p className="text-slate-300">{error}</p>
              <button
                onClick={onBack}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Go Back
              </button>
            </div>
          ) : (
            <video
              key={currentVideoUrl}
              ref={videoRef}
              src={currentVideoUrl}
              controls
              playsInline
              className="w-full h-full max-h-full object-contain"
              onError={() => {
                if (fallbackIndex < FALLBACK_VIDEO_URLS.length) {
                  setError(null);
                  setCurrentVideoUrl(FALLBACK_VIDEO_URLS[fallbackIndex]);
                  setFallbackIndex((i) => i + 1);
                } else {
                  setError('Video failed to load. Try again or use a different browser.');
                }
              }}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-100 p-4">
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-slate-700">Progress</span>
              <span className="text-sm text-slate-600">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-slate-300 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {canComplete ? (
              <span className="text-green-600 font-medium">
                ✓ You can now mark this as complete
              </span>
            ) : (
              <span>
                Watch at least {Math.round(completionThreshold * 100)}% to complete ({progressPercentage}% watched)
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-slate-50 p-4 flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Back to Home
          </button>
          <button
            onClick={handleComplete}
            disabled={!canComplete}
            type="button"
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              canComplete
                ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
            aria-label={canComplete ? 'Mark as complete' : 'Complete button locked'}
          >
            {canComplete ? (
              <>
                <CheckCircle size={20} />
                Mark as Complete
              </>
            ) : (
              <>
                <Lock size={20} />
                Locked ({progressPercentage}%)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

import { useState } from 'react';
import { Award, Clock, CheckCircle, Home } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

const ParaApp = ({ user, assignments, onCompleteAssignment }) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const todayAssignments = assignments.filter(a => a.status === 'pending');

  const handleAssignmentClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleVideoComplete = (moduleId) => {
    onCompleteAssignment(user.id, moduleId);
    setSelectedAssignment(null);
  };

  const handleBackToHome = () => {
    setSelectedAssignment(null);
  };

  if (selectedAssignment) {
    return (
      <VideoPlayer
        assignment={selectedAssignment}
        onComplete={handleVideoComplete}
        onBack={handleBackToHome}
      />
    );
  }

  return (
    <div className="flex justify-center">
      {/* Mobile Container */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-slate-300">
        {/* Mobile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">ParaPro Training</h2>
            <Home size={24} />
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-3">
              <Award size={24} />
            </div>
            <div>
              <p className="text-sm opacity-90">Level {user.level}</p>
              <p className="text-2xl font-bold">{user.xp} XP</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-slate-50 min-h-[600px]">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Today's Assignments</h3>
          
          {todayAssignments.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
              <p className="text-slate-600">No pending assignments!</p>
              <p className="text-sm text-slate-500 mt-2">Great job staying on top of your training.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayAssignments.map(assignment => (
                <button
                  key={`${assignment.userId}-${assignment.moduleId}`}
                  onClick={() => handleAssignmentClick(assignment)}
                  className="w-full bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-left border border-slate-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 mb-1">
                        {assignment.module.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="bg-slate-100 px-2 py-0.5 rounded">
                          {assignment.module.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Award size={14} className="text-yellow-500" />
                          {assignment.module.xp} XP
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-600">
                      <Clock size={20} />
                      <span className="text-sm font-medium">Pending</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Completed Assignments Section */}
          {assignments.filter(a => a.status === 'completed').length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Completed</h3>
              <div className="space-y-2">
                {assignments
                  .filter(a => a.status === 'completed')
                  .map(assignment => (
                    <div
                      key={`${assignment.userId}-${assignment.moduleId}`}
                      className="bg-white rounded-lg p-4 border border-green-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-800">
                            {assignment.module.title}
                          </h4>
                          <p className="text-sm text-slate-600">
                            Completed {new Date(assignment.completedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <CheckCircle size={24} className="text-green-500" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParaApp;

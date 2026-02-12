import { useState } from 'react';
import { Shield, Brain, Heart, User, Award, CheckCircle, Clock, Share2, Plus, Trash2, X } from 'lucide-react';
import { modules } from '../../data';

const iconMap = {
  Shield,
  Brain,
  Heart,
};

const TeacherDashboard = ({ users, modules, assignments, onAssignModule, onAddUser, onDeleteUser }) => {
  const [copied, setCopied] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [userToDelete, setUserToDelete] = useState(null);

  const handleShare = () => {
    const url = 'https://parapro-onboarding.example.com/prototype';
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getAssignmentStatus = (userId, moduleId) => {
    const assignment = assignments.find(
      a => a.userId === userId && a.moduleId === moduleId
    );
    return assignment ? assignment.status : null;
  };

  const getModuleIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || Shield;
    return IconComponent;
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUserName.trim()) {
      onAddUser(newUserName.trim());
      setNewUserName('');
      setShowAddForm(false);
    }
  };

  const handleDeleteClick = (userId, userName) => {
    setUserToDelete({ id: userId, name: userName });
  };

  const confirmDelete = () => {
    if (userToDelete) {
      onDeleteUser(userToDelete.id);
      setUserToDelete(null);
    }
  };

  const getAssignmentCount = (userId) => {
    return assignments.filter(a => a.userId === userId).length;
  };

  return (
    <div className="space-y-8">
      {/* Header with Share Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Teacher Dashboard</h2>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Share2 size={20} />
          {copied ? 'Copied!' : 'Share Prototype'}
        </button>
      </div>

      {/* Paraprofessionals Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
            <User className="text-blue-600" size={24} />
            Paraprofessionals
          </h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add Paraprofessional
          </button>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <User size={48} className="mx-auto mb-4 text-slate-300" />
            <p>No paraprofessionals yet. Add one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => {
              const assignmentCount = getAssignmentCount(user.id);
              return (
                <div
                  key={user.id}
                  className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow relative group"
                >
                  <button
                    onClick={() => handleDeleteClick(user.id, user.name)}
                    className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete paraprofessional"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-slate-800 pr-8">{user.name}</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Level {user.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Award size={16} className="text-yellow-500" />
                    <span className="text-sm">{user.xp} XP</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <p className="text-xs text-slate-500">
                      {assignmentCount} {assignmentCount === 1 ? 'assignment' : 'assignments'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Add User Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-slate-800">Add New Paraprofessional</h3>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewUserName('');
                }}
                className="p-1 hover:bg-slate-100 rounded transition-colors"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>
            <form onSubmit={handleAddUser}>
              <div className="mb-4">
                <label htmlFor="userName" className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="userName"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Enter paraprofessional name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewUserName('');
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newUserName.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  Add Paraprofessional
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Delete Paraprofessional</h3>
                <p className="text-slate-600">
                  Are you sure you want to delete <strong>{userToDelete.name}</strong>?
                </p>
                {getAssignmentCount(userToDelete.id) > 0 && (
                  <p className="text-sm text-amber-600 mt-2">
                    This will also remove {getAssignmentCount(userToDelete.id)} associated assignment(s).
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setUserToDelete(null)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Training Modules Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-slate-800 mb-4">Training Modules</h3>
        <div className="space-y-4">
          {modules.map(module => {
            const IconComponent = getModuleIcon(module.icon);
            return (
              <div
                key={module.id}
                className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{module.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                          {module.category}
                        </span>
                        <span className="text-xs text-slate-600">
                          {module.xp} XP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assignment Section */}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-sm font-medium text-slate-700 mb-2">Assign to:</p>
                  <div className="flex flex-wrap gap-2">
                    {users.map(user => {
                      const status = getAssignmentStatus(user.id, module.id);
                      return (
                        <button
                          key={user.id}
                          onClick={() => onAssignModule(user.id, module.id)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 ${
                            status === 'completed'
                              ? 'bg-green-100 text-green-800 cursor-not-allowed'
                              : status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800 cursor-not-allowed'
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }`}
                          disabled={status !== null}
                        >
                          {status === 'completed' && <CheckCircle size={14} />}
                          {status === 'pending' && <Clock size={14} />}
                          {user.name}
                          {status && (
                            <span className="ml-1 text-xs">
                              ({status === 'completed' ? 'Completed' : 'Pending'})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default TeacherDashboard;

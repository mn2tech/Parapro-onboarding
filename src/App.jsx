import { useState } from 'react';
import { users as initialUsers, modules } from '../data';
import TeacherDashboard from './components/TeacherDashboard';
import ParaApp from './components/ParaApp';

function App() {
  const [view, setView] = useState('teacher'); // 'teacher' or 'para'
  const [users, setUsers] = useState(initialUsers);
  const [assignments, setAssignments] = useState([]); // Array of { userId, moduleId, status: 'pending' | 'completed' }
  const [selectedParaId, setSelectedParaId] = useState(initialUsers.length > 0 ? initialUsers[0].id : null); // For Para view

  // Assign a module to a user
  const assignModule = (userId, moduleId) => {
    const existingAssignment = assignments.find(
      a => a.userId === userId && a.moduleId === moduleId
    );
    
    if (!existingAssignment) {
      setAssignments([...assignments, {
        userId,
        moduleId,
        status: 'pending',
        assignedAt: new Date().toISOString()
      }]);
    }
  };

  // Complete an assignment and award XP
  const completeAssignment = (userId, moduleId) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;

    // Update assignment status
    setAssignments(assignments.map(a => 
      a.userId === userId && a.moduleId === moduleId
        ? { ...a, status: 'completed', completedAt: new Date().toISOString() }
        : a
    ));

    // Award XP and update user level
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newXp = user.xp + module.xp;
        const newLevel = Math.floor(newXp / 100) + 1;
        return { ...user, xp: newXp, level: newLevel };
      }
      return user;
    }));
  };

  // Get assignments for a specific user
  const getUserAssignments = (userId) => {
    return assignments
      .filter(a => a.userId === userId)
      .map(a => ({
        ...a,
        module: modules.find(m => m.id === a.moduleId)
      }))
      .filter(a => a.module); // Filter out any assignments with invalid modules
  };

  // Add a new paraprofessional
  const addUser = (name) => {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = {
      id: newId,
      name,
      role: "Paraprofessional",
      xp: 0,
      level: 1
    };
    setUsers([...users, newUser]);
    // Auto-select the new user in Para view
    setSelectedParaId(newId);
  };

  // Delete a paraprofessional
  const deleteUser = (userId) => {
    // Remove the user
    const remainingUsers = users.filter(u => u.id !== userId);
    setUsers(remainingUsers);
    
    // Remove all assignments for this user
    setAssignments(assignments.filter(a => a.userId !== userId));
    
    // If the deleted user was selected, switch to the first available user
    if (selectedParaId === userId) {
      if (remainingUsers.length > 0) {
        setSelectedParaId(remainingUsers[0].id);
      } else {
        setSelectedParaId(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header with View Toggle */}
      <header className="bg-slate-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ParaPro Onboarding</h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setView('teacher')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'teacher'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Teacher View
            </button>
            <button
              onClick={() => setView('para')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'para'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Para View
            </button>
            {view === 'para' && users.length > 0 && (
              <select
                value={selectedParaId || users[0]?.id || ''}
                onChange={(e) => setSelectedParaId(Number(e.target.value))}
                className="px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600"
              >
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {view === 'teacher' ? (
          <TeacherDashboard
            users={users}
            modules={modules}
            assignments={assignments}
            onAssignModule={assignModule}
            onAddUser={addUser}
            onDeleteUser={deleteUser}
          />
        ) : users.length > 0 ? (
          <ParaApp
            user={users.find(u => u.id === selectedParaId) || users[0]}
            assignments={getUserAssignments(selectedParaId || users[0]?.id)}
            onCompleteAssignment={completeAssignment}
          />
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <p className="text-slate-600 mb-4">No paraprofessionals available.</p>
              <p className="text-sm text-slate-500">Switch to Teacher View to add paraprofessionals.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import { users as initialUsers, modules } from '../data';
import TeacherDashboard from './components/TeacherDashboard';
import ParaApp from './components/ParaApp';

const STORAGE_KEY = 'parapro-onboarding:state:v1';

function loadPersistedState() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

function persistState(state) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // If storage is full or blocked, fail silently (app should still work).
  }
}

function App() {
  const persisted = loadPersistedState();
  const persistedUsers = Array.isArray(persisted?.users) ? persisted.users : null;

  const [view, setView] = useState(persisted?.view === 'para' ? 'para' : 'teacher'); // 'teacher' or 'para'
  const [users, setUsers] = useState(persistedUsers?.length ? persistedUsers : initialUsers);
  const [assignments, setAssignments] = useState(
    Array.isArray(persisted?.assignments) ? persisted.assignments : []
  ); // Array of { userId, moduleId, status: 'pending' | 'completed' }
  const [selectedParaId, setSelectedParaId] = useState(() => {
    const baseUsers = persistedUsers?.length ? persistedUsers : initialUsers;
    const candidate = typeof persisted?.selectedParaId === 'number' ? persisted.selectedParaId : null;
    if (candidate !== null && baseUsers.some(u => u.id === candidate)) return candidate;
    return baseUsers.length > 0 ? baseUsers[0].id : null;
  }); // For Para view

  // Persist key app state so refresh doesn't wipe changes.
  useEffect(() => {
    persistState({ view, users, assignments, selectedParaId });
  }, [view, users, assignments, selectedParaId]);

  // If current selection is deleted, fall back to first available user.
  useEffect(() => {
    if (selectedParaId === null) return;
    if (!users.some(u => u.id === selectedParaId)) {
      setSelectedParaId(users.length > 0 ? users[0].id : null);
    }
  }, [users, selectedParaId]);

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

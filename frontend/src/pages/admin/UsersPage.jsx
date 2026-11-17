import { useState } from 'react';
import NavBar from '../../components/navbars/NavBar';
import { useAuth } from '../../context/AuthContext';
import AddUserModal from '../../components/Popups/AddUserPopup';
import { mockUsersList } from '../../data/MockDB';

const AVAILABLE_ROLES = ['Játékos', 'Edző', 'Admin'];

export default function AdminUsers() {
  const { currentUser } = useAuth();

  const [users, setUsers] = useState(mockUsersList);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('Összes');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  //Userek szűrése
  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.role.toLowerCase().includes(q) ||
      user.team.toLowerCase().includes(q);

    const matchesRole = roleFilter === 'Összes' || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  //Add user handler
  const handleAddUser = (newUser) => {
    setUsers((prev) => [newUser, ...prev]);
    //Majd egy API call
  };

  //Role módosítás handler
  const handleRoleChange = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
    );
    //Majd egy API call
  };

  //User törlés handler
  const handleRemoveUser = (userId, userName) => {
    if (!window.confirm(`Biztosan törölni szeretnéd ${userName} fiókját?`)) return;
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    //Majd egy API call
  };

  //Role-ok style
  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-[#B9975B] border-(--border-subtle)';
      case 'Edző':
        return 'bg-[#027223] border-(--border-subtle)';
      default:
        return 'bg-(--bg-page)/80 border-(--border-subtle)';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-(--bg-page)/80 text-(--text-main) font-futura">
      <NavBar userName={currentUser.name} role={currentUser.role}/>

      {/*Add user popup*/}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={handleAddUser}
      />

      <div className="flex-1 p-4 sm:p-6 max-w-6xl w-full mx-auto flex flex-col gap-6">
        
        {/*Header*/}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-(--border-subtle) pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-(--text-main) uppercase tracking-wider">
              Felhasználók Kezelése
            </h1>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#027223] hover:bg-[#025a1c] text-(--text-main) font-bold text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shrink-0"
          >
            + Új felhasználó
          </button>
        </div>

        {/*Search bar*/}
        <div className="bg-(--bg-card)/90 border border-(--border-subtle) rounded-xl p-4 backdrop-blur-md flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Keresés név, e-mail cím, csapat vagy szerepkör alapján..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-(--bg-page)/80 border border-(--border-subtle) rounded-xl px-4 py-2.5 text-sm text-(--text-main) placeholder-slate-500 focus:outline-none focus:border-[#B9975B]"
          />

          {/*Role filterek*/}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {['Összes', ...AVAILABLE_ROLES].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all cursor-pointer shrink-0 ${
                  roleFilter === role
                    ? 'bg-[#B9975B] border-[#B9975B]'
                    : 'bg-(--bg-page)/80 text-(--text-muted) border-(--border-subtle) hover:border-[#B9975B]/60'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/*Userek listája*/}
        <div className="bg-(--bg-card)/90 border border-(--border-subtle) rounded-xl backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-(--border-subtle) bg-(--bg-page)/80 text-sm uppercase tracking-wider text-[#B9975B]">
                  <th className="p-4 font-extrabold">Név</th>
                  <th className="p-4 font-extrabold">E-mail cím</th>
                  <th className="p-4 font-extrabold">Csapat</th>
                  <th className="p-4 font-extrabold">Szerepkör</th>
                  <th className="p-4 font-extrabold text-right">Műveletek</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/15 text-sm">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-white/5 transition-colors"
                    >
                     
                      <td className="p-4 font-bold">
                        {user.name}
                      </td>

                      <td className="p-4 text-(--text-muted)">
                        {user.email}
                      </td>

                      <td className="p-4">
                        <span className="bg-(--bg-page)/80 px-3 py-1.5 border border-(--border-subtle) text-sm font-semibold rounded-xl">
                          {user.team}
                        </span>
                      </td>

                      <td className="p-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className={`text-sm font-extrabold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer transition-all ${getRoleBadgeStyle(user.role)}`}
                        >
                          {AVAILABLE_ROLES.map((roles) => (
                            <option key={roles} value={roles} className="bg-(--bg-page)/80">
                              {roles}
                            </option>
                          ))}
                        </select>
                      </td>
                      
                      {/*Delete*/}
                      <td className="p-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleRemoveUser(user.id, user.name)}
                          className="bg-red-500/80 hover:bg-red-600 text-(--text-main) font-bold text-sm px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                        >
                          Törlés
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-(--text-muted) italic text-sm">
                      Nincs a keresési feltételeknek megfelelő felhasználó.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
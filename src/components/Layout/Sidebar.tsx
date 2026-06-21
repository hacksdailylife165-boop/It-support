import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Ticket,
  Users,
  Building2,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/dashboard',
      roles: ['SUPER_ADMIN', 'IT_STAFF', 'BRANCH_STAFF'],
    },
    {
      icon: Ticket,
      label: 'Tickets',
      href: '/tickets',
      roles: ['SUPER_ADMIN', 'IT_STAFF', 'BRANCH_STAFF'],
    },
    {
      icon: Users,
      label: 'Users',
      href: '/users',
      roles: ['SUPER_ADMIN'],
    },
    {
      icon: Building2,
      label: 'Branches',
      href: '/branches',
      roles: ['SUPER_ADMIN'],
    },
    {
      icon: BarChart3,
      label: 'Reports',
      href: '/reports',
      roles: ['SUPER_ADMIN', 'IT_STAFF'],
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/settings',
      roles: ['SUPER_ADMIN'],
    },
  ];

  const visibleItems = menuItems.filter((item) =>
    item.roles.includes(user?.role || '')
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white transition-transform duration-300 transform lg:translate-x-0 lg:static z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h1 className="text-xl font-bold">IT Support</h1>
            <button onClick={onClose} className="lg:hidden">
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {visibleItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`
                  }
                  onClick={() => onClose()}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-800 p-4 space-y-2">
            <div className="px-4 py-2">
              <p className="text-sm text-gray-400">Logged in as</p>
              <p className="font-medium text-white truncate">{user?.full_name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

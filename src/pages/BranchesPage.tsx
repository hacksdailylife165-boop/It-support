import React from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Branch } from '@/types';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const BranchesPage: React.FC = () => {
  const { data: branches = [], isLoading } = useQuery({
    queryKey: ['branches'],
    queryFn: async () => {
      const { data } = await supabase
        .from('branches')
        .select('*')
        .order('created_at', { ascending: false });
      return data || [];
    },
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Branches</h1>
            <p className="text-gray-600 mt-2">Manage organization branches</p>
          </div>
          <button className="mt-4 sm:mt-0 flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={20} />
            <span>Add Branch</span>
          </button>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-12 text-gray-600">
              Loading branches...
            </div>
          ) : branches.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-600">
              No branches found
            </div>
          ) : (
            branches.map((branch) => (
              <div
                key={branch.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {branch.branch_name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{branch.branch_code}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-600">Region</p>
                    <p className="text-gray-900 font-medium">{branch.region}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Manager</p>
                    <p className="text-gray-900 font-medium">{branch.manager_name}</p>
                  </div>
                  <div className="pt-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        branch.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {branch.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

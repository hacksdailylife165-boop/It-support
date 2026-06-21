import React, { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import { TicketForm } from '@/components/Tickets/TicketForm';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Ticket } from '@/types';

export const CreateTicketPage: React.FC = () => {
  const { user } = useAuth();
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await supabase
        .from('ticket_categories')
        .select('*')
        .eq('is_active', true);
      return data || [];
    },
  });

  const handleTicketCreated = (ticket: Ticket) => {
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <MainLayout>
      <div className="max-w-2xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Ticket</h1>
          <p className="text-gray-600 mt-2">
            Report an IT issue and get support from our team
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              ✓ Ticket created successfully!
            </p>
          </div>
        )}

        {/* Form */}
        <TicketForm
          categories={categories}
          onSubmit={handleTicketCreated}
        />
      </div>
    </MainLayout>
  );
};

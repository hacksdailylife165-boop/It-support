import { supabase } from '@/lib/supabase';
import type { DashboardStats } from '@/types';

export const dashboardService = {
  async getSuperAdminStats(): Promise<DashboardStats> {
    const [totalTickets, openTickets, assignedTickets, inProgressTickets, resolvedTickets, closedTickets, criticalTickets, activeEngineers] = await Promise.all([
      supabase.from('tickets').select('id', { count: 'exact' }),
      supabase.from('tickets').select('id', { count: 'exact' }).eq('status', 'OPEN'),
      supabase.from('tickets').select('id', { count: 'exact' }).eq('status', 'ASSIGNED'),
      supabase.from('tickets').select('id', { count: 'exact' }).eq('status', 'IN_PROGRESS'),
      supabase.from('tickets').select('id', { count: 'exact' }).eq('status', 'RESOLVED'),
      supabase.from('tickets').select('id', { count: 'exact' }).eq('status', 'CLOSED'),
      supabase.from('tickets').select('id', { count: 'exact' }).eq('priority', 'CRITICAL'),
      supabase.from('it_staff').select('id', { count: 'exact' }).eq('is_available', true),
    ]);

    return {
      total_tickets: totalTickets.count || 0,
      open_tickets: openTickets.count || 0,
      assigned_tickets: assignedTickets.count || 0,
      in_progress_tickets: inProgressTickets.count || 0,
      resolved_tickets: resolvedTickets.count || 0,
      closed_tickets: closedTickets.count || 0,
      critical_tickets: criticalTickets.count || 0,
      active_engineers: activeEngineers.count || 0,
    };
  },

  async getTicketsByBranch() {
    const { data, error } = await supabase
      .from('tickets')
      .select('branch_id, branches(branch_name)');
    
    if (error) throw error;
    
    const grouped = data.reduce((acc: any, ticket: any) => {
      const branchName = ticket.branches?.branch_name || 'Unknown';
      acc[branchName] = (acc[branchName] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(grouped).map(([name, count]) => ({
      name,
      value: count,
    }));
  },

  async getTicketsByCategory() {
    const { data, error } = await supabase
      .from('tickets')
      .select('category_id, ticket_categories(name)');
    
    if (error) throw error;
    
    const grouped = data.reduce((acc: any, ticket: any) => {
      const categoryName = ticket.ticket_categories?.name || 'Unknown';
      acc[categoryName] = (acc[categoryName] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(grouped).map(([name, count]) => ({
      name,
      value: count,
    }));
  },

  async getMonthlyTrends() {
    const { data, error } = await supabase
      .from('tickets')
      .select('created_at');
    
    if (error) throw error;
    
    const monthlyData = data.reduce((acc: any, ticket: any) => {
      const date = new Date(ticket.created_at);
      const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(monthlyData).map(([month, count]) => ({
      month,
      tickets: count,
    }));
  },
};

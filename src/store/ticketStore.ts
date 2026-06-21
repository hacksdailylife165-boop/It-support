import { create } from 'zustand';
import type { Ticket, TicketStatus, TicketPriority } from '@/types';

interface TicketFilters {
  status?: TicketStatus;
  priority?: TicketPriority;
  category?: string;
  branch?: string;
  assigned_to?: string;
  search?: string;
}

interface TicketStore {
  tickets: Ticket[];
  filters: TicketFilters;
  loading: boolean;
  setTickets: (tickets: Ticket[]) => void;
  setFilters: (filters: TicketFilters) => void;
  setLoading: (loading: boolean) => void;
  updateTicket: (ticket: Ticket) => void;
}

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: [],
  filters: {},
  loading: false,
  setTickets: (tickets) => set({ tickets }),
  setFilters: (filters) => set({ filters }),
  setLoading: (loading) => set({ loading }),
  updateTicket: (ticket) =>
    set((state) => ({
      tickets: state.tickets.map((t) => (t.id === ticket.id ? ticket : t)),
    })),
}));

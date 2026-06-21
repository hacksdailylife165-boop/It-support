import { useEffect, useState } from 'react';
import { useTicketStore } from '@/store/ticketStore';
import { ticketService } from '@/services/ticketService';
import type { Ticket } from '@/types';

export const useTickets = () => {
  const { tickets, setTickets, setLoading, loading } = useTicketStore();
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async (filters?: any) => {
    try {
      setLoading(true);
      setError(null);
      const data = await ticketService.getTickets(filters);
      setTickets(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (ticketData: Partial<Ticket>) => {
    try {
      setLoading(true);
      const newTicket = await ticketService.createTicket(ticketData);
      setTickets([newTicket, ...tickets]);
      return newTicket;
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTicket = async (id: string, updates: Partial<Ticket>) => {
    try {
      const updated = await ticketService.updateTicket(id, updates);
      setTickets(
        tickets.map((t) => (t.id === id ? updated : t))
      );
      return updated;
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  };

  return {
    tickets,
    loading,
    error,
    fetchTickets,
    createTicket,
    updateTicket,
  };
};

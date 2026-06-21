import React from 'react';
import { Ticket } from '@/types';
import { Calendar, User, AlertCircle, Tag } from 'lucide-react';
import { TICKET_STATUSES, TICKET_PRIORITIES } from '@/lib/constants';

interface TicketCardProps {
  ticket: Ticket;
  onClick: (ticket: Ticket) => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onClick }) => {
  const status = TICKET_STATUSES.find((s) => s.value === ticket.status);
  const priority = TICKET_PRIORITIES.find((p) => p.value === ticket.priority);

  return (
    <div
      onClick={() => onClick(ticket)}
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{ticket.ticket_number}</h3>
          <p className="text-sm text-gray-600 mt-1">{ticket.subject}</p>
        </div>
        <div
          className="px-2 py-1 rounded text-white text-xs font-medium"
          style={{ backgroundColor: priority?.color }}
        >
          {priority?.label}
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center space-x-2 text-gray-600">
          <Tag size={16} />
          <span
            className="px-2 py-1 rounded text-xs font-medium text-white"
            style={{ backgroundColor: status?.color }}
          >
            {status?.label}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar size={16} />
          <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

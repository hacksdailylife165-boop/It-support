import { supabase } from '@/lib/supabase';
import type { Ticket, TicketComment, TicketAttachment } from '@/types';

export const ticketService = {
  async createTicket(ticketData: Partial<Ticket>) {
    // Generate ticket number
    const ticketNumber = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const { data, error } = await supabase
      .from('tickets')
      .insert([
        {
          ...ticketData,
          ticket_number: ticketNumber,
        },
      ])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async getTickets(filters?: any) {
    let query = supabase.from('tickets').select('*');
    
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.priority) query = query.eq('priority', filters.priority);
    if (filters?.branch_id) query = query.eq('branch_id', filters.branch_id);
    if (filters?.assigned_to) query = query.eq('assigned_to_user_id', filters.assigned_to);
    
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getTicketById(id: string) {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async updateTicket(id: string, updates: Partial<Ticket>) {
    const { data, error } = await supabase
      .from('tickets')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async addComment(ticketId: string, userId: string, comment: string, isInternal: boolean = false) {
    const { data, error } = await supabase
      .from('ticket_comments')
      .insert([
        {
          ticket_id: ticketId,
          user_id: userId,
          comment_text: comment,
          is_internal: isInternal,
        },
      ])
      .select();
    if (error) throw error;
    return data[0];
  },

  async getTicketComments(ticketId: string) {
    const { data, error } = await supabase
      .from('ticket_comments')
      .select('*')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async uploadAttachment(file: File, ticketId: string, userId: string) {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `tickets/${ticketId}/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('ticket-attachments')
      .upload(filePath, file);
    
    if (uploadError) throw uploadError;
    
    const { data: attachmentData, error: insertError } = await supabase
      .from('ticket_attachments')
      .insert([
        {
          ticket_id: ticketId,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          file_type: file.type,
          uploaded_by_user_id: userId,
        },
      ])
      .select();
    
    if (insertError) throw insertError;
    return attachmentData[0];
  },

  async getTicketAttachments(ticketId: string) {
    const { data, error } = await supabase
      .from('ticket_attachments')
      .select('*')
      .eq('ticket_id', ticketId)
      .order('uploaded_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getAttachmentUrl(filePath: string) {
    const { data } = await supabase.storage
      .from('ticket-attachments')
      .getPublicUrl(filePath);
    return data.publicUrl;
  },
};

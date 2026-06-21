# IT Support Ticket Management System

## 🎯 Overview

A complete production-ready IT Support Ticket Management System built for multi-branch organizations. The system features role-based access control with three distinct user types: Super Admin, IT Support Staff, and Branch Staff.

## 🚀 Features

### Core Features
- **Multi-branch Support**: Manage tickets across multiple organization branches
- **Role-Based Access Control**: Super Admin, IT Staff, and Branch Staff roles with specific permissions
- **Ticket Management**: Create, assign, update, and resolve support tickets
- **Real-time Updates**: Live notification system for ticket changes
- **File Attachments**: Upload screenshots and documents for ticket resolution
- **Activity Logging**: Track all user actions and system activities
- **Export Functionality**: Export reports to PDF and Excel formats
- **Dark Mode**: Optional dark theme support
- **Mobile Responsive**: Fully responsive design for all devices

### Dashboard Features
- **Super Admin Dashboard**: System-wide analytics, ticket distribution, and performance metrics
- **IT Staff Dashboard**: Assigned tickets, pending queue, and resolution performance
- **Branch Staff Dashboard**: Personal tickets, complaint history, and status tracking

### Reporting & Analytics
- Tickets by branch and category
- Monthly trends and resolution performance
- Engineer availability and workload distribution
- Critical ticket tracking
- Export reports in PDF and Excel formats

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Backend Database**: Supabase (PostgreSQL)
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Form Handling**: React Hook Form
- **Routing**: React Router v6
- **Build Tool**: Vite

## 📋 User Roles

### Super Admin
- Full system access
- Create/Edit/Delete branches, users, and IT staff
- Assign tickets to engineers
- View comprehensive reports and analytics
- Manage ticket categories and priorities
- User activity and audit logs

### IT Support Staff
- View assigned tickets
- Accept and work on tickets
- Change ticket status
- Add resolution notes and screenshots
- Mark tickets as resolved
- View team statistics

### Branch Staff
- Create support tickets
- Track ticket status
- View complaint history
- Reply to IT team with updates
- Upload additional documentation

## 🗄️ Database Schema

### Tables
- **branches**: Organization branches
- **users**: System users with role-based access
- **it_staff**: IT support staff profiles and statistics
- **tickets**: Support tickets with full lifecycle
- **ticket_categories**: Predefined issue categories
- **ticket_attachments**: File uploads for tickets
- **ticket_comments**: Communication between users
- **activity_logs**: Audit trail of all actions
- **notifications**: Real-time notifications

## 🔐 Security Features

- Row Level Security (RLS) policies for data protection
- Secure authentication with Supabase Auth
- Role-based access control
- Activity audit logging
- File upload validation
- CSRF protection

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm/yarn
- Supabase account and project

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd it-support-ticket-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Initialize Supabase database**
   - Create a new Supabase project
   - Run the SQL schema from `supabase/schema.sql` in Supabase SQL editor
   - Run storage policies from `supabase/storage-policies.sql`

5. **Create storage buckets**
   - Create bucket: `ticket-attachments`
   - Create bucket: `resolution-screenshots`

6. **Start development server**
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📱 Default Credentials

**Super Admin Account**
- Email: `roshanzameerkhan02@gmail.com`
- Name: `Roshan Zameer Khan`
- Phone: `03063462822`
- Role: `Super Admin`

*Note: Set up password through Supabase Auth during initial setup*

## 🎨 UI/UX Design

- Clean, professional banking-style interface
- Inspired by Jira, ServiceDesk, and Freshservice
- Intuitive navigation with collapsible sidebar
- Dark mode support
- Responsive mobile design
- Accessibility-first approach

## 📊 Ticket Lifecycle

1. **Open** - Initial ticket creation
2. **Assigned** - Assigned to IT engineer
3. **In Progress** - Engineer working on resolution
4. **Waiting for User** - Awaiting user response
5. **Resolved** - Solution implemented
6. **Closed** - Ticket archived

## 🔔 Notifications

- Ticket created
- Ticket assigned
- Ticket updated
- Status changed
- Ticket resolved
- Ticket closed
- Comments added

## 📈 Future Enhancements

- [ ] Email notifications
- [ ] SMS notifications
- [ ] Knowledge base integration
- [ ] AI-powered ticket categorization
- [ ] Chatbot support
- [ ] Mobile app (React Native)
- [ ] Advanced scheduling
- [ ] SLA tracking
- [ ] Multi-language support

## 📞 Support

For issues or questions, please create an issue in the repository.

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for enterprise IT support teams**

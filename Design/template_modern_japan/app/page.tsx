import Invitation from '@/components/Invitation';
export default function Page() { return <Invitation connected={Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.INVITATION_TOKEN)} />; }

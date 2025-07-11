import { CommunicationsHub } from '../src/components/CommunicationsHub';
import { AuthForm } from '../src/components/Auth/AuthForm';
import { useAuth } from '../src/hooks/useAuth';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return <CommunicationsHub />;
}

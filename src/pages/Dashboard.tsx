import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import QRGenerator from '@/components/QRGenerator';
import { Button } from '@/components/ui/button';
import { QrCode, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-xl gradient-primary">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">QR Pro</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </nav>

      <div className="py-12 px-4">
        <QRGenerator />
      </div>
    </div>
  );
};

export default Dashboard;

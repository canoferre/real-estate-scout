import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRegister } from '@/lib/api';
import { Navbar } from '@/components/Navbar';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validacija
    if (password !== confirmPassword) {
      toast({
        title: "Napaka",
        description: "Gesli se ne ujemata",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Napaka",
        description: "Geslo mora imeti vsaj 6 znakov",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await apiRegister(email, password);
      toast({
        title: "Registracija uspešna",
        description: "Zdaj se lahko prijavite z vašim računom",
      });
      navigate('/prijava');
    } catch (error) {
      toast({
        title: "Napaka pri registraciji",
        description: error instanceof Error ? error.message : "Prišlo je do napake",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background flex items-center justify-center pt-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-green-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Registracija</h1>
              <p className="text-muted-foreground mt-2">
                Ustvarite svoj račun za dostop do Skavta
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">E-poštni naslov</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vas@email.si"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Geslo</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Vsaj 6 znakov"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Potrditev gesla</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Ponovite geslo"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Registriram...
                  </>
                ) : (
                  'Ustvari račun'
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Že imate račun?{' '}
                <Link 
                  to="/prijava" 
                  className="text-accent hover:text-accent/80 font-medium transition-colors"
                >
                  Prijavite se
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

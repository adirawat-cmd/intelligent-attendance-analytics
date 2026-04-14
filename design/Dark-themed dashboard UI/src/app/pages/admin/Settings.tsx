import { Navbar } from '../../components/Navbar';

export function Settings() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Settings" userName="Administrator" />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <h2 className="text-foreground mb-2">Settings</h2>
            <p className="text-muted-foreground">
              System settings and configurations will be available here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

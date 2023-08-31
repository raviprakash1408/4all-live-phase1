import LiveFeed from '@/components/livefeedsform';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <LiveFeed />
      <div>{children}</div>
    </div>
  );
}

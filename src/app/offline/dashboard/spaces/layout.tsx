import { ListAndGrid } from '@/components/space';

const SpaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <ListAndGrid />
      {children}
    </section>
  );
};

export default SpaceLayout;

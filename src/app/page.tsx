import Link from 'next/link';

import { CurvedButton } from '@/components/button/curvedButton';

const Index = () => {
  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center text-font-color">
        <div>4 All.Live DashBoard</div>
        <div>
          <Link href="/dashboard/events/">
            <div className="relative mt-2 w-[173px] cursor-pointer">
              <CurvedButton
                backgroundColor="bg-tertiary-color"
                height="min-[400px]:h-12 min-[1600px]:h-12"
              >
                <span className=" text-base text-font-color">
                  {' '}
                  Go to dashboard
                </span>
              </CurvedButton>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;

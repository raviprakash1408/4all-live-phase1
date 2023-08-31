import ImageTextButtonPanel from '@/components/ImageTextButtonPanel';

const Index = () => {
  return (
    <div className=" flex h-screen items-center justify-center">
      <div className="flex flex-row justify-center">
        <div className="mr-4">
          <ImageTextButtonPanel
            img="/assets/logo/Group 770.png"
            content1="Online"
            content2="Link to Meetmo.io"
            content3="Link"
            imgheight={64}
            imgwidth={240}
          />
        </div>
        <div className="mx-4 border-2 border-tertiary-color" />{' '}
        {/* Vertical line */}
        <div className="ml-4">
          <ImageTextButtonPanel
            img="/assets/logo/Group 1888.svg"
            content1="Offline"
            content2="No login required"
            content3="Go Offline"
            imgheight={0}
            imgwidth={128}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

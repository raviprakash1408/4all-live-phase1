import CopyButton from '../copyButton';
import MediaContentCard from '.';

export default {
  component: MediaContentCard,
  title: 'MediaContentCard',
  tags: ['MediaContentCard'],
};
const MediaContentCardImport =
  "import MediaContentCard from '@/components/MediaContentCard/GridComponent'";

export const Default = () => (
  <div>
    <MediaContentCard />
    <div className="mt-9 flex">
      <p className="ml-8 text-quaternary-color">MediaContentCard</p>
      <CopyButton text={MediaContentCardImport} />
    </div>
  </div>
);

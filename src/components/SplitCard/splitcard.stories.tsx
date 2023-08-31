import CopyButton from '../copyButton';
import SplitCard from '.';

export default {
  component: SplitCard,
  title: 'SplitCard',
  tags: ['SplitCard'],
};
const SplitCardImport = "import SplitCard from '@/components/billing/index'";

export const Default = () => (
  <div>
    <SplitCard range={false} />
    <div className="mt-9 flex">
      <p className="ml-8 text-quaternary-color">SplitCard</p>
      <CopyButton text={SplitCardImport} />
    </div>
  </div>
);

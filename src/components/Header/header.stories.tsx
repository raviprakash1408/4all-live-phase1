import CopyButton from '../copyButton';
import Header from '.';

export default {
  component: Header,
  title: 'Header',
  tags: ['Header'],
};
const HeaderImport = "import Header from '@/components/Header/index'";
export const Default = () => (
  <div>
    <Header />
    <div className="mt-9 flex">
      <p className="ml-8 text-quaternary-color">Header</p>
      <CopyButton text={HeaderImport} />
    </div>
  </div>
);

import CopyButton from '../copyButton';
import FolderGrid from '.';

export default {
  component: FolderGrid,
  title: 'FolderGrid',
  tags: ['FolderGrid'],
};
const FolderGridImport =
  "import FolderGrid from '@/components/folderGrid/index'";

export const Default = () => (
  <div>
    <FolderGrid
      img="/assets/icons/folderImg.svg"
      FolderName="Folder1"
      width="w-80"
    />
    <div className="mt-9 flex">
      <p className="ml-8 text-quaternary-color">FolderGrid</p>
      <CopyButton text={FolderGridImport} />
    </div>
  </div>
);

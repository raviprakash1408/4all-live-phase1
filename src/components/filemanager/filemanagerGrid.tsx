import React from 'react';

const FilemanagerGrid = () => {
  return (
    <div>
      Filll
      {/* {checked ? (
        data?.folders?.map((folder) => (
          <div key={folder.id}>
            <FolderGrid
              // Background="bg-sixth-color"
              img="/assets/icons/folder-large.svg"
              width="w-64"
              FolderName={folder.name}
            />
          </div>
        ))
      ) : (
        <div />
      )}
      <div className="grid gap-x-9 gap-y-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {categoryData?.map((file: CustomFile) => (
          <button
            type="button"
            onClick={() => setisOpen(!isOpen)}
            key={file.id}
          >
            <GridComponent
              title={file.name}
              img={file.url}
              type={file.type}
              id={file.id}
              fileSize="Size:12MB"
            />
          </button>
        ))}
      </div>
      <InfoSidebar isOpen={isOpen} /> */}
    </div>
  );
};

export default FilemanagerGrid;

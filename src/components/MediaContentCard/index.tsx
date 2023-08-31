'use client';

import React from 'react';

import GridComponent from './GridComponent';

const MediaContentCard = () => {
  const fileData = [
    {
      id: 1,
      img: '/assets/icons/Media.svg',
      fileName: ' Production commercial.mp4',
      fileSize: 'Size:12MB',
      MainImg: '/assets/images/Image1.png',
      type: 'Media',
    },
    {
      id: 2,
      img: '/assets/icons/Media.svg',
      fileName: ' Production commercial.mp4',
      fileSize: 'Size:12MB',
      MainImg: '/assets/images/Image1.png',
      type: 'Media',
    },
    {
      id: 3,
      img: '/assets/icons/Media.svg',
      fileName: ' Production commercial.mp4',
      fileSize: 'Size:12MB',
      MainImg: '/assets/images/Image1.png',
      type: 'Media',
    },
    {
      id: 4,
      img: '/assets/icons/Media.svg',
      fileName: ' Production commercial.mp4',
      fileSize: 'Size:12MB',
      MainImg: '/assets/images/Image1.png',
      type: 'Media',
    },
  ];

  return (
    <div>
      <section className="ml-6 mt-10 bg-[#21464F] ">
        <div className="container">
          <div className="-mx-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fileData.map((item) => (
              <div key={item.id} className="group w-[95%]">
                <GridComponent
                  title={item.fileName}
                  img={item.MainImg}
                  type="media"
                  id={item.id}
                  fileSize={item.fileSize}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaContentCard;

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import Billing from '@/components/Billing';

const TeamBilling = () => {
  const [isRoles] = useState(false);
  const [isBilling] = useState(true);
  const router = useRouter();
  const handleGeneral = () => {
    router.push('/dashboard/settings/');
  };
  const handleMembers = () => {
    router.push('/dashboard/settings/team-settings/');
  };
  const handleRoles = () => {
    router.push('/dashboard/settings/team-roles/');
  };
  const handleBilling = () => {
    router.push('/dashboard/settings/billing/');
  };
  const handleInvoices = () => {
    router.push('/dashboard/settings/invoices/');
  };
  return (
    <div className="flex h-[93vh] w-[100%] justify-between bg-primary-color p-2">
      <div className="w-[10%] overflow-hidden rounded-l-3xl">
        <div className="flex w-[100%] flex-col items-center justify-center bg-tertiary-color p-4">
          <Image
            src="/assets/icons/Rectangle 394205.svg"
            alt="image"
            width={50}
            height={50}
          />
          <h3 className="text-[16px] font-semibold text-font-color">
            4all.live team
          </h3>
          <p className="text-[16px] text-[#808080]">Owner</p>
        </div>
        <div
          className="flex h-[50px] cursor-pointer items-center bg-[#0D0D0D] p-3"
          onClick={handleGeneral}
        >
          <Image
            src="/assets/icons/general.svg"
            alt="settings"
            width={25}
            height={25}
          />
          <h3 className="ml-4 text-[16px] text-font-color">General</h3>
        </div>
        <div
          className="flex h-[50px] cursor-pointer items-center bg-[#0D0D0D] p-3"
          onClick={handleMembers}
        >
          <Image
            src="/assets/icons/non-active-teams.svg"
            alt="members"
            width={25}
            height={25}
          />
          <h3 className="ml-4 text-[16px] text-font-color">Members</h3>
        </div>
        <div
          className={`flex h-[50px] cursor-pointer items-center ${
            isRoles
              ? 'border-2 border-tertiary-color border-b-[#F03641]  bg-tertiary-color'
              : 'bg-[#0D0D0D]'
          } p-3`}
          onClick={handleRoles}
        >
          <Image
            src="/assets/icons/roles.svg"
            alt="roles"
            width={25}
            height={25}
          />
          <h3 className="ml-4 text-[16px] text-font-color">Roles</h3>
        </div>
        <div
          className={`flex h-[50px] cursor-pointer items-center ${
            isBilling
              ? 'border-2 border-tertiary-color border-b-[#F03641]  bg-tertiary-color'
              : 'bg-[#0D0D0D]'
          } p-3`}
          onClick={handleBilling}
        >
          <Image
            src="/assets/icons/active-billing.svg"
            alt="notification"
            width={25}
            height={25}
          />
          <h3 className="ml-4 text-[16px] text-font-color">Billing</h3>
        </div>
        <div
          className="flex h-[50px] cursor-pointer items-center bg-[#0D0D0D] p-3"
          onClick={handleInvoices}
        >
          <Image
            src="/assets/icons/g1675.svg"
            alt="invoices"
            width={25}
            height={25}
          />
          <h3 className="ml-4 text-[16px] text-font-color">Invoices</h3>
        </div>
      </div>
      {isBilling && <Billing />}
    </div>
  );
};

export default TeamBilling;

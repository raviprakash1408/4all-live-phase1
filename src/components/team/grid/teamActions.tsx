import Image from 'next/image';

import InputField from '@/components/input field/InputField';
import { Select } from '@/components/select/index';

const TeamActions = () => {
  return (
    <div className="flex gap-x-5 py-5">
      <Image
        src="/assets/images/sony.png"
        alt=" "
        className="h-[50px] w-[50px] rounded-full object-cover"
        width={50}
        height={50}
      />
      <InputField
        name="Team name"
        img="/assets/sidebar/team.svg"
        validation={false}
        withImage={false}
        height=""
        width=""
        borderColor="" // enableBlur={false}
      />
      <div className="flex-1">
        <Select name="Select workflow" img="/assets/icons/rolesWorkflows.svg" />
      </div>
    </div>
  );
};

export default TeamActions;

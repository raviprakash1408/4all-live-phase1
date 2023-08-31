import CopyButton from '../copyButton';
import Subscription from '.';
// import { SubscriptionType } from './types';
export default {
  component: Subscription,
  title: 'Subscription',
  tags: ['Subscription'],
};
const SubscriptionImport =
  "import Subscription from '@/components/subscription/index'";
export const Default = () => (
  <div>
    <Subscription />
    <div className="mt-9 flex">
      <p className="ml-8 text-quaternary-color">Subscription</p>
      <CopyButton text={SubscriptionImport} />
    </div>
    ;
  </div>
);

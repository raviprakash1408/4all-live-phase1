import Toast from '.';
import TestToast from './testToast';

export default {
  component: Toast,
  title: 'Toast',
  tags: ['Toast'],
};

export const Default = () => (
  <div>
    {/* <Toast message="Success" type="success" /> */}
    <TestToast />
  </div>
);


import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const DateFilter = () => (
  <Space direction="vertical" size={12}>
    <RangePicker />
    {/* <RangePicker showTime /> */}

   
  </Space>
);

export default DateFilter;

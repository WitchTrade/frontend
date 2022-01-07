import { FunctionComponent } from 'react';
import Image from 'next/image';
import Dropdown from '../styles/Dropdown';
import TextInput from '../styles/TextInput';
import ActionButton from '../styles/ActionButton';
import {
  AdminFilterValues,
  adminOrderByValues,
  badgeValues,
  createDefaultAdminFilter,
  verifiedValues
} from '../../shared/static/adminFilterValues';
import { orderDirectionValues } from '../../shared/static/filterValues';

interface Props {
  adminFilterValues: AdminFilterValues;
  setAdminFilterValues: (adminFilterValues: AdminFilterValues) => void;
};

const AdminFilter: FunctionComponent<Props> = ({ adminFilterValues, setAdminFilterValues }) => {
  const clearFilter = () => {
    setAdminFilterValues(createDefaultAdminFilter());
  };

  return (
    <div className="w-full">
      <div className="bg-wt-surface-dark rounded-lg">
        <div className={`flex p-2 rounded-lg justify-center`}>
          <p className="font-semibold">Filter</p>
        </div>
        <div className="flex flex-col items-center p-2">
          <TextInput placeholder="Search by name" required={false} type="text" value={adminFilterValues.searchString} setValue={(searchString) => setAdminFilterValues({ ...adminFilterValues, searchString })} clearOption={true} />
          <div className="flex flex-wrap justify-center">
            <div className="m-1" style={{ width: '220px' }}>
              <p className="mb-1">Verified</p>
              <Dropdown selectedValue={adminFilterValues.verified} setValue={(verified) => setAdminFilterValues({ ...adminFilterValues, verified })} values={verifiedValues} />
            </div>
            <div className="m-1" style={{ width: '220px' }}>
              <p className="mb-1">Badge</p>
              <Dropdown selectedValue={adminFilterValues.badge} setValue={(badge) => setAdminFilterValues({ ...adminFilterValues, badge })} values={badgeValues} />
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="m-1" style={{ width: '220px' }}>
              <p className="mb-1">Order by</p>
              <Dropdown selectedValue={adminFilterValues.orderBy} setValue={(orderBy) => setAdminFilterValues({ ...adminFilterValues, orderBy })} values={adminOrderByValues} />
            </div>
            <div className="m-1" style={{ width: '220px' }}>
              <p className="mb-1">Show in</p>
              <Dropdown selectedValue={adminFilterValues.orderDirection} setValue={(orderDirection) => setAdminFilterValues({ ...adminFilterValues, orderDirection })} values={orderDirectionValues} />
            </div>
          </div>
          <div className="mt-2">
            <ActionButton type="cancel" onClick={clearFilter}>
              <Image src="/assets/svgs/bin/white.svg" height="24px" width="24px" alt="Clear filter" />
              Clear Filter
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFilter;

import { FunctionComponent } from 'react';
import { SearchTrade, SEARCH_VIEW } from '../../shared/handlers/search.handler';
import NavbarLink from '../styles/NavbarLink';

interface Props {
  search: SearchTrade;
  type: SEARCH_VIEW;
  setType: (type: SEARCH_VIEW) => void;
};

const SearchNav: FunctionComponent<Props> = ({ search, type, setType }) => {
  return (
    <div className="flex justify-center">
      <div className="mx-1">
        <NavbarLink type={type === SEARCH_VIEW.OFFERS ? 'navSelected' : 'nav'} onClick={() => setType(SEARCH_VIEW.OFFERS)}>
          Offers
          {search.offers &&
            <div className="rounded-full text-center flex justify-center items-center ml-1 px-1" style={{ minWidth: '25px', height: '25px', backgroundColor: search.offers.length > 0 ? '#059669' : '#F59E0B' }}>
              <p className="text-white font-bold text-sm">{search.offers.length}</p>
            </div>
            ||
            <div className="rounded-full text-center flex justify-center items-center ml-1 px-1" style={{ minWidth: '25px', height: '25px' }}>
              <p className="text-white font-bold text-sm"></p>
            </div>
          }
        </NavbarLink>
      </div>
      <div className="mx-1">
        <NavbarLink type={type === SEARCH_VIEW.WISHES ? 'navSelected' : 'nav'} onClick={() => setType(SEARCH_VIEW.WISHES)}>
          Wishlist
          {search.wishes &&
            <div className="rounded-full text-center flex justify-center items-center ml-1 px-1" style={{ minWidth: '25px', height: '25px', backgroundColor: search.wishes.length > 0 ? '#059669' : '#F59E0B' }}>
              <p className="text-white font-bold text-sm">{search.wishes.length}</p>
            </div>
            ||
            <div className="rounded-full text-center flex justify-center items-center ml-1 px-1" style={{ minWidth: '25px', height: '25px' }}>
              <p className="text-white font-bold text-sm"></p>
            </div>
          }
        </NavbarLink>
      </div>
    </div>
  );
};

export default SearchNav;

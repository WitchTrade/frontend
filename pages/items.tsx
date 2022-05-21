import InfiniteScroll from 'react-infinite-scroll-component'
import CustomHeader from '../components/core/CustomHeader'
import ItemDetailDialog from '../components/items/ItemDetailDialog'
import ItemFilter from '../components/items/ItemFilter'
import ItemView from '../components/items/ItemView'
import PageHeader from '../components/styles/PageHeader'
import FilterHandler from '../shared/handlers/filter.handler'
import ItemsHandler from '../shared/handlers/items.handler'
import { FILTER_TYPE } from '../shared/static/filterValues'
import type { NextPage } from 'next'

const Items: NextPage = () => {
  const {
    dialogOpen,
    setDialogOpen,
    selectedItem,
    openItemDetails,
    capitalizeFirstLetter,
  } = ItemsHandler()

  const {
    inventory,
    totalItemCount,
    filteredItems,
    loadedItems,
    loadMoreItems,
    hasMoreItems,
    itemFilterValues,
    setItemFilterValues,
  } = FilterHandler(FILTER_TYPE.ITEM, 125)

  return (
    <div>
      <ItemDetailDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        item={selectedItem}
        inventory={inventory}
        capitalizeFirstLetter={capitalizeFirstLetter}
      />
      <CustomHeader
        title='WitchTrade | Items'
        description='Witch It item list.'
        url='https://witchtrade.org/items'
      />
      <PageHeader title='Items' />
      <ItemFilter
        itemFilterValues={itemFilterValues}
        setItemFilterValues={setItemFilterValues}
        initialOpen={true}
        type={FILTER_TYPE.ITEM}
      />
      <p className='mt-2 text-center'>
        <span className='font-bold text-wt-accent'>{totalItemCount}</span> item
        {totalItemCount === 1 ? '' : 's'}
        {totalItemCount !== filteredItems.length ? (
          <>
            {' '}
            in total,{' '}
            <span className='font-bold text-wt-accent'>
              {filteredItems.length}
            </span>{' '}
            filtered
          </>
        ) : (
          ''
        )}
      </p>
      <InfiniteScroll
        className='flex flex-row flex-wrap justify-center py-2 mx-6 h-full'
        dataLength={loadedItems.length}
        next={loadMoreItems}
        hasMore={hasMoreItems()}
        loader={<p></p>}
      >
        {loadedItems.map((item, i) => (
          <ItemView
            key={i}
            item={item}
            inventory={inventory}
            openItemDetails={openItemDetails}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default Items

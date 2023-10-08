import type { FC } from 'react';
import { Layout } from '../../../../../application/UI/Components/layout';
import { MenuItem } from '../../../../owner/home/UI/Components/MenuItem';
import { Category } from '../../../../owner/home/UI/Components/Category';
import { Box, Center, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import type { MenuItemType } from '../../../../../application/@types/Menu';
import type { CategoryType } from '../../../../../application/@types/Category';
import { MenuViewModal } from '../../../../owner/home/UI/Components/MenuVIewModal';

interface RestaurantHomePreProps {
  /**
   * レストラン名
   */
  restaurantName: string
  /**
   * 表示するメニューのリスト
   */
  menuItemList: MenuItemType[]
  /**
   * カテゴリーのリスト
   */
  categoryList: CategoryType[]
  /**
   * 選択されているカテゴリー
   */
  selectedCategory: CategoryType
  /**
   * 800px以上かどうか
   */
  isLargerThan800: boolean
  /**
   * 1200px以上かどうか
   */
  isLargerThan1200: boolean
  /**
   * カテゴリーを押したときの処理
   * @param category 
   * @returns 
   */
  onClickCategory: (category: CategoryType) => void
  /**
   * モーダル呼び出し
  */
  onClickMenu: (menuItem: MenuItemType) => void
  selectedMenuItem: MenuItemType | undefined
  isMenuViewModalOpen: boolean
  menuViewModalOnClose: () => void
}

export const RestaurantHomePre: FC<RestaurantHomePreProps> = ({
  restaurantName,
  categoryList,
  menuItemList,
  selectedCategory,
  isLargerThan800,
  isLargerThan1200,
  onClickCategory,
  isMenuViewModalOpen,
  onClickMenu,
  selectedMenuItem,
  menuViewModalOnClose
}) => {
  return (
    <>
      <MenuViewModal
        isOpen={isMenuViewModalOpen} selectedMenu={selectedMenuItem} onClose={menuViewModalOnClose}
      />
      <Layout title={`${restaurantName}メニューアプリ`}>
        <Box px={isLargerThan800 ? 12 : 5} pb={5}>
          <HStack py={5}>
            <HStack overflowX='auto' flex={4} spacing={1}>
              {categoryList.map((category, index) => (
                <Category key={index} category={category} isSelected={category.id === selectedCategory.id} isLargerThan1200={isLargerThan1200} onClick={() => onClickCategory(category)} />
              ))}
            </HStack>
          </HStack>
          <Box>
            {menuItemList.length > 0 ?
              <Grid gridTemplateColumns={isLargerThan800 ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)'} rowGap={5} columnGap={isLargerThan800 ? 10 : 5}>
                {menuItemList.map((menuItem, index) => (
                  <MenuItem
                    key={index}
                    isLargerThan1200={isLargerThan1200}
                    item={menuItem}
                    onPress={() => {
                      onClickMenu(menuItem);
                      console.log('アイテム' + menuItem.id);
                    }}
                  />
                ))}
              </Grid>
              : 
              <VStack justifyContent="center" height="calc(95svh - 143.9px)">
                <Center>
                  <Text fontSize="2xl">メニューがありません</Text>
                </Center>
              </VStack>
            }
          </Box>
        </Box>
      </Layout>
    </>
  );
};

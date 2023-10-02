import type { FC } from 'react';
import { Layout } from '../../../../../application/UI/Components/layout';
import { MenuItem } from '../Components/MenuItem';
import { Category } from '../Components/Category';
import { Box, Button, Grid, HStack } from '@chakra-ui/react';
import type { MenuItemType } from '../../../../../application/@types/Menu';
import type { CategoryType } from '../../../../../application/@types/Category';

interface OwnerHomePreProps {
  // 表示するメニューのリスト
  menuItemList: MenuItemType[]
  // カテゴリーのリスト
  categoryList: CategoryType[]
  // 選択されているカテゴリー
  selectedCategory: CategoryType
  //新規登録ボタンを押したときの処理
  onClickAddMenuButton: () => void
  // カテゴリーを押したときの処理
  onClickCategory: (category: CategoryType) => void
}

/**
 * ホーム画面のコンポーネント（Presentational）
 * ここにUIを書く
 * @returns 
 */
export const OwnerHomePre: FC<OwnerHomePreProps> = ({categoryList, menuItemList, onClickAddMenuButton, onClickCategory, selectedCategory}) => {
  return (
    <>
      <Layout title='MaaS'>
        <Box px={12}>
          <HStack py={5}>
            <HStack overflowX='auto' flex={4} spacing={1}>
              {categoryList.map((category, index) => (
                <Category key={index} category={category} isSelected={category.id === selectedCategory.id} onClick={() => onClickCategory(category)} />
              ))}
            </HStack>
            <Box
              flex={2}
              textAlign="right"
            >
              <Button
                border="solid 1px #833F29"
                borderRadius="10px"
                color="#B14B4B"
                backgroundColor="#FBFBFB"
                size="lg"
                fontSize="3xl"
                px={10}
                py={7}
                onClick={onClickAddMenuButton}
              >
              新規登録
              </Button>
            </Box>
          </HStack>
          <Box>
            <Grid gridTemplateColumns='repeat(4, 1fr)' rowGap={5} columnGap={10}>
              {menuItemList.map((menuItem, index) => (
                <MenuItem
                  key={index}
                  item={menuItem}
                  onPress={() => { console.log('アイテム' + menuItem.id); }}
                />
              ))}
            </Grid>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

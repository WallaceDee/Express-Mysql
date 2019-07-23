var sqlMapping = {
    getCategoryList: 'SELECT categoryId,categoryName as text,parentId FROM pal_item_category',
    getItemListByCategoryId: 'SELECT * FROM pal_item',
    getCharacterList: 'SELECT * FROM pal_character'
}
module.exports = sqlMapping;
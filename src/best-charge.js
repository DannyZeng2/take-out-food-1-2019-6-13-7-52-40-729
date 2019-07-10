function bestCharge(selectedItems){
  //1h
  var allItems = loadAllItems();
  var promotions = loadPromotions();
  
  var itemsNameAndCount = getItemsNameAndCount(selectedItems);
  var itemsFullInfo = getItemsFullInfo(itemsNameAndCount, allItems);
  var priceArr = getSalePrice(promotions,itemsFullInfo)
  
  var totalPrice = priceArr[0];
  var salePrice = priceArr[1];

  var detailItems = ``;
 
  for(let item of itemsFullInfo) {
    detailItems += `${item.name} x ${item.count} = ${item.price * item.count}元\n`;
  }

  var result = `============= 订餐明细 =============\n${detailItems}`;


  if (salePrice > 0) {
    result += "-----------------------------------\n使用优惠:\n";
    var saleType = "";
    if (totalPrice >= 30 && salePrice < 6) {
      salePrice = 6;
      saleType = `满30减6元，省6元\n`;
    }
    if (salePrice > 6) {
      saleType = `指定菜品半价(黄焖鸡，凉皮)，省${salePrice}元\n`;
    }
    result += saleType;
  }
  result +=`-----------------------------------
总计：${totalPrice - salePrice}元
===================================`;
  return result;
}

//30min
function getSalePrice(promotions,itemsFullInfo) {
  var priceArr = []
  var totalPrice = 0;
  var salePrice = 0;

  for(let item of itemsFullInfo) {
    totalPrice += item.price * item.count;
    
    var halfPrice = promotions[1].items;
    
    for(let halfPriceItem of halfPrice) {
      if (halfPriceItem == item.id) {
        salePrice += item.price / 2;
      }
    }
  }

  priceArr.push(totalPrice);
  priceArr.push(salePrice)

  return priceArr
}

//30min
function getItemsNameAndCount(selectedItems) {
  var items = [];
  for(let item of selectedItems ){
    var arr = item.split(' x ');
    items.push({ 'id': arr[0], 'count': parseInt(arr[1]) });
  }
  console.log(items);
  return items;
}

//20min
function getItemsFullInfo (items, allItems) {
  for (let i = 0; i < items.length; i++) {
    for(let item of allItems) {
      if (items[i].id == item.id) {
        items[i].name = item.name;
        items[i].price = item.price;
      }
    }
  }
  return items;
}

console.log("it's clicking time")

let treasure = {
  clickCount: 0,
  clickPower: 1,
  autoCollectPower: 0,
}

let clickUpgrades = {
  'bag': {
    name: bag,
    price: 10,
    owned: 0,
    multiplier: 2
  },
  'cart': {
    price: 20,
    owned: 0,
    multiplier: 5
  },
}

let autoUpgrades = {
  troll: {
    price: 50,
    owned: 0,
    multiplier: 2
  },
  dragon: {
    price: 100,
    owned: 0,
    multiplier: 10
  }
}


/**
 * Find total modifier amount : goal number
 * Add total to clickCount
 *  - no using auto
 */
function calculateClickUpgradeMultipliers() {
  let multiplierTotal = 0
  // foreach(upgrade in clickUpgrades){
  //   multiplierTotal += upgrade.owned * upgrade.multiplier
  // }
  // how do you itterate over an object
  for (const keyname in clickUpgrades) {
    const upgrade = clickUpgrades[keyname];
    multiplierTotal += upgrade.owned * upgrade.multiplier
  }
  treasure.clickCount += multiplierTotal
}


function mine() {
  treasure.clickCount++
  calculateClickUpgradeMultipliers()
  // let clickModifier = clickUpgrades.bag.multiplier * clickUpgrades.bag.owned
  // let clickModifier2 = clickUpgrades.cart.multiplier * clickUpgrades.cart.owned
  // add click modifier * amount owned to the increase per click
  // treasure.clickCount += clickModifier += clickModifier2
  update()
}


// function purchaseBag() {
//   if (treasure.clickCount < 10) { return }
//   treasure.clickCount -= 10
//   clickUpgrades.bag.owned++
//   console.log("You own this many bags:", clickUpgrades.bag.owned)
//   update()
// }
//XXX can only purchase if you have enough gold
// button not clickable when you don't have the gold

function purchaseItem(itemClicked) {
  let item = clickUpgrades[itemClicked]
  if (treasure.clickCount < item.price) { return }
  treasure.clickCount -= item.price
  item.owned++
  console.log(item.owned)
  update()
}

function purchaseAutoUpgrades(upgradeClicked) {
  let helper = clickUpgrades[upgradeClicked]
  if (treasure.clickCount < helper.price) { return }
  treasure.clickCount -= helper.price
  helper.owned++
  console.log(helper.owned)
  update()
}

function autoMine() {
  // find total of autoUpgrades owned * multiplier
  //change the auto collect stat on page to reflect the total
  // change the inventory amount
  // access autoUpgrade helpers and add to clickCount #owned * multiplier
  // call this function on an interval
}


function update() {
  document.getElementById('clickCount').innerText = treasure.clickCount
  document.getElementById('bagsOwned').innerText = clickUpgrades.bag.owned
  document.getElementById('cartsOwned').innerText = clickUpgrades.cart.owned
  document.getElementById('clickPowerCount').innerText = (clickUpgrades.bag.owned * clickUpgrades.bag.multiplier) + (clickUpgrades.cart.owned * clickUpgrades.cart.multiplier) + treasure.clickPower

}

let modifierInterval = setInterval(autoMine, 1000)
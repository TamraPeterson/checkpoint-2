console.log("it's clicking time")

let treasure = {
  clickCount: 0,
  clickPower: 1,
  autoCollectPower: 0,
}

let clickUpgrades = {
  'bag': {
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
    price: 10,
    owned: 0,
    multiplier: 2
  },
  dragon: {
    price: 100,
    owned: 0,
    multiplier: 10
  }
}

// if (treasure.clickCount < clickUpgrades.bag.price) {
//   document.getElementById('bagButton').disabled = true
// } else {
//   document.getElementById('bagButton').disabled = false
// }
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
  if (treasure.clickCount < item.price) {
    return
  }
  treasure.clickCount -= item.price
  item.owned++
  item.price += 20
  console.log(item.owned)
  update()
}

function purchaseAutoUpgrade(upgradeClicked) {
  let autoUpgrade = autoUpgrades[upgradeClicked]
  if (treasure.clickCount < autoUpgrade.price) { return }
  treasure.clickCount -= autoUpgrade.price
  autoUpgrade.owned++
  autoUpgrade.price += 50
  console.log(autoUpgrade.owned)
  update()
}

function autoMine() {
  let totalAutoMineAmount = (autoUpgrades.dragon.owned * autoUpgrades.dragon.multiplier) + (autoUpgrades.troll.owned * autoUpgrades.troll.multiplier)// find total of autoUpgrades owned * multiplier
  // add total auto mine amount to click count on interval
  treasure.clickCount += totalAutoMineAmount
  update()
  // access autoUpgrade helpers and add to clickCount #owned * multiplier
  // call this function on an interval
}


function update() {
  document.getElementById('clickCount').innerText = treasure.clickCount
  document.getElementById('bagsOwned').innerText = clickUpgrades.bag.owned
  document.getElementById('cartsOwned').innerText = clickUpgrades.cart.owned
  document.getElementById('clickPowerCount').innerText = (clickUpgrades.bag.owned * clickUpgrades.bag.multiplier) + (clickUpgrades.cart.owned * clickUpgrades.cart.multiplier) + treasure.clickPower
  document.getElementById('bagPrice').innerText = clickUpgrades.bag.price
  document.getElementById('cartPrice').innerText = clickUpgrades.cart.price
  document.getElementById('trollsOwned').innerText = autoUpgrades.troll.owned
  document.getElementById('dragonsOwned').innerText = autoUpgrades.dragon.owned
  document.getElementById('autoCollectCount').innerText = (autoUpgrades.troll.owned * autoUpgrades.troll.multiplier) + (autoUpgrades.dragon.owned * autoUpgrades.dragon.multiplier)  //changes the auto collect stat on page to reflect the total
  document.getElementById('trollPrice').innerText = autoUpgrades.troll.price
  document.getElementById('dragonPrice').innerText = autoUpgrades.dragon.price

}

setInterval(autoMine, 1000)
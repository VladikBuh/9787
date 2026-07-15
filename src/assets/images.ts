const images: Record<string, number> = {
  // Splash
  LoaderBackground: require('./room-hoob-loader-bg.png'),
  LoaderIcon: require('./room-hoob-loader-icon.png'),

  // Onboarding
  Onboard1: require('./room-hoob-onboard-1.png'),
  Onboard2: require('./room-hoob-onboard-2.png'),
  Onboard3: require('./room-hoob-onboard-3.png'),
  Onboard4: require('./room-hoob-onboard-4.png'),
  Onboard5: require('./room-hoob-onboard-5.png'),

  // Tab bar icons
  TabRequests: require('./room-hoob-tab-requests.png'),
  TabClimate: require('./room-hoob-tab-climate.png'),
  TabDine: require('./room-hoob-tab-dine.png'),
  TabParking: require('./room-hoob-tab-parking.png'),
  TabConcierge: require('./room-hoob-tab-concierge.png'),

  // Menu — Signatures
  GrilledBeefTenderloin: require('./room-hoob-grilled-beef-tenderloin.png'),
  HerbRoastedSalmon: require('./room-hoob-herb-roasted-salmon.png'),
  TruffleMushroomRisotto: require('./room-hoob-truffle-mushroom-risotto.png'),
  ChickenSupreme: require('./room-hoob-chicken-supreme.png'),
  LambRackDeluxe: require('./room-hoob-lamb-rack-deluxe.png'),

  // Menu — Fresh & Light
  CaesarSalad: require('./room-hoob-caesar-salad.png'),
  MediterraneanSalad: require('./room-hoob-mediterranean-salad.png'),
  AvocadoToastDeluxe: require('./room-hoob-avocado-toast-deluxe.png'),
  GrilledVegetableWrap: require('./room-hoob-grilled-vegetable-wrap.png'),
  BerryYogurtBowl: require('./room-hoob-berry-yogurt-bowl.png'),

  // Menu — Desserts
  ChocolateLavaCake: require('./room-hoob-chocolate-lava-cake.png'),
  NewYorkCheesecake: require('./room-hoob-new-york-cheesecake.png'),
  TiramisuClassic: require('./room-hoob-tiramisu-classic.png'),
  FreshFruitPlatter: require('./room-hoob-fresh-fruit-platter.png'),
  VanillaCremeBrulee: require('./room-hoob-vanilla-creme-brulee.png'),
};

export const getImage = (key: string): number => images[key];

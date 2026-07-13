const images: Record<string, number> = {
  // Splash
  LoaderBackground: require('./hippo-hub-loader-bg.png'),
  LoaderIcon: require('./hippo-hub-loader-icon.png'),

  // Onboarding
  Onboard1: require('./hippo-hub-onboard-1.png'),
  Onboard2: require('./hippo-hub-onboard-2.png'),
  Onboard3: require('./hippo-hub-onboard-3.png'),
  Onboard4: require('./hippo-hub-onboard-4.png'),
  Onboard5: require('./hippo-hub-onboard-5.png'),

  // Tab bar icons
  TabRequests: require('./hippo-hub-tab-requests.png'),
  TabClimate: require('./hippo-hub-tab-climate.png'),
  TabDine: require('./hippo-hub-tab-dine.png'),
  TabParking: require('./hippo-hub-tab-parking.png'),
  TabConcierge: require('./hippo-hub-tab-concierge.png'),

  // Menu — Signatures
  GrilledBeefTenderloin: require('./hippo-hub-grilled-beef-tenderloin.png'),
  HerbRoastedSalmon: require('./hippo-hub-herb-roasted-salmon.png'),
  TruffleMushroomRisotto: require('./hippo-hub-truffle-mushroom-risotto.png'),
  ChickenSupreme: require('./hippo-hub-chicken-supreme.png'),
  LambRackDeluxe: require('./hippo-hub-lamb-rack-deluxe.png'),

  // Menu — Fresh & Light
  CaesarSalad: require('./hippo-hub-caesar-salad.png'),
  MediterraneanSalad: require('./hippo-hub-mediterranean-salad.png'),
  AvocadoToastDeluxe: require('./hippo-hub-avocado-toast-deluxe.png'),
  GrilledVegetableWrap: require('./hippo-hub-grilled-vegetable-wrap.png'),
  BerryYogurtBowl: require('./hippo-hub-berry-yogurt-bowl.png'),

  // Menu — Desserts
  ChocolateLavaCake: require('./hippo-hub-chocolate-lava-cake.png'),
  NewYorkCheesecake: require('./hippo-hub-new-york-cheesecake.png'),
  TiramisuClassic: require('./hippo-hub-tiramisu-classic.png'),
  FreshFruitPlatter: require('./hippo-hub-fresh-fruit-platter.png'),
  VanillaCremeBrulee: require('./hippo-hub-vanilla-creme-brulee.png'),
};

export const getImage = (key: string): number => images[key];

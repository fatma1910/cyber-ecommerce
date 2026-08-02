import { CiDeliveryTruck } from "react-icons/ci";
import { IoStorefrontOutline } from "react-icons/io5";
import { BsPatchCheck } from "react-icons/bs";




export const headerLinks = [
  {
    key: "home",
    href: "/",
  },
  {
    key: "shop",
    href: "/shop",
  },
  {
    key: "about",
    href: "/about",
  },
  {
    key: "contact",
    href: "/contact",
  },
];


export const footerLinks = [
  {
    key: "termsOfService",
    href: "/",
  },
  {
    key: "privacyPolicy",
    href: "/privacy",
  },
  {
    key: "faqs",
    href: "/faqs",
  },
]


export const  productsSection = [
  {
    key: "popular",
    img:'/home/featured1.png',
    bg: '#FFFFFF',
    titleColor:'black',
    butVariant:'outline'
  },
  {
    key: "ipadPro",
    img:'/home/featured2.png',
    bg:'#F9F9F9',
    titleColor:'black',
    butVariant:'outline'

  },
  {
    key: "samsungGalaxy",
    img:'/home/featured3.png',
    bg:'#EAEAEA',
    titleColor:'black',
    butVariant:'outline'

  },
  {
    key: "macbookPro",
    img:'/home/featured4.png',
    bg: '#2C2C2C',
    titleColor:'white',
    butVariant:'secondary'
  },

]


export const productDetailsGrid = [
  {
    key: "delivery",
    icon: <CiDeliveryTruck size={24} color="#797979" />,
  },
  {
    key: "stock",
    icon: <IoStorefrontOutline size={24} color="#797979" />,
  },
  {
    key: "guarantee",
    icon: <BsPatchCheck size={24} color="#797979" />,
  },
]




export const checkoutCities = [
  "cairo",
  "giza",
  "alexandria",
  "dakahlia",
  "sharqia",
  "gharbia",
  "monufia",
  "qalyubia",
  "beheira",
  "portSaid",
  "suez",
  "ismailia",
  "damietta",
  "fayoum",
  "minya",
  "assiut",
  "sohag",
  "qena",
  "luxor",
  "aswan",
] as const;

export type CheckoutCity = (typeof checkoutCities)[number];

export const checkoutCityShippingFees: Record<CheckoutCity, number> = {
  cairo: 35,
  giza: 38,
  alexandria: 45,
  dakahlia: 32,
  sharqia: 34,
  gharbia: 33,
  monufia: 31,
  qalyubia: 30,
  beheira: 43,
  portSaid: 48,
  suez: 42,
  ismailia: 40,
  damietta: 44,
  fayoum: 36,
  minya: 41,
  assiut: 46,
  sohag: 47,
  qena: 49,
  luxor: 52,
  aswan: 55,
};

export const defaultShippingFee = 29;

export function getShippingFeeByCity(city: string) {
  return city && city in checkoutCityShippingFees
    ? checkoutCityShippingFees[city as CheckoutCity]
    : defaultShippingFee;
}

export const paymentMethods = [
  {
    value: "cash",
    badge: null,
    disabled: false,
    titleKey: "payment.methods.cash.title",
    descriptionKey: "payment.methods.cash.description",
  },
  {
    value: "card",
    badgeKey: "payment.comingSoon",
    disabled: true,
    titleKey: "payment.methods.card.title",
    descriptionKey: "payment.methods.card.description",
  },
  {
    value: "instapay",
    badgeKey: "payment.comingSoon",
    disabled: true,
    titleKey: "payment.methods.instapay.title",
    descriptionKey: "payment.methods.instapay.description",
  },
] as const;

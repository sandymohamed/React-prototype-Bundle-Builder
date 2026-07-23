//src/data/products.ts
import type { Product } from "../types/product";

import camV4Image from "../assets/images/cameras/cam-v4.png";
import camV4White from "../assets/images/variants/cam-v4-white.png";
import camV4Gray from "../assets/images/variants/cam-v4-gray.png";
import camV4Black from "../assets/images/variants/cam-v4-black.png";

import camPanV3Image from "../assets/images/cameras/cam-pan-v3.png";
import camPanV3White from "../assets/images/variants/cam-pan-v3-white.png";
import camPanV3Black from "../assets/images/variants/cam-pan-v3-black.png";

import camFloodlightImage from "../assets/images/cameras/cam-floodlight-v2.png";
import camFloodlightWhite from "../assets/images/variants/cam-floodlight-v2-white.png";
import camFloodlightBlack from "../assets/images/variants/cam-floodlight-v2-black.png";

import camDuoDoorbellImage from "../assets/images/cameras/duo-doorbell.png";

import camBatteryProImage from "../assets/images/cameras/battery-cam-pro.png";
import camBatteryProWhite from "../assets/images/variants/battery-cam-pro-white.png";
import camBatteryProBlack from "../assets/images/variants/battery-cam-pro-black.png";

import sensorMotions from "../assets/images/sensors/motion-sensor.png";
import sensorHub from "../assets/images/sensors/sense-hub.png";

import planUnlimited from "../assets/images/plans/unlimited.svg?url";
import accessoriesMicroSD from "../assets/images/accessories/micro-sd.png";

export const products: Product[] = [
  {
    id: "cam-v4",
    category: "camera",
    title: "Wyze Cam v4",
    description: "The clearest Wyze Cam ever made.",
    learnMoreUrl: "#",
    image: camV4Image,
    price: 27.98,
    compareAtPrice: 35.98,
    badge: "Save 22%",
    variants: [
      {
        id: "white",
        label: "White",
        thumbnail: camV4White,
      },
      {
        id: "gray",
        label: "Gray",
        thumbnail: camV4Gray,
      },
      {
        id: "black",
        label: "Black",
        thumbnail: camV4Black,
      },
    ],
  },
  {
    id: "cam-pan-v3",
    category: "camera",
    title: "Wyze Cam Pan v3",
    description: "360° pan and 180° tilt security camera.",
    learnMoreUrl: "#",
    image: camPanV3Image,
    price: 34.98,
    compareAtPrice: 39.98,
    badge: "Save 12%",
    variants: [
      {
        id: "white",
        label: "White",
        thumbnail: camPanV3White,
      },
      {
        id: "black",
        label: "Black",
        thumbnail: camPanV3Black,
      },
    ],
  },
  {
    id: "cam-floodlight-v2",
    category: "camera",
    title: "Wyze Cam Floodlight v2",
    description:
      "2K floodlight camera with a 160° wide-angle view for your garage.",
    learnMoreUrl: "#",
    image: camFloodlightImage,
    price: 69.98,
    compareAtPrice: 89.98,
    badge: "Save 22%",
    variants: [
      {
        id: "white",
        label: "White",
        thumbnail: camFloodlightWhite,
      },
      {
        id: "black",
        label: "Black",
        thumbnail: camFloodlightBlack,
      },
    ],
  },
  {
    id: "duo-doorbell",
    category: "camera",
    title: "Wyze Duo Cam Doorbell",
    description: "Two cameras. Two views. Double the porch protection.",
    learnMoreUrl: "#",
    image: camDuoDoorbellImage,
    price: 69.98,
    compareAtPrice: null,
    badge: null,
    variants: [],
  },
  {
    id: "battery-cam-pro",
    category: "camera",
    title: "Wyze Battery Cam Pro",
    description: "Protect anywhere. See everything in 2.5K HDR.",
    learnMoreUrl: "#",
    image: camBatteryProImage,
    price: 89.98,
    compareAtPrice: null,
    badge: null,
    variants: [
      {
        id: "white",
        label: "White",
        thumbnail: camBatteryProWhite,
      },
      {
        id: "black",
        label: "Black",
        thumbnail: camBatteryProBlack,
      },
    ],
  },
  {
    id: "motion-sensor",
    category: "sensor",
    title: "Wyze Sense Motion Sensor",
    description: "",
    learnMoreUrl: "",
    image: sensorMotions,
    price: 59.98,
    compareAtPrice: null,
    badge: null,
    variants: [],
  },
  {
    id: "sense-hub",
    category: "sensor",
    title: "Wyze Sense Hub (Required)",
    description: "",
    learnMoreUrl: "",
    image: sensorHub,
    price: 29.92,
    compareAtPrice: null,
    badge: null,
    variants: [],
  },
  {
    id: "micro-sd",
    category: "accessory",
    title: "Wyze MicroSD Card (256GB)",
    description: "",
    learnMoreUrl: "",
    image: accessoriesMicroSD,
    price: 41.96,
    compareAtPrice: null,
    badge: null,
    variants: [],
  },
  {
    id: "cam-unlimited",
    category: "plan",
    title: "Cam Unlimited",
    description: "",
    learnMoreUrl: "",
    image: planUnlimited,
    price: 9.99,
    compareAtPrice: 12.99,
    badge: null,
    variants: [],
  },
];

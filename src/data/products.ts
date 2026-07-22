//src/data/products.ts
import type { Product } from "../types/product";

export const products: Product[] = [
  {
    "id": "cam-v4",
    "category": "camera",
    "title": "Wyze Cam v4",
    "description": "The clearest Wyze Cam ever made.",
    "learnMoreUrl": "#",
    "image": "/images/cameras/cam-v4.png",
    "price": 27.98,
    "compareAtPrice": 35.98,
    "badge": "Save 22%",
    "variants": [
      {
        "id": "white",
        "label": "White",
        "thumbnail": "/images/variants/white.png"
      },
      {
        "id": "gray",
        "label": "Gray",
        "thumbnail": "/images/variants/gray.png"
      },
      {
        "id": "black",
        "label": "Black",
        "thumbnail": "/images/variants/black.png"
      }
    ]
  },
  {
    "id": "cam-pan-v3",
    "category": "camera",
    "title": "Wyze Cam Pan v3",
    "description": "360° pan and 180° tilt security camera.",
    "learnMoreUrl": "#",
    "image": "/images/cameras/cam-pan-v3.png",
    "price": 34.98,
    "compareAtPrice": 39.98,
    "badge": "Save 12%",
    "variants": [
      {
        "id": "white",
        "label": "White",
        "thumbnail": "/images/variants/white.png"
      },
      {
        "id": "black",
        "label": "Black",
        "thumbnail": "/images/variants/black.png"
      }
    ]
  },
  {
    "id": "cam-floodlight-v2",
    "category": "camera",
    "title": "Wyze Cam Floodlight v2",
    "description": "2K floodlight camera with a 160° wide-angle view for your garage.",
    "learnMoreUrl": "#",
    "image": "/images/cameras/floodlight-v2.png",
    "price": 69.98,
    "compareAtPrice": 89.98,
    "badge": "Save 22%",
    "variants": [
      {
        "id": "white",
        "label": "White",
        "thumbnail": "/images/variants/white.png"
      },
      {
        "id": "black",
        "label": "Black",
        "thumbnail": "/images/variants/black.png"
      }
    ]
  },
  {
    "id": "duo-doorbell",
    "category": "camera",
    "title": "Wyze Duo Cam Doorbell",
    "description": "Two cameras. Two views. Double the porch protection.",
    "learnMoreUrl": "#",
    "image": "/images/cameras/doorbell.png",
    "price": 69.98,
    "compareAtPrice": null,
    "badge": null,
    "variants": []
  },
  {
    "id": "battery-cam-pro",
    "category": "camera",
    "title": "Wyze Battery Cam Pro",
    "description": "Protect anywhere. See everything in 2.5K HDR.",
    "learnMoreUrl": "#",
    "image": "/images/cameras/battery-pro.png",
    "price": 89.98,
    "compareAtPrice": null,
    "badge": null,
    "variants": [
      {
        "id": "white",
        "label": "White",
        "thumbnail": "/images/variants/white.png"
      },
      {
        "id": "black",
        "label": "Black",
        "thumbnail": "/images/variants/black.png"
      }
    ]
  },
  {
    "id": "motion-sensor",
    "category": "sensor",
    "title": "Wyze Sense Motion Sensor",
    "description": "",
    "learnMoreUrl": "",
    "image": "/images/sensors/motion.png",
    "price": 59.98,
    "compareAtPrice": null,
    "badge": null,
    "variants": []
  },
  {
    "id": "sense-hub",
    "category": "sensor",
    "title": "Wyze Sense Hub (Required)",
    "description": "",
    "learnMoreUrl": "",
    "image": "/images/sensors/hub.png",
    "price": 29.92,
    "compareAtPrice": null,
    "badge": null,
    "variants": []
  },
  {
    "id": "micro-sd",
    "category": "accessory",
    "title": "Wyze MicroSD Card (256GB)",
    "description": "",
    "learnMoreUrl": "",
    "image": "/images/accessories/microsd.png",
    "price": 41.96,
    "compareAtPrice": null,
    "badge": null,
    "variants": []
  },
  {
    "id": "cam-unlimited",
    "category": "plan",
    "title": "Cam Unlimited",
    "description": "",
    "learnMoreUrl": "",
    "image": "/images/plans/unlimited.png",
    "price": 9.99,
    "compareAtPrice": 12.99,
    "badge": null,
    "variants": []
  }
]
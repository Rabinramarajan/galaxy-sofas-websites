import type { ServiceItem } from "@/types";

export const services: ServiceItem[] = [
  {
    id: "custom-manufacturing",
    slug: "custom-sofa-manufacturing",
    title: "Custom Sofa Manufacturing",
    shortDescription: "Sofas made to your size, fabric and comfort preference.",
    description:
      "We manufacture custom sofas for living rooms, apartments and offices. Share your measurements and style references, and we will help you choose the frame, foam and fabric that fit your home.",
    icon: "factory",
  },
  {
    id: "sofa-repair",
    slug: "sofa-repair",
    title: "Sofa Repair",
    shortDescription: "Restore sagging seats, frames and everyday wear.",
    description:
      "If your sofa has lost support or shows signs of wear, we can repair the structure, restretch webbing and refresh the seating so it feels dependable again.",
    icon: "wrench",
  },
  {
    id: "sofa-remodeling",
    slug: "sofa-remodeling",
    title: "Sofa Remodeling",
    shortDescription: "Update the look and comfort of an existing sofa.",
    description:
      "Remodeling is a practical way to keep a sofa you already like. We can change the profile, cushioning and upholstery while retaining a sound frame.",
    icon: "refresh",
  },
  {
    id: "fabric-replacement",
    slug: "fabric-replacement",
    title: "Fabric Replacement",
    shortDescription: "Fresh upholstery in a fabric that suits your home.",
    description:
      "Choose a new fabric for a complete visual change. We replace worn upholstery with materials selected for daily use, colour and easy maintenance.",
    icon: "layers",
  },
  {
    id: "cushion-replacement",
    slug: "cushion-replacement",
    title: "Cushion Replacement",
    shortDescription: "New foam and filling for seats that have gone flat.",
    description:
      "Tired cushions affect both comfort and appearance. We replace seat and back cushions with foam densities chosen for the way you sit.",
    icon: "armchair",
  },
  {
    id: "home-delivery",
    slug: "home-delivery",
    title: "Home Delivery",
    shortDescription: "Careful delivery and placement in your home.",
    description:
      "We plan delivery around access to your home and help place the sofa in the intended room. Discuss staircase width, lift access and preferred timing when you enquire.",
    icon: "truck",
  },
];

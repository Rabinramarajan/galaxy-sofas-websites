import type { Guide } from "@/types/product";

export const guides: Guide[] = [
  {
    slug: "how-to-choose-sofa-size",
    title: "How to Choose the Right Sofa Size for Your Living Room",
    excerpt:
      "Measure the wall, the walkway and the way you sit — then choose a sofa that leaves the room able to move.",
    seoTitle: "How to Choose the Right Sofa Size | Galaxy Sofas",
    seoDescription:
      "A practical guide to sofa sizing for Indian living rooms: wall length, walkways, seat depth and L-shaped versus straight sofas.",
    relatedCategory: "sofas",
    relatedProductSlugs: ["modern-l-shaped-sofa", "calicut-three-seater", "nook-two-seater"],
    content: [
      {
        heading: "Start with the room, not the catalogue photo",
        paragraphs: [
          "A sofa that looks balanced in a showroom can overwhelm a 10-by-12 living room. Measure the longest wall you intend to use, then subtract at least 30–40 cm if that wall also holds a console, a window that opens inward, or a door swing. Write the remaining number down before you fall for a 280 cm corner piece.",
          "Walk the path from the entrance to the balcony or kitchen. You need a clear walkway of about 75–90 cm in front of or beside the sofa. If an L-shaped chaise blocks that path, a straight three-seater will serve the household better than a larger sofa that forces people to shuffle sideways.",
        ],
      },
      {
        heading: "Seat depth is a comfort decision",
        paragraphs: [
          "Deep seats (95 cm and more) are excellent if you curl up, but they can leave shorter family members perching. A more upright depth around 85–92 cm is easier for conversation and for older relatives. If you want both, look at a chaise module on one side and a standard seat on the other.",
          "Check door widths and stair turns before you order. Many Chennai apartments have 80–90 cm doors. A knock-down frame that assembles in the room is not a compromise; it is how large sofas actually arrive.",
        ],
      },
      {
        heading: "L-shaped, three-seater, or two pieces",
        paragraphs: [
          "Choose an L-shape when the room has a clear corner and you regularly seat four or more. Choose a three-seater when the room is rectangular and you still need space for a dining table or a study corner. A two-seater plus chairs is often more flexible than one oversized sofa in a studio.",
          "If you are unsure, visit the showroom with your wall measurements and a photo of the room. We would rather scale a piece down than have you live with a sofa that owns the floor.",
        ],
      },
    ],
  },
  {
    slug: "king-vs-queen-bed",
    title: "King vs Queen Bed: Which One Should You Choose?",
    excerpt:
      "Mattress size is only half the decision. The frame, walkways and wardrobe doors decide the rest.",
    seoTitle: "King vs Queen Bed: Which Should You Choose? | Galaxy Sofas",
    seoDescription:
      "Compare king and queen beds for Indian bedrooms: mattress sizes, walkway clearance, storage beds and when a custom headboard helps.",
    relatedCategory: "beds",
    relatedProductSlugs: ["solstice-king-bed", "linen-queen-bed", "hold-storage-bed"],
    content: [
      {
        heading: "Know the mattress you already own",
        paragraphs: [
          "In India, a queen mattress is commonly around 160–168 cm wide and a king around 180–198 cm, but brands vary. Measure the mattress you will keep. The bed frame should be specified to that mattress, not to a generic label. A king frame with a queen mattress looks unfinished; a queen frame stretched around a king mattress will not fit.",
          "If you are buying both, decide the mattress first with whoever sleeps in the bed. Width is the comfort difference most people feel. Length matters if anyone is taller than about 6'1\" — then a longer custom rail is more useful than a wider standard king.",
        ],
      },
      {
        heading: "Leave space to make the bed",
        paragraphs: [
          "You need enough clearance on at least one long side to change sheets without climbing. In a 10-by-11 room, a king plus two full bedside tables often fails. A queen with slimmer side tables, or a king with one shared bench at the foot, can be the more comfortable layout.",
          "Watch wardrobe doors. Sliding wardrobes pair better with wider beds. Hinged doors that open into the bed are a daily irritation no headboard will fix.",
        ],
      },
      {
        heading: "Storage and headboards",
        paragraphs: [
          "Hydraulic storage is most useful under a queen or king when wardrobes are already full. It is less useful if the only things you would store are items you need every morning — those still belong in drawers you can open without lifting the mattress.",
          "A wall-to-wall headboard can make a queen feel more generous on a long wall, without the walkway cost of a king. That is a custom conversation, not a catalogue default.",
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-sofa-fabric",
    title: "How to Choose the Best Sofa Fabric",
    excerpt:
      "Match the cloth to sunlight, children, pets and how often you actually sit — not to the palest sample on the wall.",
    seoTitle: "How to Choose the Best Sofa Fabric | Galaxy Sofas",
    seoDescription:
      "A practical sofa fabric guide covering performance weaves, linen blends, leather, colour, sunlight and family use.",
    relatedCategory: "sofas",
    relatedProductSlugs: ["modern-l-shaped-sofa", "stillwater-recliner-sofa", "bespoke-atelier-sofa"],
    content: [
      {
        heading: "Performance fabric is not a downgrade",
        paragraphs: [
          "Tight, textured weaves with a stain-resistant finish are what we specify for most family sofas. They hide daily wear better than a flat, pale linen. If you love the look of linen, a linen-look performance weave will sit closer to the photograph you have in mind after six months of actual use.",
          "Ask to see a rubbing or Martindale figure if it is available, but also do the simpler test: scrunch the sample, drag a denim swatch across it, and imagine turmeric and coffee. If you would not forgive a mark, do not choose that cloth for the main sofa.",
        ],
      },
      {
        heading: "Leather and sunlight",
        paragraphs: [
          "Semi-aniline leather ages well on a recliner that one or two people use. It is less forgiving under direct west sun, which can dry and fade the hide. If your sofa sits in a bright bay, a performance weave or a leather kept out of the glare is the more honest specification.",
          "Dark leather shows dust; very light fabric shows everything else. Mid tones — sand, olive, fog, taupe — are the colours that still look considered after a year of living.",
        ],
      },
      {
        heading: "Customer’s own material",
        paragraphs: [
          "We can upholster in your curtain or wall fabric if it is suitable for seating. Not every drape cloth has the abrasion resistance a sofa needs. Bring a full cutting, not a photograph. We will tell you if it will work, and if it will not, we will say so rather than hope.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

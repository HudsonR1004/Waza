/* ============================================================================
   KRAMA'S JERKED BEEF — SITE CONFIG
   This is the only file you need to edit. Every page reads from it.
   ============================================================================ */

/* ---- Stripe Payment Links -------------------------------------------------
   Paste the 5 live links from your Stripe dashboard. Any button whose link is
   still "" shows "Coming soon" instead of a dead button.
   (Payment Links are public URLs, so they're safe to keep in the frontend. Never
   put a Stripe secret key, API key or webhook secret anywhere on the site.)     */
const STRIPE_LINKS = {
  basic:    "https://buy.stripe.com/bJeeV5cxQ5UX3KL9AC8IU01",   // Basic Bundle    — 4 bags,  $49 one-off
  smoko:    "https://buy.stripe.com/cNibIT41k2ILeppcMO8IU00",   // Smoko Run       — 10 bags, $99 one-off
  junkie:   "https://buy.stripe.com/3cI28jcxQfvx4OP1468IU03",   // Jerky Junkie    — 20 bags, $179 one-off
  subBasic: "https://buy.stripe.com/4gM5kv7dw4QT5ST6oq8IU02",   // Basic monthly   — 4 bags every month, $49/mo
  subSmoko: "https://buy.stripe.com/9B6bIT2Xg1EH0yz3ce8IU04"    // Smoko monthly   — 10 bags every month, $99/mo
};

/* ---- MailerLite (newsletter) --------------------------------------------
   MailerLite -> Forms -> Embedded forms -> your form -> the numbers in the
   embed code: assets.mailerlite.com/jsonp/ACCOUNT_ID/forms/FORM_ID/subscribe   */
const MAILERLITE = {
  accountId: "",   // e.g. "123456"
  formId:    ""    // e.g. "789012"
};

/* ---- Analytics (optional, cookie-free) ----------------------------------
   Plausible, Umami, Fathom and friends don't set cookies, so no cookie banner
   is needed. Set `domain` to turn Plausible on; leave "" to run no analytics.
   Netlify Analytics (server-side) can be switched on in the Netlify dashboard
   without touching this file.                                                  */
const ANALYTICS = {
  provider: "plausible",
  domain:   ""     // e.g. "kramasjerkedbeef.com.au"
};

/* ---- Contact ------------------------------------------------------------ */
const CONTACT = {
  email: "kramasjb@gmail.com",
  phone: "0497 423 880",        // shown on the page
  phoneIntl: "+61497423880",    // used in the tel: link
  instagram: "https://www.instagram.com/kramasjerkedbeef",
  facebook:  "https://www.facebook.com/KramasJerkedBeef"
};

/* ---- Flavours -------------------------------------------------------------
   Everything in the "Ingredients & nutrition" panel comes from here, so it
   matches the back-of-pack sticker. Values per 100g come straight off the
   Nutrition Information Panel; per-serve is calculated from servingSize.
   Leave `nip: null` for a flavour whose panel isn't ready yet — the page then
   says so instead of showing an empty table.                                   */
const FLAVOURS = {
  honeySriracha: {
    name: "Honey Sriracha",
    ingredients: "Beef (topside) (≥61%), seasoning [honey sriracha rub: granulated honey, sugar, salt, garlic, pepper, paprika, sriracha powder (vinegar powder, maltodextrin, sugar, salt, paprika, spirulina, citric acid, natural flavour)].",
    allergens: "Contains gluten. May contain traces of soy.",
    storage: "Net weight 50g. Store in a cool, dry place. Refrigerate after opening.",
    servingSize: 25,          // grams
    servesPerPack: 2,         // 50g bag
    nip: {                    // per 100g
      energyKj: 1730,
      protein: 46,
      fat: 11,
      satFat: 4,
      carbs: 31,
      sugars: 23,
      sodium: 1480
    }
  },
  magicChilli: {                // transcribed from the Magic Chilli back sticker
    name: "Magic Chilli",
    ingredients: "Beef (87%), seasoning (sugar, brown sugar, salt, black pepper, garlic, chilli powder, paprika, smoked paprika, oregano, mustard, cayenne pepper, habanero), chilli flakes.",
    allergens: "May contain gluten. May contain traces of soy.",
    storage: "Net weight 50g. Store in a cool, dry place. Refrigerate after opening.",
    servingSize: 50,          // the Magic Chilli label counts the whole bag as one serve
    servesPerPack: 1,
    nip: {                    // per 100g
      energyKj: 1850,
      protein: 58,
      fat: 12.4,
      satFat: 4.9,
      carbs: 23.2,
      sugars: 19.8,
      sodium: 2290
    }
  }
};

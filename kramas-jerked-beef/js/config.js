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
  basic:    "",   // Basic Bundle    — 4 bags,  $49 one-off
  smoko:    "",   // Smoko Run       — 10 bags, $99 one-off
  junkie:   "",   // Jerky Junkie    — 20 bags, $179 one-off
  subBasic: "",   // Basic monthly   — 4 bags every month, $49/mo
  subSmoko: ""    // Smoko monthly   — 10 bags every month, $99/mo
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
   Nutrition Information Panel; per-serve is a 25g serve (2 serves per 50g bag).
   Leave `nip: null` for a flavour whose panel isn't ready yet — the page then
   says so instead of showing an empty table.                                   */
const FLAVOURS = {
  honeySriracha: {
    name: "Honey Sriracha",
    ingredients: "Beef topside (61%), granulated honey, sugar, salt, garlic, pepper, paprika, sriracha powder.",
    allergens: "Contains gluten. May contain traces of soy.",
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
  magicChilli: {
    name: "Magic Chilli",
    ingredients: "",          // paste from the Magic Chilli back sticker
    allergens: "",            // e.g. "Contains gluten. May contain traces of soy."
    servingSize: 25,
    servesPerPack: 2,
    nip: null                 // fill in like Honey Sriracha once the label is final
  }
};

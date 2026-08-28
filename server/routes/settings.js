import express from "express";
import SiteSettings from "../models/SiteSettings.js";
import { requireAuth, requireAdmin } from "../middleware/firebaseAuth.js";

const router = express.Router();

// There is only ever one settings document. Create it with defaults the
// first time anyone asks for it.
async function getOrCreateSettings() {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = await SiteSettings.create({});
  return settings;
}

// Public: read the site settings
router.get("/", async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: update the site settings (partial updates merge into each sub-object)
router.put("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    const { siteName, hero, about, contact, footer } = req.body;

    if (siteName !== undefined) settings.siteName = siteName;
    if (hero) Object.assign(settings.hero, hero);
    if (about) Object.assign(settings.about, about);
    if (contact) Object.assign(settings.contact, contact);
    if (footer) Object.assign(settings.footer, footer);

    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;

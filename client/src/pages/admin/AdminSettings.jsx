import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { SettingsAPI } from "../../lib/api";
import ImageUploadField from "../../components/ImageUploadField";

function Field({ label, value, onChange, textarea, type = "text" }) {
  return (
    <div>
      <label className="text-xs text-base-content/60">{label}</label>
      {textarea ? (
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="textarea textarea-bordered w-full mt-1"
        />
      ) : (
        <input
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="input input-bordered w-full mt-1"
        />
      )}
    </div>
  );
}

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    SettingsAPI.get()
      .then(setSettings)
      .catch((err) => Swal.fire({ icon: "error", title: "Couldn't load settings", text: err.message }))
      .finally(() => setLoading(false));
  }, []);

  function updateTop(field, value) {
    setSettings((s) => ({ ...s, [field]: value }));
  }

  function updateNested(section, field, value) {
    setSettings((s) => ({ ...s, [section]: { ...s[section], [field]: value } }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await SettingsAPI.update(settings);
      setSettings(updated);
      Swal.fire({ icon: "success", title: "Site settings saved!", timer: 1400, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Save failed", text: err.response?.data?.message || err.message });
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) return <p className="text-base-content/50">Loading...</p>;

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-3xl">
      <h2 className="font-display text-xl font-bold text-primary">Site Settings</h2>
      <p className="text-sm text-base-content/60 -mt-6">
        Edit the text shown on the Home hero, About intro, Contact page, and Footer across the
        whole site.
      </p>

      <div className="bg-white border border-base-300 rounded-box p-5 space-y-3">
        <h3 className="font-semibold text-primary">General</h3>
        <Field label="Site name" value={settings.siteName} onChange={(v) => updateTop("siteName", v)} />
      </div>

      <div className="bg-white border border-base-300 rounded-box p-5 space-y-3">
        <h3 className="font-semibold text-primary">Home Hero</h3>
        <Field
          label="Eyebrow tag"
          value={settings.hero.eyebrow}
          onChange={(v) => updateNested("hero", "eyebrow", v)}
        />
        <Field
          label="Headline"
          value={settings.hero.title}
          onChange={(v) => updateNested("hero", "title", v)}
          textarea
        />
        <Field
          label="Subtitle"
          value={settings.hero.subtitle}
          onChange={(v) => updateNested("hero", "subtitle", v)}
          textarea
        />
        <ImageUploadField
          label="Background image"
          value={settings.hero.image}
          onChange={(v) => updateNested("hero", "image", v)}
        />
      </div>

      <div className="bg-white border border-base-300 rounded-box p-5 space-y-3">
        <h3 className="font-semibold text-primary">About Section</h3>
        <Field
          label="Eyebrow tag"
          value={settings.about.eyebrow}
          onChange={(v) => updateNested("about", "eyebrow", v)}
        />
        <Field
          label="Title"
          value={settings.about.title}
          onChange={(v) => updateNested("about", "title", v)}
        />
        <Field
          label="Body text"
          value={settings.about.body}
          onChange={(v) => updateNested("about", "body", v)}
          textarea
        />
        <p className="text-xs text-base-content/50">
          Team member photos/bios are managed in the <strong>Team</strong> tab.
        </p>
      </div>

      <div className="bg-white border border-base-300 rounded-box p-5 space-y-3">
        <h3 className="font-semibold text-primary">Contact Info</h3>
        <Field
          label="Address"
          value={settings.contact.address}
          onChange={(v) => updateNested("contact", "address", v)}
        />
        <Field
          label="Phone"
          value={settings.contact.phone}
          onChange={(v) => updateNested("contact", "phone", v)}
        />
        <Field
          label="Email"
          type="email"
          value={settings.contact.email}
          onChange={(v) => updateNested("contact", "email", v)}
        />
        <Field
          label="Google Maps embed URL"
          value={settings.contact.mapEmbedUrl}
          onChange={(v) => updateNested("contact", "mapEmbedUrl", v)}
        />
      </div>

      <div className="bg-white border border-base-300 rounded-box p-5 space-y-3">
        <h3 className="font-semibold text-primary">Footer & Social Links</h3>
        <Field
          label="Footer about text"
          value={settings.footer.about}
          onChange={(v) => updateNested("footer", "about", v)}
          textarea
        />
        <Field
          label="Facebook URL"
          value={settings.footer.facebook}
          onChange={(v) => updateNested("footer", "facebook", v)}
        />
        <Field
          label="Twitter / X URL"
          value={settings.footer.twitter}
          onChange={(v) => updateNested("footer", "twitter", v)}
        />
        <Field
          label="Instagram URL"
          value={settings.footer.instagram}
          onChange={(v) => updateNested("footer", "instagram", v)}
        />
      </div>

      <button type="submit" disabled={saving} className="btn-brand w-full">
        {saving ? "Saving..." : "Save Site Settings"}
      </button>
    </form>
  );
}

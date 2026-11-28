# Berry AI Studio v0.3 — Free-first

## مبادئ المشروع
- لا اشتراكات مدفوعة ولا شراء Credits.
- لا مفاتيح API داخل ملفات الواجهة.
- لا تحويل تلقائي إلى مزود مدفوع.
- لا تفعيل فوترة أو ترقية مدفوعة بدون موافقة صريحة.

## الميزات الموجودة
- Prompt Studio للصور والفيديو.
- كتالوج Hugging Face Spaces.
- معاينة الفيديو وفلاتر العرض داخل المتصفح.
- دمج فيديوهات تجريبياً عبر FFmpeg.wasm.
- صفحة مستقلة لمولّد الصور: `/image-studio.html`.
- API لتوليد الصور عبر Cloudflare Workers AI باستخدام `@cf/black-forest-labs/flux-1-schnell`.

## بنية مولّد الصور
- الواجهة: `image-studio.html`، متوافقة مع شاشات الهاتف.
- Backend: `functions/api/generate.js` (Cloudflare Pages Function).
- إعدادات Cloudflare Pages: `wrangler.toml` يحدد مجلد النشر؛ ربط AI يضاف من لوحة Cloudflare.
- النموذج مضبوط على 4 خطوات؛ نسخة FLUX.1 Schnell الحالية تستخدم المقاس الافتراضي للنموذج.

## تشغيل مولّد الصور
1. اربطي هذا المستودع بمشروع Cloudflare Pages.
2. اختاري جذر المشروع كمجلد النشر، بلا أمر build، ومجلد الإخراج `.`.
3. من إعدادات Cloudflare Pages، أضيفي Workers AI binding باسم `AI` من قسم Settings → Functions → Workers AI bindings.
4. أعيدي النشر، ثم افتحي `/image-studio.html`.

مهم: GitHub Pages وحده لا يشغّل Pages Functions؛ واجهة التوليد تحتاج نشرها على Cloudflare Pages مع ربط AI.

## حدود الاستخدام والسلامة المالية
Cloudflare Workers AI يقدم حصة مجانية يومية محدودة (10,000 Neurons وفق صفحة الأسعار وقت كتابة هذا التحديث). عند بلوغ الحد، قد تتوقف الطلبات حتى إعادة ضبط الحصة. لا نضمن توفر النموذج أو الحصة بشكل دائم.
لا تضيفي بطاقة بنكية ولا تفعّلي خطة مدفوعة لهذا الاختبار. لا تدخلي أي سر أو API token في ملفات الواجهة أو المستودع.

## حدود أخرى
- دمج الفيديو قد يكون ثقيلاً على Android، خصوصاً مع الملفات الكبيرة.
- هذه نسخة PWA وليست APK أصلياً.

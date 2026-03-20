# Instagram Posting Guide — @thediabetesbrief

## What's in here

This folder has **20 ready-to-post Instagram carousels** generated from every quick sheet on thediabetesbrief.com. Each subfolder is one carousel post:

```
carousels/
├── plate-method/           ← one Instagram carousel post
│   ├── slide-1-title.png   ← first slide (the hook)
│   ├── slide-2-...png      ← content slides
│   ├── slide-3-...png
│   ├── slide-4-...png
│   ├── slide-5-...png
│   ├── slide-6-cta.png     ← last slide (call to action)
│   └── caption.txt         ← caption + hashtags
├── stress-blood-sugar/
├── sleep-diabetes/
└── ... (20 total)
```

## How to post (5 minutes per post)

1. **Pick a folder** — each one is a complete post
2. **Open Instagram** (or Meta Business Suite for scheduling)
3. **Upload all the slide PNGs** in order (slide-1 through slide-6)
4. **Copy the caption** from `caption.txt` — the hook, body, and CTA are already written
5. **Paste the hashtags** from the bottom of caption.txt into your **first comment** (not the caption)
6. **Post or schedule**

## Scheduling with Meta Business Suite (free)

For batch scheduling (recommended — set up a week at a time):

1. Go to business.facebook.com → select your Instagram account
2. Click "Create Post" → Instagram Feed
3. Upload the slides, paste the caption
4. Click "Schedule" instead of "Publish"
5. Pick the day and time (see schedule below)
6. Repeat for each post

## Recommended posting schedule

**4 posts per week:**
- Monday 7:00 AM ET — Lifestyle topic
- Wednesday 12:00 PM ET — Diabetes literacy
- Friday 7:00 AM ET — Quick reference / quick sheet
- Sunday 9:00 AM ET — Mindset / support

## Suggested first 4 weeks

**Week 1:** plate-method, a1c-understanding, reading-glucose, diabetes-burnout
**Week 2:** post-meal-walking, carb-counting, low-blood-sugar, support-system
**Week 3:** fiber-blood-sugar, basal-101, insulin-storage, stress-blood-sugar
**Week 4:** sleep-diabetes, exercise-bloodsugar, hydration-guide, mindful-eating

After that: alcohol-diabetes, weight-management, sick-day-management, when-to-call-provider

## Regenerating carousels

If you update the quick sheets on the website, regenerate the images:

```bash
python3 generate-carousels.py              # all sheets
python3 generate-carousels.py plate-method  # one specific sheet
```

## Tips

- **Engage with comments** — reply to every comment within 24 hours
- **Use Stories** — reshare each post to your story with a question or poll
- **First comment hashtags** — keeps the caption clean and professional
- **Bio link** — make sure thediabetesbrief.com is in your Instagram bio
- **Profile pic** — red (#C8102E) background with white "TDB" text

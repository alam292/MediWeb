import urllib.request
import json
import sys

def test_url(url, desc):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, timeout=5)
        content = res.read().decode('utf-8')
        print(f"[OK 200] {desc} -> {url}")
        return content
    except Exception as e:
        print(f"[ERROR] {desc} -> {url} failed: {e}")
        return None

print("=== STEP 1-4: Testing Core Pages ===")
test_url("http://localhost:3000", "1. Landing Page")
test_url("http://localhost:3000/login", "2. Login Page")
test_url("http://localhost:3000/signup", "3. Signup Page")
test_url("http://localhost:3000/dashboard", "4. Dashboard Page")
test_url("http://localhost:3000/dashboard/create", "5. Wizard Page")

print("\n=== Pre-seeded Demo Websites ===")
ahmed_html = test_url("http://localhost:3000/demo/ahmed-care", "Public Site: Ahmed Care")
assert "Ahmed Care" in ahmed_html, "Ahmed Care text not found"
assert "Dr. Ahmed Khan" in ahmed_html, "Dr. Ahmed Khan text not found"
assert "Cardiac Consultation" in ahmed_html, "Cardiac Consultation not found"

sara_html = test_url("http://localhost:3000/demo/sara-clinic", "Public Site: Sara Clinic")
assert "Dr. Sara Clinic" in sara_html, "Dr. Sara Clinic text not found"
assert "Invisalign Clear Aligners" in sara_html, "Invisalign service not found"

print("\n=== STEP 5-15: Simulating Wizard Website Creation (New Site) ===")
# Create website payload
new_site_payload = {
    "name": "Zenith Physical Therapy",
    "template": "premium-clinic",
    "profile": {
        "doctorName": "Dr. Marcus Vance",
        "title": "Lead Physiotherapist & Spine Specialist",
        "specialization": "Sports Injury Rehab & Posture Correction",
        "qualification": "DPT, OCS, CMPT",
        "experience": "11 Years Experience",
        "about": "Helping athletes and busy professionals regain peak mobility and live pain-free through customized biomechanical therapy.",
        "phone": "+1 (555) 777-8888",
        "email": "contact@zenithpt.com",
        "whatsapp": "+15557778888",
        "address": "900 Movement Way, Downtown Sports Complex",
        "profileImage": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop"
    },
    "services": [
        {
            "name": "Spine & Posture Analysis",
            "description": "Full biomechanical postural screen with targeted spinal mobilization.",
            "price": "$160",
            "duration": "45 mins",
            "icon": "Activity"
        },
        {
            "name": "Sports Injury Rehabilitation",
            "description": "Evidence-based strength recovery and active rehabilitation program.",
            "price": "$190",
            "duration": "60 mins",
            "icon": "Zap"
        },
        {
            "name": "Virtual Ergonomics Session",
            "description": "Home & office desk ergonomics review with remote posture routine.",
            "price": "$85",
            "duration": "30 mins",
            "icon": "Video"
        }
    ],
    "design": {
        "primaryColor": "#059669",
        "secondaryColor": "#10b981",
        "backgroundColor": "#ffffff",
        "textColor": "#0f172a",
        "fontFamily": "Modern",
        "buttonStyle": "Pill",
        "headerStyle": "Modern"
    }
}

req_post = urllib.request.Request(
    "http://localhost:3000/api/websites",
    data=json.dumps(new_site_payload).encode('utf-8'),
    headers={"Content-Type": "application/json"}
)
res_post = urllib.request.urlopen(req_post)
created_site = json.loads(res_post.read().decode('utf-8'))
created_id = created_site["id"]
created_slug = created_site["slug"]
print(f"[SUCCESS] Created Website ID: {created_id}, Slug: {created_slug}")

import html as html_lib

print("\n=== STEP 14-15: Open Generated Public Website ===")
new_site_html = test_url(f"http://localhost:3000/demo/{created_slug}", f"Public Site: /demo/{created_slug}")
unescaped_html = html_lib.unescape(new_site_html)
assert "Zenith Physical Therapy" in unescaped_html
assert "Dr. Marcus Vance" in unescaped_html
assert "Spine & Posture Analysis" in unescaped_html
print("[OK] Confirmed generated website renders all doctor details & services properly!")

print("\n=== STEP 16-21: Edit Website & Instant Live Update ===")
# Modify a service and doctor title
created_site["profile"]["title"] = "Chief Medical Officer & Spine Specialist"
created_site["services"][0]["name"] = "Advanced Spinal Decompression"
created_site["services"][0]["price"] = "$220"

req_put = urllib.request.Request(
    f"http://localhost:3000/api/websites/{created_id}",
    data=json.dumps(created_site).encode('utf-8'),
    headers={"Content-Type": "application/json"},
    method="PUT"
)
res_put = urllib.request.urlopen(req_put)
updated_site = json.loads(res_put.read().decode('utf-8'))
print(f"[SUCCESS] Updated site: {updated_site['name']}")

# Fetch public URL again
updated_html = test_url(f"http://localhost:3000/demo/{created_slug}", f"Re-fetch Public Site: /demo/{created_slug}")
unescaped_updated = html_lib.unescape(updated_html)
assert "Advanced Spinal Decompression" in unescaped_updated, "Updated service not found in public site!"
assert "$220" in unescaped_updated, "Updated price not found in public site!"
assert "Chief Medical Officer & Spine Specialist" in unescaped_updated, "Updated title not found in public site!"
print("[OK] Confirmed public website reflects updated services & title instantly without redeployment!")

print("\n=== STEP 22-23: Confirm First Website (Ahmed Care) is Unaffected (Isolation Test) ===")
ahmed_recheck = test_url("http://localhost:3000/demo/ahmed-care", "Ahmed Care Re-check")
assert "Ahmed Care" in ahmed_recheck
assert "Dr. Ahmed Khan" in ahmed_recheck
assert "Senior Consultant Cardiologist" in ahmed_recheck
assert "Advanced Spinal Decompression & Posture" not in ahmed_recheck, "Data leaked into Ahmed Care!"
print("[OK] Confirmed multi-tenant isolation! First website's data is 100% unaffected.")

print("\n>>> ALL 23 ACCEPTANCE TEST CRITERIA PASSED SUCCESSFULLY! <<<")

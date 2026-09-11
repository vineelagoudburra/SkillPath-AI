# GCP Cloud Horizons Summit 2026

A modern, highly responsive, and premium 1-day technical conference informational website focusing on **Google Cloud Technologies**. Powered by a lightweight **Python + Flask** backend and built using vanilla **HTML5, CSS3, and JavaScript** on the frontend.

## Features

- **Home Page Dashboard:** Displays the conference title, description, live date, physical/virtual location, key metrics, and schedule.
- **8 Talks & 11 Speakers:** Detailed list of 8 talks with descriptions and times, mapped with 1 or 2 expert speakers per talk.
- **Lunch & Coffee Breaks:** A complete, structured daily schedule including a designated 60-minute lunch break and multiple networking slots.
- **Search & Filters:** Highly responsive live-filtering system. Users can search by talk titles, speaker names, categories, and keywords, or filter by specific technical tracks.
- **Details Modal Window:** Floating modal showing full session abstracts, speaker avatars, job titles, and LinkedIn profile URLs.
- **JSON API Endpoint:** Exposes a developer-friendly `/api/talks` endpoint returning full details of the schedule, talks, and speakers.
- **Modern Dark Aesthetic:** Stylized with glowing ambient GCP color accents, modern glassmorphism panels, and smooth CSS keyframe animations.

---

## Technology Stack

- **Server-Side:** Python 3.x, Flask Framework
- **Client-Side:** Semantic HTML5, Vanilla CSS3 (Custom design system), Vanilla ES6 JavaScript
- **Assets:** Google Fonts (Outfit & Plus Jakarta Sans), FontAwesome SVG Icons, Unsplash Avatars

---

## Getting Started

Follow these steps to set up and run the conference website locally.

### Prerequisites

Ensure you have **Python 3.x** and **pip** installed on your system.

### 1. Clone or Open the Directory
Navigate to the root directory where the files are located:
```bash
cd c:\Users\Vineelagoud\OneDrive\Documents\TASK
```

### 2. Set Up a Virtual Environment (Recommended)
Create and activate a virtual environment to manage dependencies:
```bash
# Create the environment
python -m venv venv

# Activate on Windows (Command Prompt)
venv\Scripts\activate

# Activate on Windows (PowerShell)
.\venv\Scripts\Activate.ps1

# Activate on macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies
Install Flask using pip:
```bash
pip install flask
```

### 4. Run the Web Application
Launch the Flask development server:
```bash
python app.py
```
*By default, the application runs on debug mode and binds to port `5000`.*

### 5. Access the Website
Open your browser and navigate to:
- Home Page: [http://localhost:5000](http://localhost:5000)
- Developer API: [http://localhost:5000/api/talks](http://localhost:5000/api/talks)

---

## Project Structure

```text
TASK/
│
├── app.py                 # Flask server backend (contains conference & talk database)
├── README.md              # Documentation, setup guides, and customization details
│
├── templates/
│   └── index.html         # Main page skeleton and jinja2 markup templating
│
└── static/
    ├── css/
    │   └── styles.css     # Premium custom CSS, timeline components, and dark theme variables
    └── js/
        └── app.js         # JavaScript for live search filtering, pill tabs, and modal loading
```

---

## How to Customize and Make Changes

### 1. Adding, Modifying, or Removing Talks
To change talk contents, edit the `TALKS` and `TIMETABLE` array data inside `app.py`.
- **Talk Structure:**
  ```python
  {
      "id": 9,
      "title": "Your Custom Talk Title",
      "speakers": [
          {
              "first_name": "John",
              "last_name": "Smith",
              "role": "Cloud Developer Advocacy",
              "linkedin": "https://linkedin.com/in/johnsmith",
              "avatar": "url_to_image"
          }
      ],
      "categories": ["Developer", "Databases"],
      "description": "Full session overview text...",
      "time": "05:00 PM - 05:45 PM",
      "type": "talk"
  }
  ```
- Make sure to update both the `TALKS` list and corresponding timetable blocks in the `TIMETABLE` list.

### 2. Changing Theme Accents
Theme styles are defined as CSS custom properties in `static/css/styles.css`. Update these variables to shift colors or style profiles:
```css
:root {
    --bg-dark: #070913;                 /* Backdrop background color */
    --gcp-blue: #4285F4;                /* Accent colors mapping GCP branding */
    --font-main: 'Plus Jakarta Sans';   /* Custom fonts */
}
```

### 3. Adding More Category Buttons
To include additional category filters:
1. Open `templates/index.html`.
2. Locate the `<div id="category-filters">` container.
3. Add a button matching your new category tag:
   ```html
   <button class="filter-pill" data-category="Your-Category" id="filter-custom">
       <span class="pill-dot"></span> Your Category Name
   </button>
   ```
4. In `static/css/styles.css`, define custom category tag colors:
   ```css
   .tag-your-category { background: rgba(x, y, z, 0.12); color: #yourcolor; border: 1px solid rgba(x, y, z, 0.2); }
   ```

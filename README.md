# Smart Renovation Quiz / Budget Estimator (Serverless)

A sleek, highly interactive, and production-ready single-page web application designed to help clients estimate their construction or renovation budgets in under 60 seconds. This project features a premium modern dark SaaS aesthetic, full internationalization support, and a secure serverless backend layout to handle client conversions safely.

🚀 **Live Preview:** [Insert your GitHub Pages or Vercel Deployment Link Here]

---

## ⚡ Features

* **Dynamic Two-Column Layout:** Responsive interface built with Tailwind CSS that transforms seamlessly from a modern side-by-side desktop view to an ergonomic vertical mobile view.
* **Dual Sizing Standards:** Real-time conversion toggle between Metric (`sq.m.`) and Imperial (`sq.ft.`) unit systems that recalibrates range-slider boundaries and structural math instantly.
* **Flexible Contact Validation Engine:** Accepts both international phone formats (validated for standard string digit thresholds) and Telegram handles (`@username`) interchangeably.
* **Production Security Architecture:** Sensitive Telegram Bot API credentials are 100% hidden on the server-side, removing any risk of source control leaks.
* **Premium Thank You UI State:** Replaced standard browser alerts with an elegant, animated completion screen featuring localized processing feedback indicators.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend UI** | HTML5, Tailwind CSS (via CDN), Inter Google Font |
| **Frontend Logic** | Vanilla JavaScript (ES6+) |
| **Backend Runtime** | Node.js (Modern ES Modules syntax) |
| **Hosting Platform** | Vercel Serverless Functions Architecture |
| **Notification Gateway** | Telegram Bot API |

---

## 📁 Project Structure

```text
├── api/
│   └── send.js          # Node.js Serverless Function (Handles Telegram Pipeline)
├── index.html           # Main UI, Calculation Core, and Client Logic
└── README.md            # Project Documentation
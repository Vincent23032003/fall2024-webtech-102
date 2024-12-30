# Webtech Project - ASM Fan Club Website

## Introduction

Welcome to the frontend project of the website dedicated to ASM Clermont Auvergne fans. This project gathers all the web pages that compose the site and is regularly updated. The goal is to provide an intuitive, dynamic, and interactive platform to highlight the club's news, history, players, and trophies.

---

## Features 🏉

### **1. Main Pages and Features**

#### **1.1 Home Page**
The homepage provides a dynamic overview of the club's key information:
- Last match played, current standings, and upcoming match (data fetched from Supabase).
- Identification and automatic management of connected users' information.
- Quick access to articles, legends, and players through interactive buttons.

#### **1.2 Layout**
Global structure of the application:
- Navigation bar and footer.
- Harmonious design with gradient background and global styles.

#### **1.3 Articles ([id])**
Displays article details:
- Title, description, author, publication date, and likes.
- Interactive features: add, edit, or delete comments; like or unlike an article.

#### **1.4 Auth Callback**
Manages redirection after authentication:
- Redirects to `/settings` on success.
- Redirects to `/connexion` on failure.

#### **1.5 Blog**
Paginated list of articles:
- Search by title and navigation between pages.
- Create, edit, and delete articles (for logged-in users).

#### **1.6 Blog - New**
Create a new article:
- WYSIWYG editor for entering title and description.
- Data validation and redirection after success.

#### **1.7 Blog - Edit**
Edit an existing article:
- Pre-fills fields with current data.
- Validates and saves changes.

#### **1.8 Club**
Showcases the club's history:
- Timeline of key events organized by periods.
- Smooth and responsive animations.

#### **1.9 Connexion**
Login via two methods:
- Email/password with redirection to `/settings` upon success.
- OAuth authentication via GitHub.

#### **1.10 Create Account**
Account creation:
- Field validation and secure password hashing.
- Redirection to `/connexion` upon success.

#### **1.11 Legends**
Highlights the club's modern legends:
- Interactive display of players with detailed information.

#### **1.12 Previous Matches**
List of past matches, grouped by weeks:
- Match scores, team names, and logos.

#### **1.13 Results**
Current standings and upcoming matches:
- Full standings of teams with statistics.
- List of matches for the current week.

#### **1.14 Settings**
User profile customization:
- Edit personal information and choose an avatar.
- Secure logout.

#### **1.15 Support**
Facilitates contact with project members:
- Team members' contact information with links to email them.

#### **1.16 Team**
Showcases the current team:
- Detailed information on each player.

#### **1.17 Trophies**
Highlights the trophies won:
- Animated display of victories and finals played.

---
## **2. Components**

#### **2.1 AppFooter**
The `AppFooter` component creates a modern footer with the club logo, links to social media (Instagram, Twitter, Facebook), and the official website. It also displays the copyright for the Web Technologies 2024 project. Styled with Tailwind CSS, it offers a responsive and elegant design to complete the application.

#### **2.2 AppNavbar**
The `Navbar` component creates a functional and interactive navigation bar for the application. Key features include:

- **Main Navigation:**
  - Links to key site sections: Home, Club, Team Roster, Results, Blog, and Support.
  - A dropdown menu to explore the club's history, legends, and trophies.

- **User Management:**
  - Displays an avatar and custom options for logged-in users.
  - Provides buttons to access settings or login.

- **Modern Design and Animations:**
  - Uses Tailwind CSS for a clean and responsive style.
  - Integrates smooth animations, such as link hover transitions.

- **Dynamic Data:**
  - Retrieves and displays logged-in user details via Supabase.

#### **2.3 ThemeSelector**
The `ThemeSelector` component allows users to toggle between light and dark modes. Key features include:

- **Toggle Themes:**
  - Two buttons allow switching between light and dark modes.

- **Theme Persistence:**
  - The selected theme is saved in `localStorage` to persist across sessions.

- **Dynamic Application:**
  - Updates the `dark` class on the HTML element to apply the corresponding styles.

- **Adaptive Design:**
  - Buttons adapt their styles based on the active theme.

#### **2.4 WysiwygEditor**
The `WysiwygEditor` component provides a rich text editor for creating and formatting articles. Key features include:

- **Rich Text Editing:**
  - Powered by TipTap, the editor includes extensions like bold, italic, underline, highlight, and options for subscript and superscript.

- **Article Creation:**
  - Allows logged-in users to draft and publish articles with a title and detailed content.
  - Articles are saved to Supabase with metadata such as author and creation date.

- **Validation and Error Management:**
  - Ensures required fields are filled before publication.
  - Displays clear error messages if constraints are not met.

- **Dynamic Customization:**
  - Users can directly format text through interactive toolbar buttons.

---

## Technologies Used 👨🏻‍💻

- **Frontend Framework:** [Next.js](https://nextjs.org/)
- **Language:** TypeScript (TSX)
- **Styles:** Tailwind CSS
- **Database and Authentication:** [Supabase](https://supabase.com/)

---

## How to Use ❓

### **1. Clone the Project**
```bash
git clone https://github.com/Vincent23032003/fall2024-webtech-102.git
```

### **2. Install Dependencies**
```bash
npm install

```

### **3. Run the Application in Client part**
```bash
npm run dev
```

### **4. Open the Project in a Browser**
http://localhost:3000
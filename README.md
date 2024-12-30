# Webtech Project


# ASM Blog - Digital Publishing Application 🔵🟡

This project is a digital publishing application designed as part of the WebTech course. It allows users to share posts, interact with a community, and personalize their profiles. Inspired by platforms like Medium, this application is built with the following key features:

- **User Authentication**: OAuth2 login with Supabase integration.
- **Post Management**: Create, edit, and display posts.
- **Community Interaction**: Users can comment on posts and engage with others.
- **Profile Customization**: Personalize your profile and settings.

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


## Deployment

- **Frontend**: Hosted on [Vercel](https://vercel.com/)
- **Backend/Storage**: Powered by [Supabase](https://supabase.com/)



## Repository Structure

```plaintext
/
├── api/                   # Backend logic built with Node.js and Prisma
│   ├── prisma/            # Prisma ORM configuration and migrations
│   ├── src/               # Source files for backend logic
│   ├── test.rest          # REST client file for testing API endpoints
│   └── README.md          # Backend documentation
├── client/                # Frontend built with Next.js
│   ├── app/               # Pages and routing
│   ├── components/        # Reusable UI components
│   ├── public/            # Static assets
│   ├── services/          # API or business logic
│   ├── styles/            # Global styles
│   └── README.md          # Frontend documentation
├── .gitignore             # Git ignore file
├── README.md              # General project overview
└── package.json           # Node.js dependencies
└── ...                    # Other root-level files
```



## Evaluation

### Mandatory Tasks

#### Naming Convention
- **Grade:** X/2
- **Comments:** Followed consistent and meaningful naming conventions for files, variables, and components.
- **Task Feedback:** The task was straightforward and easy to follow.

#### Project Structure
- **Grade:** X/2
- **Comments:** Organized the project with a clear folder structure separating components, pages, and styles.
- **Task Feedback:** Logical structure helped maintain clarity.

#### Git Usage
- **Grade:** X/2
- **Comments:** Used meaningful commit messages and followed a logical commit history.
- **Task Feedback:** Git usage felt natural and effective.

#### Code Quality
- **Grade:** X/4
- **Comments:** Ensured code readability with proper indentation, comments, and consistent formatting.
- **Task Feedback:** Writing clean code significantly improved maintainability.

#### Design, UX, and Content
- **Grade:** X/4
- **Comments:** Leveraged Tailwind CSS for a responsive and visually appealing design. Focused on accessibility and user experience.
- **Task Feedback:** Enjoyed implementing creative design elements.

#### Home Page
- **Grade:** X/2
- **Comments:** Implemented a dynamic homepage showcasing the latest match, standings, and upcoming matches using Supabase.
- **Task Feedback:** A rewarding task as it sets the tone for the platform.

#### Navigation
- **Grade:** X/2
- **Comments:** Designed a responsive navigation bar with dropdown menus for seamless exploration.
- **Task Feedback:** Straightforward and enjoyable to implement.

#### Login and Profile Page
- **Grade:** X/4
- **Comments:** Integrated authentication via Supabase and provided a profile customization option for users.
- **Task Feedback:** A challenging but rewarding task to implement securely.

#### Post Creation and Display
- **Grade:** X/6
- **Comments:** Users can create and view detailed posts. Implemented pagination and WYSIWYG editor for content creation.
- **Task Feedback:** Enjoyed integrating dynamic post features.

#### Comment Creation and Display
- **Grade:** X/4
- **Comments:** Added functionality to comment on posts with proper validation.
- **Task Feedback:** Easy to implement and adds significant interactivity.

#### Post Modification and Removal
- **Grade:** X/4
- **Comments:** Enabled authenticated users to edit or delete their posts.
- **Task Feedback:** Improved understanding of secure data handling.

#### Search
- **Grade:** X/6
- **Comments:** Implemented server-side search using Supabase's Full Text Search.
- **Task Feedback:** A complex but enriching experience.

#### Use an External API
- **Grade:** X/2
- **Comments:** Used the Unsplash API to display random images in articles.
- **Task Feedback:** Simple and effective integration.

#### Resource Access Control
- **Grade:** X/6
- **Comments:** Implemented Supabase's Row Level Security to ensure secure data access.
- **Task Feedback:** A critical feature that ensures data privacy.

#### Account Settings
- **Grade:** X/4
- **Comments:** Provided options to update user information and select an avatar.
- **Task Feedback:** Fun to implement and customize.

#### WYSIWYG Integration
- **Grade:** X/2
- **Comments:** Added a TipTap-based rich text editor for creating articles.
- **Task Feedback:** Straightforward integration.

#### Gravatar Integration
- **Grade:** X/2
- **Comments:** Integrated Gravatar for user avatars with fallback options.
- **Task Feedback:** Simple yet impactful feature.

#### Light/Dark Mode
- **Grade:** X/2
- **Comments:** Added a theme selector to toggle between light and dark modes.
- **Task Feedback:** Easy to implement and enhances user experience.

---

### Bonus Tasks

#### Task Title 1
- **Grade:** X/X
- **Comments:** Description of how the task was implemented.

#### Task Title 2
- **Grade:** X/X
- **Comments:** Description of how the task was implemented.

---

### Miscellaneous

#### Course Feedback
The course was engaging and provided hands-on experience with modern web technologies. The balance between lectures and project work was excellent.

#### Project Reuse
We authorize the professors to use our project as an example for future students.


## Contributors

- Vincent BARE : vincent.bare@edu.ece.fr
- Jules FEDIT : jules.fedit@edu.ece.fr

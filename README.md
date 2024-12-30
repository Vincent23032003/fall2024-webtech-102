# Webtech Project


# ASM Blog - Digital Publishing Application 🔵🟡

This project is a digital publishing application designed as part of the WebTech course. It allows users to share posts, interact with a community, and personalize their profiles. Inspired by platforms like Medium, this application is built with the following key features:

- **User Authentication**: OAuth2 login with Supabase integration.
- **Post Management**: Create, edit, and display posts.
- **Community Interaction**: Users can comment on posts and engage with others.
- **Profile Customization**: Personalize your profile and settings.

## Deployment

- **Frontend**: Hosted on [Vercel](https://vercel.com/)
- **Backend/Storage**: Powered by [Supabase](https://supabase.com/)

## Repository Structure

```bash
/
├── api/                   # Backend logic (if applicable)
│   └── (à détailler si utilisé)
│
├── client/                # Frontend built with Next.js
│   ├── app/               # Pages and routing
│   │   ├── articles/      # Pages for articles
│   │   ├── auth/          # Authentication pages
│   │   ├── blog/          # Blog post-related pages
│   │   ├── club/          # Club information
│   │   ├── connexion/     # Login page
│   │   ├── create_account/ # Account creation page
│   │   ├── legends/       # Club legends
│   │   ├── settings/      # User settings page
│   │   ├── results/       # Match results page
│   │   ├── team/          # Team roster page
│   │   └── trophies/      # Club trophies page
│   │
│   ├── components/        # Reusable UI components
│   │   ├── AppFooter.tsx
│   │   ├── AppNavbar.tsx
│   │   ├── ThemeSelector.tsx
│   │   └── WysiwygEditor.tsx
│   │
│   ├── public/            # Static assets (images, logos, etc.)
│   ├── services/          # Service files for API or business logic
│   ├── src/               # Source files for utilities and types
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions and helpers
│   │
│   ├── styles/            # Global and component-specific styles
│   │   └── globals.css    # Global CSS definitions
│   │
│   ├── .env.local         # Environment variables for local development
│   ├── supabaseClient.ts  # Supabase configuration and initialization
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── README.md          # Detailed documentation for the frontend
│   └── ...                # Additional configs (e.g., package.json)
│
├── .gitignore             # Git ignore file
├── README.md              # General project overview
├── package.json           # Node.js dependencies
└── ...                    # Other root-level files
```


## Contributors

- Vincent BARE : vincent.bare@edu.ece.fr
- Jules FEDIT : jules.fedit@edu.ece.fr

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f4a74caf-a5f3-45c6-a5b2-3029e043ee29

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f4a74caf-a5f3-45c6-a5b2-3029e043ee29) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Virtual brand landing page setup

The `/` route now serves a landing page that lets restaurant owners upload menus for AI analysis. To
use the submission flow you need to configure:

- `VITE_SUPABASE_MENU_BUCKET` – the Supabase storage bucket that will hold uploaded menus
  (e.g. `menu-uploads`). Make sure the bucket allows public reads so the generated public URL works.
- `N8N_WEBHOOK_URL` – the webhook URL that receives submissions from `/api/submit-menu`.

The form uploads files to Supabase using signed upload URLs, then posts the payload (with the public
file URL or menu link) to the webhook for processing.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f4a74caf-a5f3-45c6-a5b2-3029e043ee29) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

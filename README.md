# Simple Authy

Just a simple cool looking login and dashbaord page written in TypeScript using Next.js and stuff. 

## Simply run it by:

```bash
# install the stuff
npm install

# run the next app
npm run dev
```

Then just go ahead and open [http://localhost:3000](http://localhost:3000) to see this simple app thing.

## Project structure thing

```
src/
├── app/                  # Next.js App Router
│   ├── dashboard/        # Dashboard page
│   ├── layout.tsx        # The main layout
│   └── page.tsx          # The login page thing 
├── components/
│   ├── ui/              # some reusable components here
│   └── LoginForm.tsx    # The actual login form
├── context/             # Contexts should be here
│   └── ThemeContext.tsx # I mean, The Theme Context
├── lib/                 # some helper functions
│   ├── auth.ts         # Auth helper thingy
│   └── validation.ts   # Validation helper thingy.
└── types/              # Basically TypeScript types
```

## I used:

- Next.js + TypeScript
- Tailwind CSS and implemented Dark/Light Mode
- RandomUser API

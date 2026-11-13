# Pokémon Explorer

A responsive Pokémon exploration web application built with **Next.js, TypeScript, and Tailwind CSS**, powered by the [PokéAPI](https://pokeapi.co/).

Explore Pokémon, search by name, and discover detailed information about their abilities, types, base stats, and moves.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Application Flow](#application-flow)
- [Implementation Details](#implementation-details)
- [Error Handling](#error-handling)
- [Future Improvements](#future-improvements)
- [Author](#author)

## Project Overview

Pokémon Explorer is a web application developed as part of a frontend development take-home assignment.

The application allows users to browse a Pokémon collection, search for specific Pokémon, and navigate to individual detail pages to explore their information.

Pokémon data is retrieved from the public PokéAPI.

### Key Highlights

- Server-side data fetching using Next.js.
- Dynamic routing with the Next.js App Router.
- Reusable React components.
- Type-safe API integration using TypeScript.
- Responsive layouts using Tailwind CSS.
- Search functionality across the fetched Pokémon collection.

## Features

### 1. Pokémon Listing

- Fetches Pokémon data from PokéAPI.
- Displays Pokémon in a responsive card-based layout.
- Shows official Pokémon artwork.
- Displays Pokémon names and identification numbers.
- Initially displays 24 Pokémon.
- Provides a Load More option to display additional Pokémon.

### 2. Search Functionality

- Search Pokémon by name.
- Case-insensitive search.
- Filters results as the user types.
- Searches across the fetched Pokémon collection.
- Provides a clear-search option.
- Displays an appropriate message when no matching Pokémon is found.

### 3. Pokémon Details

Clicking a Pokémon card navigates to its individual detail page.

The detail page displays:

- **Pokémon Image:** Official artwork.
- **Pokémon ID:** Unique identification number.
- **Types:** Pokémon type information.
- **Abilities:** Normal and hidden abilities.
- **Height:** Displayed in meters.
- **Weight:** Displayed in kilograms.
- **Base Stats:** HP, Attack, Defense, Special Attack, Special Defense, and Speed, displayed with visual progress bars.
- **Moves:** Displays the first 12 available moves.

### 4. Dynamic Routing

Uses the Next.js App Router to generate individual Pokémon pages dynamically.

Example routes:

| Pokémon | Route |
|---|---|
| Bulbasaur | `/pokemon/1` |
| Pikachu | `/pokemon/25` |
| Charizard | `/pokemon/6` |

### 5. Responsive Design

- Responsive Pokémon card grid.
- Mobile-friendly layouts.
- Flexible content sections.
- Tailwind CSS utility-based styling.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React | Component-based user interface |
| TypeScript | Static typing and type safety |
| Tailwind CSS | Responsive styling |
| PokéAPI | Pokémon data source |
| Git | Version control |

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) — Node.js 20.19.0 or later recommended.
- npm — Installed with Node.js.
- [Git](https://git-scm.com/) — For cloning the repository.

### 1. Clone the repository

git clone <YOUR_GITHUB_REPOSITORY_URL>

### 2. Navigate to the project directory

cd pokemon-explorer

### 3. Install dependencies

npm install

### 4. Start the development server

npm run dev

### 5. Open the application

Visit:

http://localhost:3000

The application should now be running locally.

**Note:** No API key or environment variables are required. The application uses the public PokéAPI.

## Available Scripts

Run these commands from the project directory.

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to check code quality |

## Project Structure

The project follows a simple and organized component-based architecture.

pokemon-explorer/
│
├── app/
│   ├── pokemon/
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── error.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── PokemonCard.tsx
│   └── PokemonExplorer.tsx
│
├── lib/
│   └── api.ts
│
├── types/
│   └── pokemon.ts
│
├── public/
│
├── package.json
├── tsconfig.json
└── README.md

### Folder Responsibilities

**`app/`**

Contains application routes and route-level UI.

- `page.tsx` — Homepage and Pokémon data fetching.
- `pokemon/[id]/page.tsx` — Dynamic Pokémon detail route.
- `loading.tsx` — Loading interface.
- `error.tsx` — Error boundary and retry interface.
- `not-found.tsx` — Custom not-found page.
- `layout.tsx` — Root application layout.
- `globals.css` — Global styles.

**`components/`**

Contains reusable UI components.

- `Header.tsx` — Application header.
- `SearchBar.tsx` — Pokémon search input.
- `PokemonCard.tsx` — Individual Pokémon card.
- `PokemonExplorer.tsx` — Interactive homepage, filtering, and Load More functionality.

**`lib/`**

Contains API integration and reusable utility functions.

- `api.ts` — Pokémon API requests and helper functions.

**`types/`**

Contains TypeScript interfaces for API response data.

- `pokemon.ts` — Pokémon, abilities, types, moves, and stats interfaces.

## API Integration

The application uses [PokéAPI](https://pokeapi.co/), a public REST API providing Pokémon information.

### Base URL

https://pokeapi.co/api/v2/

### 1. Fetch Pokémon Listing

Endpoint:

GET /pokemon?limit=100000&offset=0

Returns the Pokémon collection with names and resource URLs.

### 2. Fetch Individual Pokémon Details

Endpoint:

GET /pokemon/{id-or-name}

Example:

GET /pokemon/25

Returns detailed information about Pikachu, including its image, abilities, types, stats, and moves.

### API Implementation

API requests are centralized in:

lib/api.ts

This keeps API logic separate from UI components and makes it easier to maintain and reuse data-fetching functions.

**Caching:** API fetch requests use Next.js data revalidation with a configured interval of 3600 seconds (one hour).

## Application Flow

The application follows this basic data flow:

flowchart TD
    A[User opens application] --> B[Next.js Homepage]
    B --> C[lib/api.ts]
    C --> D[PokéAPI]
    D --> E[Pokémon Listing]
    E --> F[PokemonExplorer Component]
    F --> G[SearchBar]
    F --> H[PokemonCard Grid]
    H --> I[User clicks Pokémon]
    I --> J[Dynamic Detail Route]
    J --> K[Fetch Pokémon Details]
    K --> L[Display Pokémon Information]

### Homepage Flow

1. The homepage fetches Pokémon listing data.
2. The API response is passed to the interactive Pokémon Explorer component.
3. The user can search and filter Pokémon.
4. Pokémon cards are displayed in a responsive grid.
5. Additional cards can be loaded using the Load More button.

### Detail Page Flow

1. The user clicks a Pokémon card.
2. Next.js navigates to the corresponding dynamic route.
3. The Pokémon ID is extracted from the route parameters.
4. Individual Pokémon data is fetched from PokéAPI.
5. The detail page displays the retrieved information.

## Implementation Details

### Server Components and Client Components

The application uses both server and client components where appropriate.

**Server Components:**

- Homepage data fetching.
- Dynamic Pokémon detail data fetching.

**Client Components:**

- Interactive Pokémon listing.
- Search input.
- Search filtering.
- Load More functionality.

### TypeScript

TypeScript interfaces are used to define the expected Pokémon API response structure.

This improves code readability, provides type checking, and reduces potential runtime errors caused by incorrect data usage.

### Component Reusability

The application uses reusable components to avoid unnecessary duplication and keep the code organized.

### Performance Considerations

- Server-side API data fetching.
- Next.js fetch caching and revalidation.
- Lazy loading for Pokémon card images.
- Initial display of 24 cards instead of rendering the complete listing at once.
- Client-side filtering of the fetched Pokémon data.

## Author

**Mann Panchani**

Pokémon Explorer — Frontend Development Take-Home Assignment.

Built with Next.js, TypeScript, Tailwind CSS, and PokéAPI.

**Data Source:** [PokéAPI](https://pokeapi.co/)

<img width="1917" height="1078" alt="Screenshot 2026-11-12 175936" src="https://github.com/user-attachments/assets/25b539a2-96f0-4e50-95b6-d6e92d5dce37" />

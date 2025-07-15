# DocMgmt Frontend

A React + Redux Toolkit + Bootstrap frontend for document management.

---

## Features

- **Login** and **Sign Up** flows (fully configured)
- **Dashboard** page after login
- **Document Upload** feature (work in progress)

---

## Getting Started

### 1. **Clone the repository**

```sh
git clone https://github.com/devayush/docmgmt-frontend.git
cd docmgmt-frontend
```

### 2. **Install dependencies**

```sh
npm install
```

### 3. **Run the development server**

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Docker

You can run the frontend in a Docker container using **docker-compose**:

### 1. **Build and run with Docker Compose**

```sh
docker-compose up --build
```

### 2. **Access the app**

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** The app is served on port **3000** as configured in `docker-compose.yml`.

---

## Notes

- Only **login**, **signup**, and **dashboard** flows are fully configured.
- **Document upload** is present but still a work in progress.
- The app uses **Bootstrap** for styling.
- Make sure your backend API is running and accessible to the frontend.

---

## Project Structure

```
src/
  components/
    DocumentUploadForm.tsx
  features/
    auth/
      authSlice.ts
    documents/
      documentSlice.ts
  hooks/
    reduxHooks.ts
  pages/
    Dashboard.tsx
    Login.tsx
    Signup.tsx
    UploadDocument.tsx
  store.ts
  App.tsx
  main.tsx
  index.css
```

---


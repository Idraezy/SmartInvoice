# InvoicePro - Professional Invoice Generator

A modern, fully-featured invoice generator built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- ✅ **Full CRUD Operations**: Create, read, update, and delete invoices
- ✅ **Multiple Line Items**: Add unlimited line items with auto-calculations
- ✅ **Smart Calculations**: Automatic subtotal, tax, and total calculations
- ✅ **Local Storage**: Data persists across browser sessions
- ✅ **PDF Export**: Download invoices as HTML files (can be printed/saved as PDF)
- ✅ **Search & Filter**: Find invoices by client name, invoice number, or status
- ✅ **Status Management**: Draft, Sent, and Paid status tracking
- ✅ **Dark/Light Theme**: Toggle between themes with persistence
- ✅ **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- ✅ **Smooth Animations**: Polished UI with Framer Motion animations
- ✅ **TypeScript**: Full type safety throughout the application

## 📦 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Vite** - Build tool
- **Lucide React** - Icons

## 🛠️ Installation

### Prerequisites
- Node.js 16+ and npm/yarn

### Steps

1. **Create a new Vite project:**
```bash
npm create vite@latest invoice-generator -- --template react-ts
cd invoice-generator
```

2. **Install dependencies:**
```bash
npm install
npm install framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer
```

3. **Initialize Tailwind CSS:**
```bash
npx tailwindcss init -p
```

4. **Copy the configuration files:**
   - Copy `tailwind.config.js` content
   - Copy `package.json` content

5. **Update your `src/index.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. **Create the following file structure in `src/`:**
```
src/
├── types.ts
├── utils.ts
├── mockData.ts
├── components/
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── InvoiceCard.tsx
│   ├── InvoiceList.tsx
│   └── InvoiceModal.tsx
├── App.tsx
└── main.tsx
```

7. **Copy each component file** from the artifacts above into the corresponding files.

8. **Update `src/main.tsx`:**
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

9. **Run the development server:**
```bash
npm run dev
```

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite configuration
6. Click "Deploy"

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. The build output will be in the `dist/` folder

3. Go to [netlify.com](https://netlify.com)
4. Drag and drop the `dist/` folder
5. Your site is live!

## 📝 Usage

### Creating an Invoice
1. Click "New Invoice" button
2. Fill in client details
3. Add line items (description, quantity, price)
4. Set tax rate if applicable
5. Add notes (optional)
6. Click "Create Invoice"

### Editing an Invoice
1. Click the "Edit" button on any invoice card
2. Modify the details
3. Click "Update Invoice"

### Downloading as PDF
1. Click the "PDF" button on any invoice card
2. The invoice will download as an HTML file
3. Open the file and use your browser's "Print to PDF" feature

### Searching and Filtering
- Use the search bar to find invoices by client name or invoice number
- Use the status dropdown to filter by Draft, Sent, or Paid

### Theme Toggle
- Click the sun/moon icon in the header to toggle between light and dark modes
- Your preference is saved automatically

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

### Company Branding
Edit the PDF generation function in `utils.ts` to customize:
- Company name
- Company logo
- Footer text
- Color scheme

### Invoice Number Format
Edit `InvoiceModal.tsx` to change the invoice number generation:
```typescript
invoiceNumber: `INV-${Date.now().toString().slice(-6)}`
```

## 🐛 Troubleshooting

**Issue**: Data not persisting
- **Solution**: Check browser localStorage is enabled and not full

**Issue**: Animations not working
- **Solution**: Ensure framer-motion is installed: `npm install framer-motion`

**Issue**: Styles not applying
- **Solution**: Make sure Tailwind is configured correctly and `@tailwind` directives are in your CSS

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using Claude AI

---

**Happy Invoicing! 🎉**

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

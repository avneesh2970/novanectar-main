# NovaNectar Company Website

Welcome to the **NovaNectar** company website repository! 🚀 This project is built using **Next.js**, featuring stunning animations with **Framer Motion** and **GSAP**, and utilizing **MongoDB** as the database. The code is written in **TypeScript** and follows best practices for maintainability and scalability.

## 🚀 Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Animations:** Framer Motion, GSAP
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **State Management:** React Context API

## ✨ Features

- Smooth page transitions and animations
- Fully responsive and modern UI
- Optimized performance with server-side rendering (SSR) & static site generation (SSG)
- Secure API routes and authentication
- Scalable and maintainable code structure

## 🛠 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/avneesh2970/novanectar-main.git
   ```
2. Navigate to the project directory:
   ```bash
   cd novanectar-main
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables in a `.env.local` file:
   ```env
   NEXT_PUBLIC_MONGODB_URI=your_mongodb_connection_string
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) to see the website in action.

## 📦 Deployment

This project is deployed on a **VPS**.

To update on a VPS:
1. Push the changes to this repository.

2. Connect to your VPS via SSH:
   ```bash
   ssh user@your-vps-ip
   password
   ```
3. Clone the repository:
   ```bash
   cd /var/www/novanectar-main
   git pull origin main
   npm install
   npm run build
   ```

5. update environment variables if needed  `.env.local` file:
   ```env.local
   MONGODB_URI=your_mongodb_connection_string
   ```
6. reload the application using PM2 :
   ```bash
   pm2 reload <application id> --update-env
   ```
7. Set up a reverse proxy with Nginx for better performance and security.

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request.

## 📜 License

This project is licensed under the MIT License.

---

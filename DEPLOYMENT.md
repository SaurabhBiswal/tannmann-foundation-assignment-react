# MERN Stack Deployment Guide (MySQL Variant)

Follow these steps to deploy your application to the cloud.

## 1. Prerequisites (Create Accounts)
You need to sign up for these free platforms:
1.  **TiDB Cloud** (or Aiven) for the **MySQL Database**.
    *   [Sign up for TiDB Cloud](https://tidbcloud.com/free-trial)
2.  **Render** for the **Backend API**.
    *   [Sign up for Render](https://dashboard.render.com/register)
3.  **Vercel** for the **Frontend**.
    *   [Sign up for Vercel](https://vercel.com/signup)

---

## 2. Deploy Database (TiDB Cloud)
1.  Create a strict **Serverless Tier** cluster (Free).
2.  Create a user and password.
3.  **Get the Connection String**. It looks like:
    `mysql://user:password@gateway01.region.tidbcloud.com:4000/test`
4.  Run the initialization SQL in the TiDB console (SQL Editor):
    ```sql
    CREATE DATABASE tannmann_foundation;
    USE tannmann_foundation;
    CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

---

## 3. Deploy Backend (Render)
1.  Click **"New +"** -> **"Web Service"**.
2.  Connect your GitHub repository.
3.  Select the **backend** directory in "Root Directory" settings (if asked).
4.  **Important Settings**:
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
5.  **Environment Variables**:
    Add the following variables:
    *   `DB_HOST`: (from TiDB)
    *   `DB_USER`: (from TiDB)
    *   `DB_PASSWORD`: (from TiDB)
    *   `DB_NAME`: `tannmann_foundation`
    *   `DB_PORT`: `4000`
6.  Click **Create Web Service**.
    *   After deployment, copy your **Service URL** (e.g., `https://backend-xyz.onrender.com`).

---

## 4. Deploy Frontend (Vercel)
1.  Click **"Add New..."** -> **"Project"**.
2.  Import your GitHub repository.
3.  **Framework Preset**: Create React App.
4.  **Root Directory**: Edit and select `frontend`.
5.  **Environment Variables**:
    *   `REACT_APP_API_URL`: Paste your **Render Backend URL** (e.g., `https://backend-xyz.onrender.com/api`).
    *   **Note**: Do NOT add a trailing slash.
6.  Click **Deploy**.

---

## 5. Final Verification
1.  Visit your Vercel URL.
2.  Try to register a user.
3.  If it works and appears in the list, **Congratulations!** Your app is live.

# EDA Web App using NextJS

## 📊 Project Overview

This project provides an interactive and user-friendly web interface for performing **Exploratory Data Analysis (EDA)** on CSV files.

- The **frontend** is developed using **Next.js**, which provides a responsive and modern UI.
- The **backend** is built using **FastAPI** in Python and handles all the EDA logic (data cleaning, summarization, visualization).
- The **Next.js frontend communicates with the FastAPI backend via HTTP API calls** to process and analyze the data.

### 🔧 What It Does

- Lets users upload a CSV file through the web interface
- Sends the file to the FastAPI backend using an API call
- Returns processed data summaries and visualizations to be displayed in the frontend
- Also includes a sample dataset for instant demonstration


---

## 🔍 Features

- Perform **automatic EDA** on a built-in sample dataset
- Upload your own CSV file and generate:
  - Summary statistics
  - Missing value reports
  - Data types and distributions
  - Correlation matrix
  - Visualizations using matplotlib/seaborn
- Fast and lightweight backend using **FastAPI**
- JSON and HTML support (depending on route design)

---
## 🔍 UI

- The frontend is built using **Next.js** with a clean and responsive design.
- Works seamlessly across all screen sizes — from mobile phones to desktops.
- Mobile
- <img width="360" alt="image" src="https://github.com/user-attachments/assets/8ba8ecf5-aa62-4097-8355-f4bc91c6b9c3" />
  <img width="360" alt="image" src="https://github.com/user-attachments/assets/c0d1c51b-99d3-4112-8086-e74f48679e3a" />

- Desktop
- <img width="1440" alt="image" src="https://github.com/user-attachments/assets/4e07db38-a015-4580-8a87-1af3f58cf529" />
  <img width="1439" alt="image" src="https://github.com/user-attachments/assets/7484ca90-fed5-49fa-a81f-a867252a4063" />

## 🧪 Tech Stack

- **Frontend**: Next.js (React Framework)
- **Backend API**: FastAPI
- **Data Processing**: Pandas, NumPy
- **Visualization**: Matplotlib, Seaborn
- **Deployment**:
  - **Backend**: FastAPI deployed on [Render](https://render.com)
  - **Frontend**: Next.js (can be hosted on Vercel, Netlify, or locally)

---

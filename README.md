# Blogsphere

Blogsphere is a modern, fully responsive blog website built with [Express, MongoDB, Node.js]. It provides users with a platform to create, read, update, and delete blog posts. The project includes user authentication, profile management, and a clean, intuitive user interface.

## Features

- **User Authentication**: Sign up and login functionality.
- **Create, Read, Update, and Delete (CRUD) Blogs**: Full control over blog posts.
- **Responsive Design**: Optimized for various screen sizes.
- **Profile Management**: Users can manage their profiles and view their blogs.
- **Real-time Updates**: Instant feedback on actions like creating or deleting a post.
- **Comments Section**: Visitors can comment on posts.
  
## Tech Stack

- **Frontend**: Bootstrap 
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js 
- **Deployment**: Render

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/mic-720/BlogSphere.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    SECRET=session_secret_key
    ```

4. Run the application:
    ```bash
    npm run start
    ```

5. Access the website:
    Open [http://localhost:5000](http://localhost:5000) in your browser.



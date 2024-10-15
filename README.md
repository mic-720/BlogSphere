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


## Contributions

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/mic-720/BlogSphere/issues).

If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.

### Steps to Contribute:
1. Fork this repository.
2. Create a branch: `git checkout -b your-feature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin your-feature`.
5. Submit a pull request.

Thank you for contributing!

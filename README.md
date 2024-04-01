
# Social-Media-API

The SocialMediaAPI is a robust and secure backend service designed to power your social media platform. It provides a comprehensive set of endpoints and features to enable users to interact, share content, and connect with others in a dynamic and engaging environment.




## Tech Stack

**Server:** Node, Express, MongoDB, JWT, Bcrypt


## Features

- User Authentication and Authorization:

    Secure user authentication using JWT (JSON Web Tokens) to ensure the integrity and confidentiality of user sessions.
    
    Role-based access control (RBAC) to manage user roles and permissions, allowing fine-grained control over user actions and data access.

- Profile Management:

    Users can create and manage their profiles, including updating profile information, uploading profile pictures

- Content Sharing:

    Users can create, publish, and share various types of content, including text-based updates, images, videos, and links.

- Social Interactions:

    Seamless social interactions such as liking, commenting, and sharing posts, fostering engagement and fostering connections between users.
    
    Real-time notifications to keep users informed of new followers, likes, comments, and mentions, enhancing user engagement and interaction within the platform.

- Direct Messaging:

    Private messaging functionality to enable users to communicate directly with each other, facilitating private conversations and fostering deeper connections between users.
    
    Real-time updates for new messages and message read receipts, providing users with a responsive and interactive messaging experience.

- Data Privacy and Security:

    Robust data privacy and security measures to protect users' sensitive information and ensure compliance with data protection regulations.
    
    Encryption of sensitive data such as passwords and access tokens, secure storage practices, and adherence to industry best practices for data security.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL`

`JWT_SECRET`


## Run Locally

Clone the project

```bash
  git clone https://github.com/Ameya02/Social-Media-API.git
```

Go to the project directory

```bash
  cd Social-Media-API
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run server
```


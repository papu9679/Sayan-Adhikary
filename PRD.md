# PRD: Portfolio Website with Feedback

## 1. Project idea

Build a personal portfolio where visitors can learn about you and your work, then leave feedback. Feedback is saved in a backend and appears publicly **only after you approve it**.

The first version stays simple. Later, you can add a chat assistant that answers questions about your portfolio and projects.

## 2. Technology

- **React**: website interface
- **Tailwind CSS**: styling
- **Express.js**: backend API
- **MongoDB**: save feedback
- **Vercel or Netlify**: host the frontend
- **Render, Railway, or similar**: host the backend

You don’t need Redux, WebSockets, email, or a vector database for the first version.

## 3. Public website sections

- **Home:** your name, role, and short introduction
- **About:** information about you and your goals
- **Education:** institution, course, and graduation year
- **Skills:** your technologies and other skills
- **Projects:** description, image, technologies, GitHub link, and live project link
- **Resume:** optional PDF download
- **Contact:** links to GitHub, LinkedIn, and other profiles
- **Feedback:** a form and a wall showing approved feedback

## 4. Feedback feature

### Visitor experience

A visitor can submit:

- Their name, optionally
- A feedback message
- Their permission to display the message publicly

After submission, show a confirmation such as:

> “Thanks for your feedback! It will appear here after review.”

### Your experience

You can open a private admin page to:

- View submitted feedback
- Publish feedback
- Hide or delete feedback

Only published feedback appears on the public website. The admin page should require a password or other authentication; it should not be publicly editable.

## 5. Simple backend design

Use the Express API to receive and retrieve feedback. MongoDB stores each message.

Example feedback record:

```js
{
  name: "Alex",
  message: "I like your project. You could add more tests.",
  status: "pending",
  createdAt: "..."
}
```

Possible statuses:

- `pending`: waiting for your review
- `published`: visible on the website
- `rejected`: not displayed

### Example API routes

```text
POST   /api/feedback             Submit feedback
GET    /api/feedback              Get published feedback
GET    /api/admin/feedback        View all feedback (protected)
PATCH  /api/admin/feedback/:id    Publish or reject feedback (protected)
DELETE /api/admin/feedback/:id    Delete feedback (protected)
```

Keep the feedback submission form working through normal API requests. Real-time notifications are not necessary; you can check submissions in the admin page.

## 6. Suggested project structure

```text
portfolio/
  client/                 # React and Tailwind CSS
    src/
      components/
      pages/
      data/
  server/                 # Express API
    models/
      Feedback.js
    routes/
      feedback.js
      admin.js
    middleware/
      auth.js
    server.js
```

You can initially keep your education, skills, and project details in a frontend data file. The backend only needs to manage feedback. If you later want to edit your portfolio from an admin page, you can move that content into MongoDB.

## 7. Future feature: portfolio chat assistant

Later, visitors could ask questions such as:

- “What projects has this person built?”
- “What technologies did they use in this project?”
- “Where can I find their GitHub?”
- “What did they study?”

The assistant would answer using information from your portfolio, not general information about other people or the internet.

### Future architecture

```text
Visitor chat
    ↓
React website
    ↓
Express API
    ↓
Retrieve relevant portfolio information
    ↓
LLM creates an answer
    ↓
Answer appears in the chat
```

When the portfolio has enough content, you could add a **vector database** to retrieve the most relevant information for each question. This could use MongoDB Atlas Vector Search or another vector database. It is not required for the feedback feature or the first version of the portfolio.

## 8. Build it step by step

1. Create the React and Tailwind CSS website.
2. Add your introduction, education, skills, projects, and links.
3. Add the feedback form and public feedback section.
4. Build the Express API and connect it to MongoDB.
5. Save new feedback as `pending`.
6. Build a protected admin page to review and publish feedback.
7. Deploy the frontend and backend.
8. Add the portfolio chat assistant later, when you’re ready.

## 9. First-version checklist

- [ ] Portfolio sections display correctly on mobile and desktop.
- [ ] Project cards include GitHub and live project links.
- [ ] Visitors can submit feedback.
- [ ] Feedback is saved in MongoDB.
- [ ] New feedback is not public by default.
- [ ] You can publish or reject feedback from a protected admin page.
- [ ] Only published feedback appears publicly.
- [ ] The site is deployed and its links work.

This gives you a useful portfolio now, a manageable Express and MongoDB backend to learn, and a clear path to add a portfolio-focused chat assistant in the future.
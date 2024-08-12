# Mail App

## Overview

The task is to build a frontend + backend for an email client that makes API calls to send and receive emails.

## Features

- **Inbox View**: Displays a list of emails that have been received. Users can click on an email to view its content.
- **Sent View**: Displays a list of emails that the user has sent.
- **Archived View**: Allows users to archive and unarchive emails.
- **Compose Email**: Users can compose a new email. They can specify recipients, a subject, and a body.

## Technologies Used

- **HTML**: For the structure of the web pages.
- **CSS**: For styling the components.
- **JavaScript**: For making API calls and handling dynamic content.
- **Django**: For the back-end API.
- **JSON**: For data exchange between the front-end and the back-end.

## Getting Started

### Prerequisites

- Python 3.x
- Git

### Installation

    git clone https://github.com/SinghaniaV/mail-app

    cd mail-app

    pip install Django

    python manage.py migrate

    python manage.py runserver

## Usage

- **Compose an Email**: Click on "Compose" to create a new email. Fill in the recipient, subject, and body, then click "Send".
- **View Emails**: Click on "Inbox" to view received emails, "Sent" to view sent emails, and "Archive" to view archived emails.
- **Archive/Unarchive**: Open an email and click "Archive" to archive it or "Unarchive" to move it back to the inbox.
- **Reply to an Email**: Open an email and click "Reply". This will open the compose form with the recipient pre-filled.

## Project Structure

- `mail/`: The Django app containing all the views, models, and templates.
- `static/mail/`: Contains static files such as JavaScript and CSS.
- `templates/mail/`: Contains HTML templates for rendering views.
- `urls.py`: Defines URL patterns for the app.
- `views.py`: Handles requests and renders the appropriate templates.
- `models.py`: Defines the data models for emails.


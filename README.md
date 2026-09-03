# 🔎 LOST AND FOUND

### Find It. Report It. Reunite It.

**LOST AND FOUND** is a full-stack web application designed to help users report,
search, and manage lost or found items.

The platform provides a simple interface where users can submit details about an
item they have lost or found and browse existing reports to identify possible matches.

The project is designed as a lightweight Lost and Found Management System using
**HTML, CSS, JavaScript, Node.js, and Express.js**.

---

## Problem Statement

Lost personal belongings are a common problem in colleges, workplaces, public
places, transportation hubs, and other shared environments.

Traditional lost-and-found systems often depend on notice boards, security desks,
or word-of-mouth communication, which makes it difficult for users to quickly
locate their belongings.

The **LOST AND FOUND** web application provides a centralized digital platform
where users can:

- Report lost items
- Report found items
- Browse reported items
- Search for specific items
- Filter lost and found reports
- Mark recovered items as resolved
- Remove unnecessary reports

This makes the process of connecting lost belongings with their owners easier
and more organized.

---

## Objectives

The main objectives of this project are:

- Create a centralized platform for lost and found reports
- Allow users to report lost items easily
- Allow users to report found items
- Display all submitted lost and found reports
- Provide search functionality for finding relevant items
- Filter reports based on Lost or Found status
- Allow resolved reports to be marked as completed
- Allow unwanted reports to be deleted
- Provide a simple and responsive user interface
- Connect the frontend with a REST API backend

---

# Phase 1 Scope

The current version of the project implements:

- ✅ Lost item reporting
- ✅ Found item reporting
- ✅ Item listing
- ✅ Search functionality
- ✅ Lost / Found filtering
- ✅ Individual item retrieval
- ✅ Mark item as resolved
- ✅ Delete item report
- ✅ REST API integration
- ✅ Node.js backend
- ✅ Express.js server
- ✅ JSON-based data storage
- ✅ HTML frontend
- ✅ CSS styling
- ✅ JavaScript frontend logic

### Not Implemented in the Current Version

- ❌ User Registration
- ❌ User Login
- ❌ Admin Dashboard
- ❌ Image Upload
- ❌ Database Server
- ❌ Email Notifications
- ❌ OTP Verification
- ❌ Real-time Chat
- ❌ Automatic Item Matching
- ❌ Location Tracking

These features can be added in future versions.

---

# Features

## Lost Item Reporting

Users can submit information about an item they have lost.

Typical information may include:

- Item name
- Description
- Category
- Location
- Lost / Found type
- Contact information

---

## Found Item Reporting

Users who discover an item can create a **Found Item Report** so that the
original owner can locate it.

---

## View All Reports

The application displays reported lost and found items in one place.

Users can browse through available reports and check whether their missing
item has already been reported.

---

## Search Items

Users can search through existing reports to quickly locate relevant items.

The backend API supports search using:

```text
?search=

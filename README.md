# Vehicle Grid App

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Folder Structure](#folder-structure)


## Introduction

This is a web application for managing vehicle makes and models. It allows you to view, add, edit, and delete vehicle makes and models using Firestore as the backend database.

## Features

- View a list of vehicle makes and models.
- Sort vehicle makes and models in ascending or descending order.
- Filter vehicle models by make.
- Pagination to view a specific number of items per page.
- Add new vehicle makes and models.
- Edit existing vehicle makes and models.
- Delete vehicle makes and models.

## Technologies Used

- React.js
- MobX 
- Firebase Firestore
- HTML/CSS


## Installation

<!--
# Clone the repository
git clone git@github.com:ltrzic12/vehicle-grid.git

# Navigate to the project directory
cd vehicle-grid

# Install dependencies
npm install

#Start development server
npm start  
-->

## Usage

- Navigate to the "Makes" section to view and manage vehicle makes.
- Navigate to the "Models" section to view and manage vehicle models.
- Use the sorting and filtering options to refine your results.
- Use pagination to navigate through multiple pages of results.

## Folder Structure

src/
|-- components/
|   |-- Form/
|   |   |-- form.css
|   |   |-- Form.js
|   |   |-- FormSuccessful.js
|   |-- Loader/
|   |   |-- loader.css
|   |   |-- Loader.jsx
|   |-- Navbar/
|   |   |-- navbar.css
|   |   |-- NavBar.jsx
|   |-- Vehiclemakelist/
|   |   |-- vehicleMake.css
|   |   |-- vehicleMakeModal.css
|   |   |-- VehicleMakeModal.jsx
|   |   |-- VehicleMake.jsx
|   |-- VehicleModelList/
|   |   |-- vehicleModel.css
|   |   |-- vehicleModelModal.css
|   |   |-- vehicleModelModal.jsx
|   |   |-- vehicleModel.jsx
|-- config/
|   |-- firebaseConfig.js
|-- pages/
|   |-- FormPage/
|   |   |-- FormPage.jsx
|   |-- Makes/
|   |   |-- MakesPage.jsx
|   |-- Models/
|   |   |-- ModelsPage.jsx
|-- services/
|   |-- FormService.js
|   |-- VehicleMakeService.js
|   |-- VehicleModelService.js
|-- stores/
|   |-- FormStore.js
|   |-- VehicleStore.js
|-- utils/
|   |-- misc/
|   |   |-- styles.js
|-- App.jsx
|-- app.css
|-- index.css
|-- index.js
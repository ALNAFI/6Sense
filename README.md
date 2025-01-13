# Product Management System

## Overview
This project manages products and categories in an e-commerce system.

## Features
- Create, update, and retrieve products and categories.
- Automatically generate unique product codes.
- Apply discounts dynamically.

## Database Design
Below is the data model diagram for the project:

![Data Model Diagram](https://www.dropbox.com/scl/fi/x87uu3lnjgokq6hvjdy6x/6Sense.drawio.png?rlkey=7uhtth6140qn44xorf0l5ks02&e=1&st=fi1awcju&dl=0)

## Entities
### Product
- **id**: Primary key
- **name**: Name of the product
- **description**: Product description
- **price**: Original price of the product
- **discount**: Discount percentage
- **discountedPrice**: Price after applying the discount
- **status**: Availability status (In Stock/Stock Out)
- **categoryId**: Foreign key referencing `Category`

### Category
- **id**: Primary key
- **name**: Name of the category
- **description**: Optional category description

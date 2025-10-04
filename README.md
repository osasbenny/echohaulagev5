# Echo Haulage Express

A complete FedEx-style logistics and courier platform with professional shipping, delivery, and tracking system for both individuals and businesses.

## Features

### 🌐 Website Features
- **Modern UI/UX**: Corporate-style, fast, responsive design inspired by FedEx
- **Homepage**: Hero banner with package tracking, service overview, testimonials, and CTAs
- **Real-time Tracking**: Track shipments with unique tracking numbers
- **Multi-service Support**: Express, Standard, Freight, and International shipping

### 📦 User Dashboard
- User authentication (Sign up, Login, Password Reset)
- Create new shipments with detailed forms
- View shipment history and status
- Real-time tracking dashboard
- Payment integration with Stripe
- Profile and address management

### ⚙️ Admin Dashboard
- Manage all shipments and users
- Update tracking statuses
- View analytics and reports
- Manage service zones and rates
- Real-time shipment monitoring

### 💳 Payment System
- Stripe integration for secure payments
- Multiple payment methods support
- Transaction history
- Automatic invoice generation

### 📡 Tracking System
- Unique tracking number generation (Format: EHE-YYYYMMDD-XXXXX)
- Real-time status updates
- Detailed tracking timeline
- Email notifications (configurable)

## Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Stripe API
- **Security**: bcrypt, helmet, rate limiting

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Stripe account (for payments)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/echo-haulage-express
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
FRONTEND_URL=http://localhost:5173
```

4. Start MongoDB:
```bash
mongod
```

5. Start the backend server:
```bash
npm run dev
```

The backend API will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure environment variables:
Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_MAPBOX_TOKEN=your_mapbox_token
```

4. Start the development server:
```bash
pnpm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Shipments
- `POST /api/shipments` - Create shipment
- `GET /api/shipments` - Get user shipments
- `GET /api/shipments/:id` - Get shipment by ID
- `GET /api/shipments/track/:trackingNumber` - Track shipment (public)
- `PUT /api/shipments/:id` - Update shipment
- `DELETE /api/shipments/:id` - Cancel shipment
- `POST /api/shipments/:id/tracking` - Add tracking update (admin)

### Payments
- `POST /api/payments/create-intent` - Create Stripe payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/history` - Get payment history

### Rates
- `POST /api/rates/calculate` - Calculate shipping rate
- `GET /api/rates/services` - Get available services
- `POST /api/rates/transit-time` - Get transit time estimate

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/shipments` - Get all shipments
- `PUT /api/admin/shipments/:id/status` - Update shipment status
- `GET /api/admin/reports/revenue` - Get revenue report
- `GET /api/admin/reports/shipments` - Get shipment statistics

## Default User Accounts

For testing purposes, you can create accounts with different roles:

**Customer Account:**
- Register through the signup page
- Default role: customer

**Admin Account:**
- Create via MongoDB or API with role: 'admin'
- Has access to admin dashboard

## Color Scheme

- **Primary Purple**: #4D148C
- **Secondary Orange**: #FF6600
- **White**: #FFFFFF
- **Gray shades**: For text and backgrounds

## Project Structure

```
echo-haulage-express/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth & error handling
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── server.js        # Express app entry
│   ├── public/labels/       # Shipping labels
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── contexts/        # React contexts
│   │   ├── lib/             # Utilities (axios, etc.)
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   └── package.json
│
└── README.md
```

## Features in Detail

### Tracking Number Format
- Format: `EHE-YYYYMMDD-XXXXX`
- Example: `EHE-20250104-47293`
- Automatically generated for each shipment

### Service Types
1. **Express**: Next-day delivery, $25 base rate
2. **Standard**: 3-day delivery, $15 base rate
3. **Freight**: 5-day delivery for large items, $50 base rate
4. **International**: 10-day worldwide delivery, $75 base rate

### Pricing Calculation
- Base rate (by service type)
- Weight-based charges
- Insurance (1% of declared value, min $2)
- Tax (8%)

## Deployment

### Backend Deployment (Render/Railway)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

## Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Input validation and sanitization
- Secure HTTP headers (helmet)

## Future Enhancements
- Mobile app (React Native)
- SMS notifications via Twilio
- Live map tracking with Mapbox
- Barcode scanner integration
- Multi-language support
- Advanced analytics dashboard
- API for third-party integrations

## License
MIT License

## Support
For support, email support@echohaulage.com or create an issue in the repository.

## Contributors
Built with ❤️ by the Echo Haulage Express team

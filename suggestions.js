const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes'
});

// Apply to authentication routes
app.use('/api/auth/', authLimiter);


const csrf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });

// Apply CSRF protection to specific routes
router.post('/signup', csrfProtection, authController.signUp);
// Similarly for other POST routes

